// src/lib/sanity.js
import { createClient } from '@sanity/client'
import { projectId, dataset, apiVersion } from '../../shared/sanityConfig'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: import.meta.env.PROD,
})