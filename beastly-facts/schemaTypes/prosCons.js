// schemaTypes/prosCons.js
import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'prosCons',
  title: 'Pros & Cons',
  type: 'object',
  fields: [
    defineField({
      name: 'pros',
      title: 'Pros',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'cons',
      title: 'Cons',
      type: 'array',
      of: [{ type: 'string' }],
    }),
  ],
})