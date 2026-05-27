// schemaTypes/productRecommendation.js
import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'productRecommendation',
  title: 'Amazon Product Recommendation',
  type: 'object',
  fields: [
    defineField({
      name: 'productName',
      title: 'Product Name',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'asin',
      title: 'Amazon ASIN',
      type: 'string',
    }),
    defineField({
      name: 'affiliateUrl',
      title: 'Full Affiliate URL',
      type: 'url',
    }),
    defineField({
      name: 'image',
      title: 'Product Image',
      type: 'image',
    }),
    defineField({
      name: 'priceRange',
      title: 'Price Range',
      type: 'string',
    }),
    defineField({
      name: 'rating',
      title: 'Rating (out of 5)',
      type: 'number',
    }),
    defineField({
      name: 'bestFor',
      title: 'Best For',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Short Description',
      type: 'text',
      rows: 3,
    }),
  ],
})