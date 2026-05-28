// src/lib/sanity.js
import { createClient } from '@sanity/client'

export const client = createClient({
  projectId: '7nqbs1gk',
  dataset: 'production',
  apiVersion: '2025-05-26',
  useCdn: import.meta.env.PROD,        // This is the correct way for Vite
})