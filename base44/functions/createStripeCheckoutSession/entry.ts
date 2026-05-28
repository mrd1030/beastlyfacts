import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';
import Stripe from 'npm:stripe';

Deno.serve(async (req) => {
    try {
        const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY"));
        const { amount, type } = await req.json();

        const successUrl = 'https://www.beastlyfacts.com/donate/success';
        const cancelUrl = 'https://www.beastlyfacts.com/donate/cancel';

        let lineItems = [];

        if (amount && typeof amount === 'object' && amount.custom) {
            const customAmount = Math.round(parseFloat(amount.custom) * 100);
            if (isNaN(customAmount) || customAmount <= 0) {
                return Response.json({ error: 'Invalid custom amount' }, { status: 400 });
            }
            const customPrice = await stripe.prices.create({
                currency: 'usd',
                unit_amount: customAmount,
                product_data: { name: type === 'monthly' ? 'Monthly Donation' : 'One-time Donation' },
                ...(type === 'monthly' ? { recurring: { interval: 'month' } } : {}),
            });
            lineItems.push({ price: customPrice.id, quantity: 1 });
        } else {
            const priceMap = {
                'one-time': {
                    '1': Deno.env.get("STRIPE_PRICE_ID_ONE_TIME_1"),
                    '5': Deno.env.get("STRIPE_PRICE_ID_ONE_TIME_5"),
                    '10': Deno.env.get("STRIPE_PRICE_ID_ONE_TIME_10"),
                },
                'monthly': {
                    '1': Deno.env.get("STRIPE_PRICE_ID_MONTHLY_1"),
                    '5': Deno.env.get("STRIPE_PRICE_ID_MONTHLY_5"),
                    '10': Deno.env.get("STRIPE_PRICE_ID_MONTHLY_10"),
                },
            };

            const priceId = priceMap[type]?.[amount];
            if (!priceId) {
                return Response.json({ error: 'Invalid amount or type' }, { status: 400 });
            }
            lineItems.push({ price: priceId, quantity: 1 });
        }

        const session = await stripe.checkout.sessions.create({
            mode: type === 'one-time' ? 'payment' : 'subscription',
            line_items: lineItems,
            success_url: successUrl,
            cancel_url: cancelUrl,
        });

        return Response.json({ sessionId: session.id });

    } catch (error) {
        console.error("Stripe Checkout Session Error:", error);
        return Response.json({ error: error.message }, { status: 500 });
    }
});