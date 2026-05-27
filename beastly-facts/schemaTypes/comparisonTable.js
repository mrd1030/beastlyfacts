// schemaTypes/comparisonTable.js
import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'comparisonTable',
  title: 'Comparison Table',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Table Title',
      type: 'string',
      initialValue: 'Product Comparison',
    }),
    defineField({
      name: 'headers',
      title: 'Column Headers',
      type: 'array',
      of: [{ type: 'string' }],
      initialValue: ['Product', 'Best For', 'Price', 'Rating'],
    }),
    defineField({
      name: 'rows',
      title: 'Rows',
      type: 'array',
      of: [
        defineField({
          name: 'row',
          title: 'Row',
          type: 'object',
          fields: [
            defineField({
              name: 'cells',
              title: 'Cells',
              type: 'array',
              of: [{ type: 'string' }],
            })
          ]
        })
      ]
    })
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare({ title }) {
      return {
        title: title || 'Comparison Table',
      }
    },
  },
})