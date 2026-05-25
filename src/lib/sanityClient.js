import { createClient } from '@sanity/client'

export const client = createClient({
  projectId: '7nqbs1gk',
  dataset: 'production',
  apiVersion: '2025-01-01',
  useCdn: true,
})