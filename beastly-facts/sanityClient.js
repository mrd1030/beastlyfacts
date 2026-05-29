// sanityClient.js (studio)
import { createClient } from '@sanity/client'
import { projectId, dataset, apiVersion } from '../shared/sanityConfig'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
})