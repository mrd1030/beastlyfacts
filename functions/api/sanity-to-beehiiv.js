// functions/api/sanity-to-beehiiv.js
import { toHTML } from '@portabletext/to-html';

const myCustomComponents = {
  types: {
    // 1. Map affiliateDisclosure schema exactly
    affiliateDisclosure: ({ value }) => {
      const disclosureText = value.text || 'As an Amazon Associate, I earn from qualifying purchases. This helps support BeastlyFacts at no extra cost to you.';
      return `
        <div style="background-color: #fcfcfc; border-left: 3px solid #ff9900; padding: 12px; margin: 16px 0; font-size: 13px; font-style: italic; color: #666; font-family: sans-serif;">
          <p style="margin: 0;">${disclosureText}</p>
        </div>
      `;
    },

    // 2. Map prosCons schema exactly
    prosCons: ({ value }) => {
      const prosList = value.pros?.map(pro => `<li style="margin-bottom: 6px; color: #2e7d32;">✔️ ${pro}</li>`).join('') || '';
      const consList = value.cons?.map(con => `<li style="margin-bottom: 6px; color: #c62828;">❌ ${con}</li>`).join('') || '';
      
      return `
        <div style="margin: 20px 0; font-family: sans-serif;">
          <div style="background-color: #e8f5e9; padding: 14px; border-radius: 6px; margin-bottom: 12px;">
            <strong style="color: #1b5e20; font-size: 15px;">What We Like (Pros):</strong>
            <ul style="list-style: none; padding-left: 0; margin: 8px 0 0 0; font-size: 14px;">${prosList}</ul>
          </div>
          <div style="background-color: #ffebee; padding: 14px; border-radius: 6px;">
            <strong style="color: #b71c1c; font-size: 15px;">What to Consider (Cons):</strong>
            <ul style="list-style: none; padding-left: 0; margin: 8px 0 0 0; font-size: 14px;">${consList}</ul>
          </div>
        </div>
      `;
    },

    // 3. Map productRecommendation schema exactly
    productRecommendation: ({ value }) => {
      const stars = value.rating ? '⭐'.repeat(Math.round(value.rating)) : '';
      return `
        <div style="border: 1px solid #e0e0e0; border-top: 4px solid #ff9900; border-radius: 8px; padding: 20px; margin: 24px 0; font-family: sans-serif; background-color: #fff;">
          <h3 style="margin-top: 0; color: #111; font-size: 18px;">${value.productName}</h3>
          
          <p style="font-size: 13px; color: #666; margin: 6px 0 14px 0;">
            ${value.bestFor ? `<strong>Best For:</strong> ${value.bestFor} ` : ''}
            ${value.priceRange ? ` | <strong>Price:</strong> ${value.priceRange}` : ''}
            ${stars ? ` | <strong>Rating:</strong> ${stars}` : ''}
          </p>
          
          <p style="color: #333; font-size: 14px; line-height: 1.5; margin-bottom: 16px;">${value.description || ''}</p>
          
          <div style="text-align: center;">
            <a href="${value.affiliateUrl || '#'}" target="_blank" style="display: inline-block; background-color: #ff9900; color: #ffffff; padding: 10px 20px; text-decoration: none; font-weight: bold; border-radius: 4px; font-size: 14px;">
              Check Price on Amazon
            </a>
          </div>
        </div>
      `;
    },

    // 4. Map comparisonTable schema exactly (Headers + Rows)
    comparisonTable: ({ value }) => {
      const tableHeaders = value.headers?.map(header => `
        <th style="padding: 12px; border: 1px solid #ddd; background-color: #f4f4f4; text-align: left; font-size: 14px; font-weight: bold;">${header}</th>
      `).join('') || '';

      const tableRows = value.rows?.map(rowItem => {
        const rowCells = rowItem.cells?.map(cell => `
          <td style="padding: 10px; border: 1px solid #ddd; font-size: 13px; color: #333;">${cell}</td>
        `).join('') || '';
        return `<tr>${rowCells}</tr>`;
      }).join('') || '';

      return `
        <div style="overflow-x: auto; margin: 24px 0; font-family: sans-serif;">
          ${value.title ? `<strong style="font-size: 16px; display: block; margin-bottom: 8px; color: #111;">${value.title}</strong>` : ''}
          <table style="width: 100%; border-collapse: collapse;">
            <thead><tr>${tableHeaders}</tr></thead>
            <tbody>${tableRows}</tbody>
          </table>
        </div>
      `;
    }
  }
};

export async function onRequestPost(context) {
  const { request, env } = context;

  try {
    const payload = await request.json();
    const { title, excerpt, body, animalType, readTime } = payload;

    // Convert Sanity content blocks directly into styling-sealed HTML
    let htmlBody = toHTML(body, { components: myCustomComponents });

    // Prepend metadata badges nicely
    if (animalType || readTime) {
      const metaBadge = `
        <p style="font-family: sans-serif; font-size: 12px; color: #888; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 16px;">
          ${animalType ? `🐾 <strong>Type:</strong> ${animalType} ` : ''} 
          ${readTime ? ` ⏱️ <strong>Read Time:</strong> ${readTime} mins` : ''}
        </p>
        <hr style="border: 0; border-top: 1px solid #eef0f2; margin-bottom: 20px;" />
      `;
      htmlBody = metaBadge + htmlBody;
    }

    // Wrap the inner text into a clean email container to review before copying
    const fullEmailHtml = `
      <div style="background-color: #f5f5f5; padding: 30px; font-family: sans-serif;">
        <div style="max-width: 600px; background-color: #ffffff; padding: 30px; margin: 0 auto; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
          <h1 style="color: #111; font-size: 26px; margin-top: 0; margin-bottom: 6px;">${title || 'Untitled Post'}</h1>
          <p style="font-size: 16px; color: #555; font-style: italic; margin-top: 0; margin-bottom: 24px;">${excerpt || ''}</p>
          <div style="line-height: 1.6; color: #222;">
            ${htmlBody}
          </div>
        </div>
      </div>
    `;

    // Fire the message directly to your personal email via Resend API
    const resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${env.RESEND_API_KEY}`
      },
      body: JSON.stringify({
        from: 'onboarding@resend.dev', // Default safe sandbox address
        to: env.MY_PERSONAL_EMAIL,    // Destined for your inbox
        subject: `📝 Newsletter Draft: ${title || 'New Post'}`,
        html: fullEmailHtml
      })
    });

    if (!resendResponse.ok) {
      const errorData = await resendResponse.json();
      return new Response(JSON.stringify({ success: false, error: errorData }), { status: 400 });
    }

    const data = await resendResponse.json();
    return new Response(JSON.stringify({ success: true, message: 'Email draft sent successfully!', data }), { status: 200 });

  } catch (error) {
    return new Response(JSON.stringify({ success: false, error: error.message }), { status: 500 });
  }
}