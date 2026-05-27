export const initialValueTemplates = [
    {
        id: 'beastly-post',
        title: 'New Blog Post',
        schemaType: 'post',
        value: {
            includeAffiliateDisclosure: true,
            publishedAt: new Date().toISOString(),
            body: [
                {
                    _type: 'affiliateDisclosure',
                    text: 'As an Amazon Associate, I earn from qualifying purchases. This helps support BeastlyFacts at no extra cost to you.',
                },
            ],
        },
    },
];
