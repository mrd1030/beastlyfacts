import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: {type: 'author'},
    }),
    defineField({
  name: 'mainImage',
  title: 'Main Image',
  type: 'image',
  options: {
    hotspot: true,
  },
  fields: [
    defineField({
      name: 'alt',
      type: 'string',
      title: 'Alt Text',
      description: 'Important for SEO (e.g., "Cute golden retriever running in the grass")',
    }),
    defineField({
      name: 'link',
      type: 'object',
      title: 'Make Image Clickable',
      fields: [
        defineField({
          name: 'urlType',
          type: 'string',
          title: 'Link Type',
          options: {
            list: [
              { title: 'No Link', value: 'none' },
              { title: 'Internal Post', value: 'internal' },
              { title: 'External Website', value: 'external' },
            ],
            layout: 'radio'
          },
          initialValue: 'none'
        }),
        defineField({
          name: 'internalRef',
          type: 'reference',
          title: 'Link to Internal Post',
          to: [{ type: 'post' }],           // Only 'post' for now (safe)
          hidden: ({ parent }) => parent?.urlType !== 'internal'
        }),
        defineField({
          name: 'externalUrl',
          type: 'url',
          title: 'External URL',
          hidden: ({ parent }) => parent?.urlType !== 'external'
        }),
        defineField({
          name: 'blank',
          type: 'boolean',
          title: 'Open in new tab?',
          initialValue: true,
          hidden: ({ parent }) => parent?.urlType !== 'external'
        })
      ]
    })
  ]
}),
    defineField({
      name: 'excerpt',
  title: 'Excerpt',
  type: 'text',
  description: 'A short summary of the article (used for SEO and social sharing)',
  rows: 3,
  validation: Rule => Rule.max(160).warning('Try to keep excerpts under 160 characters for best SEO')
    }),
    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{type: 'reference', to: {type: 'category'}}],
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'blockContent',
    }),
  ],

  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      media: 'mainImage',
    },
    prepare(selection) {
      const {author} = selection
      return {...selection, subtitle: author && `by ${author}`}
    },
  },
})
