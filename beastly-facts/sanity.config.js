// sanity.config.js
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemaTypes'
import { defaultDocumentNode } from './structure'

export default defineConfig({
  name: 'default',
  title: 'Beastly Facts',

  projectId: '7nqbs1gk',
  dataset: 'production',

  plugins: [
    structureTool({
      defaultDocumentNode,
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
})