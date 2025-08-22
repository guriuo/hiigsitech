import {defineField, defineType} from 'sanity'
import {DocumentTextIcon} from '@sanity/icons'

export default defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  icon: DocumentTextIcon,

  // Organize fields into logical groups (tabs in the editor)
  groups: [
    {name: 'content', title: 'Content', default: true},
    {name: 'metadata', title: 'Metadata & Organization'},
    {name: 'seo', title: 'SEO'},
  ],

  fields: [
    // --- CONTENT GROUP ---
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      group: 'content',
      description: 'A catchy, clear, and SEO-friendly title.',
      validation: (Rule) => Rule.required(),
    }),
    
    // +++ ADDED: New 'kayd' field +++
    defineField({
      name: 'kayd',
      title: 'Kayd',
      type: 'string',
      group: 'content',
    }),

    defineField({
      name: 'body',
      title: 'Body Content',
      type: 'array',
      group: 'content',
      description: 'The main content of the article.',
      of: [
        // 1. Rich Text Editor (Paragraphs, Headings, etc.)
        {
          type: 'block',
          styles: [
            {title: 'Paragraph', value: 'normal'},
            {title: 'Heading 2', value: 'h2'},
            {title: 'Heading 3', value: 'h3'},
            {title: 'Quote', value: 'blockquote'},
          ],
          lists: [
            {title: 'Bulleted List', value: 'bullet'},
            {title: 'Numbered List', value: 'number'},
          ],
          marks: {
            decorators: [
              {title: 'Bold', value: 'strong'},
              {title: 'Italic', value: 'em'},
              {title: 'Underline', value: 'underline'},
            ],
            // For internal and external links
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Link',
                fields: [{name: 'href', type: 'url', title: 'URL'}],
              },
            ],
          },
        },
        // 2. Media Integration (Images, Videos)
        defineField({
          name: 'inlineImage',
          title: 'Image',
          type: 'image',
          options: {hotspot: true},
          fields: [
            defineField({
              name: 'alt',
              title: 'Alt Text (for SEO)',
              type: 'string',
              description: 'A short description of the image.',
              validation: (Rule) => Rule.required(),
            }),
          ],
        }),
        defineField({
          name: 'youtubeEmbed',
          title: 'YouTube Video',
          type: 'object',
          fields: [
            defineField({
              name: 'url',
              title: 'YouTube Video URL',
              type: 'url',
              validation: (Rule) => Rule.required(),
            }),
          ],
        }),
        // 3. Content Structure & "Premium" Extras
        defineField({
          name: 'callout',
          title: 'Callout / Highlight Box',
          type: 'object',
          fields: [
            defineField({
              name: 'text',
              title: 'Text',
              type: 'text',
              rows: 2,
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'style',
              title: 'Style',
              type: 'string',
              options: {
                list: [
                  {title: 'Info (Blue)', value: 'info'},
                  {title: 'Success (Green)', value: 'success'},
                  {title: 'Warning (Yellow)', value: 'warning'},
                  {title: 'Danger (Red)', value: 'danger'},
                ],
                layout: 'radio',
              },
              initialValue: 'info',
            }),
          ],
        }),
        defineField({
          name: 'accordion',
          title: 'Accordion / Click-to-Expand',
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Visible Title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'content',
              title: 'Hidden Content',
              type: 'array',
              of: [{type: 'block'}], // A mini rich text editor inside
            }),
          ],
        }),
        // +++ ADDED: Option to upload a PDF file directly +++
        defineField({
          name: 'pdfFile',
          title: 'PDF Upload',
          type: 'object',
          fields: [
            defineField({
              name: 'file',
              title: 'PDF File',
              type: 'file',
              options: {
                accept: '.pdf', // Only allow PDF files
              },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'description',
              title: 'Description / Link Text',
              type: 'string',
              description: 'e.g., "Download the full report"',
            }),
          ],
        }),
        // +++ ADDED: Option to link to an external PDF +++
        defineField({
          name: 'pdfLink',
          title: 'PDF Link (External)',
          type: 'object',
          fields: [
            defineField({
              name: 'url',
              title: 'PDF URL',
              type: 'url',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'description',
              title: 'Description / Link Text',
              type: 'string',
              description: 'e.g., "View the case study online"',
            }),
          ],
        }),
      ],
    }),

    // --- METADATA & ORGANIZATION GROUP ---
    defineField({
      name: 'slug',
      title: 'Slug / URL',
      type: 'slug',
      group: 'metadata',
      options: {source: 'title', maxLength: 96},
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'coverImage', // Matching the name used in your queries
      title: 'Cover Image / Thumbnail',
      type: 'image',
      group: 'metadata',
      options: {hotspot: true},
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt Text (for SEO)',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
      ],
      // NOTE: The required rule was removed to allow the URL fallback
    }),
    // +++ ADDED: A new field for a fallback Cover Image URL +++
    defineField({
      name: 'coverImageUrl',
      title: 'Cover Image URL (Fallback)',
      type: 'url',
      group: 'metadata',
      description: 'If you do not upload a cover image above, you can provide an external image URL here instead.',
    }),
    
    // +++ UPDATED: The original 'author' text field is replaced by this 'reference' field +++
    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      group: 'metadata',
      to: [{type: 'author'}],
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
      group: 'metadata',
      initialValue: () => new Date().toISOString(),
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      group: 'metadata',
      of: [{type: 'string'}],
      options: {layout: 'tags'},
    }),
    
    // ✅ ADDED: View Count Field
    defineField({
        name: 'views',
        title: 'View Count',
        type: 'number',
        group: 'metadata',
        description: 'This number is automatically updated when a user visits the post page.',
        readOnly: true, // Make it read-only in the studio
        initialValue: 0, // Start every new post with 0 views
    }),

    defineField({
        name: 'relatedPosts',
        title: 'Related Posts',
        type: 'array',
        group: 'metadata',
        description: 'Manually select posts to show as related content.',
        of: [{type: 'reference', to: [{type: 'post'}]}],
    }),

    // --- SEO GROUP ---
    defineField({
      name: 'excerpt',
      title: 'Excerpt / Introduction',
      type: 'text',
      group: 'seo',
      rows: 3,
      description: 'A short, attention-grabbing summary of the post.',
      validation: (Rule) => Rule.required().max(200),
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'text',
      group: 'seo',
      rows: 3,
      description: 'For search engine results (around 160 characters).',
      validation: (Rule) => Rule.max(160),
    }),
  ],

  // Customize the preview in the Sanity document list
  preview: {
    select: {
      title: 'title',
      // +++ UPDATED: This now correctly shows the author's name in the list +++
      subtitle: 'author.name',
      media: 'coverImage',
    },
  },
})