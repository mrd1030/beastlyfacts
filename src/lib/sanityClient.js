// lib/sanityClient.ts
import { createClient } from '@sanity/client';
export const client = createClient({
    projectId: '7nqbs1gk',
    dataset: 'production',
    apiVersion: '2025-05-26', // Updated to current/recent date
    useCdn: import.meta.env.PROD,
    // token: process.env.SANITY_API_TOKEN,   // Uncomment only if needed for mutations
});