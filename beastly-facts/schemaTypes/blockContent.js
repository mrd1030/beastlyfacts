import { defineType, defineField, defineArrayMember } from 'sanity';
/**
 * This is the schema definition for the rich text fields used for
 * for this blog studio. When you import it in schemas.js it can be
 * reused in other parts of the studio with:
 *  {
 *    name: 'someName',
 *    title: 'Some title',
 *    type: 'blockContent'
 *  }
 */
export default defineType({
    title: 'Block Content',
    name: 'blockContent',
    type: 'array',
    of: [
        defineArrayMember({
            title: 'Block',
            type: 'block',
            // Styles let you set what your user can mark up blocks with. These
            // correspond with HTML tags, but you can set any title or value
            // you want and decide how you want to deal with it where you want to
            // use your content.
            styles: [
                { title: 'Normal', value: 'normal' },
                { title: 'H1', value: 'h1' },
                { title: 'H2', value: 'h2' },
                { title: 'H3', value: 'h3' },
                { title: 'H4', value: 'h4' },
                { title: 'Quote', value: 'blockquote' },
            ],
            lists: [{ title: 'Bullet', value: 'bullet' }],
            // Marks let you mark up inline text in the block editor.
            marks: {
                // Decorators usually describe a single property – e.g. a typographic
                // preference or highlighting by editors.
                decorators: [
                    { title: 'Strong', value: 'strong' },
                    { title: 'Emphasis', value: 'em' },
                ],
                // Annotations can be any object structure – e.g. a link or a footnote.
                annotations: [
                    {
                        title: 'URL',
                        name: 'link',
                        type: 'object',
                        fields: [
                            {
                                title: 'URL',
                                name: 'href',
                                type: 'url',
                            },
                        ],
                    },
                ],
            },
        }),
        // You can add additional types here. Note that you can't use
        // primitive types such as 'string' and 'number' in the same array
        // as a block type.
        defineArrayMember({
            type: 'image',
            name: 'image',
            title: 'Image',
            options: { hotspot: true },
            fields: [
                defineField({
                    name: 'alt',
                    type: 'string',
                    title: 'Alt Text',
                    description: 'Very important for pet SEO!',
                }),
                defineField({
                    name: 'caption',
                    type: 'string',
                    title: 'Caption (optional)',
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
                            title: 'Link to Post',
                            to: [{ type: 'post' }],
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
        })
    ]
});
