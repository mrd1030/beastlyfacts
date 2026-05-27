// schemaTypes/affiliateDisclosure.js
import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'affiliateDisclosure',
  title: 'Affiliate Disclosure',
  type: 'object',
  fields: [
    defineField({
      name: 'text',
      title: 'Disclosure Text',
      type: 'text',
      initialValue: 'As an Amazon Associate, I earn from qualifying purchases. This helps support BeastlyFacts at no extra cost to you.',
    }),
  ],
})