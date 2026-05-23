import { createClient } from '@sanity/client'

export const client = createClient({
  projectId: '7nqbs1gk',           // ← Your actual Project ID
  dataset: 'production',
  useCdn: false,
  apiVersion: '2026-05-01',
})