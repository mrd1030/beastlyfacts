// sanityClient.js
import { createClient } from 'next-sanity'

export const client = createClient({
  projectId: '7nqbs1gk',
  dataset: 'production',
  apiVersion: '2025-05-26',
  useCdn: true,
})