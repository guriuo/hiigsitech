import {defineField, defineType} from 'sanity'
import {CaseIcon} from '@sanity/icons'

export default defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  icon: CaseIcon,
  // Added 'seo' group for better organization
  groups: [
    {name: 'metadata', title: 'Project Metadata', default: true},
    {name: 'content', title: 'Page Content'},
    {name: 'seo', title: 'SEO'},
  ],
  fields: [
    // --- METADATA GROUP ---
    defineField({
      name: 'title',
      title: 'Project Title',
      type: 'string',
      group: 'metadata',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'metadata',
      options: {source: 'title', maxLength: 96},
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      description: 'The main image that appears on project listing pages.',
      type: 'image',
      group: 'metadata',
      options: {hotspot: true},
      validation: (Rule) => Rule.required(),
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
          description: 'Important for SEO and accessibility.',
        },
      ],
    }),
    defineField({
      name: 'category',
      title: 'Main Category',
      type: 'string',
      group: 'metadata',
      description: 'e.g., Web Development, Branding, UI/UX Design',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'client',
      title: 'Client Name / Company',
      type: 'string',
      group: 'metadata',
      initialValue: 'Confidential Client',
    }),
    defineField({
      name: 'industry',
      title: 'Industry / Niche',
      type: 'string',
      group: 'metadata',
      description: 'e.g., Tech Startup, Fashion, Education',
    }),
    // --- UPDATED: Replaced 'duration' with structured start and end dates ---
    defineField({
      name: 'startDate',
      title: 'Project Start Date',
      type: 'date',
      group: 'metadata',
    }),
    defineField({
      name: 'endDate',
      title: 'Project End Date',
      type: 'date',
      group: 'metadata',
    }),
    defineField({
      name: 'role',
      title: 'My Role',
      type: 'string',
      group: 'metadata',
      description: 'e.g., Lead Developer, UI/UX Designer',
    }),

    // --- CONTENT GROUP ---
    defineField({
      name: 'excerpt',
      title: 'Excerpt / Short Description',
      type: 'text',
      group: 'content',
      rows: 3,
      description: 'A brief summary shown on the project card.',
      validation: (Rule) => Rule.required().max(200),
    }),
    // --- UPDATED: 'body' now includes custom blocks for rich content ---
    defineField({
      name: 'body',
      title: 'Main Project Content',
      type: 'array',
      group: 'content',
      description: 'Build the project page with text, images, galleries, and videos.',
      of: [
        // Standard text block
        {type: 'block'},
        // Custom block for a single, full-width image
        defineField({
          name: 'fullWidthImage',
          title: 'Full-Width Image',
          type: 'image',
          options: {hotspot: true},
          fields: [
            defineField({
              name: 'caption',
              title: 'Caption',
              type: 'string',
            }),
            defineField({
              name: 'imageUrl',
              title: 'Image URL',
              type: 'url',
              description: 'Use this to link to an image hosted online instead of uploading.',
            }),
            defineField({
              name: 'thumbnail',
              title: 'Thumbnail',
              type: 'image',
              description: 'A smaller version of the image, if needed.',
            }),
            defineField({
                name: 'alt',
                type: 'string',
                title: 'Alternative text',
                description: 'Important for SEO and accessibility.',
            }),
          ],
        }),
        // Custom block for an image gallery/grid
        defineField({
          name: 'imageGallery',
          title: 'Image Gallery',
          type: 'object',
          fields: [
            defineField({
              name: 'images',
              title: 'Images',
              type: 'array',
              of: [
                defineField({
                  name: 'galleryImage',
                  title: 'Image',
                  type: 'image',
                  options: {hotspot: true},
                  fields: [
                    defineField({
                      name: 'caption',
                      title: 'Caption',
                      type: 'string',
                    }),
                    defineField({
                      name: 'imageUrl',
                      title: 'Image URL',
                      type: 'url',
                      description: 'Link to an online image instead of uploading.',
                    }),
                    defineField({
                      name: 'thumbnail',
                      title: 'Thumbnail',
                      type: 'image',
                    }),
                    defineField({
                        name: 'alt',
                        type: 'string',
                        title: 'Alternative text',
                    }),
                  ],
                }),
              ],
            }),
          ],
        }),
        // Custom block for embedding videos
        defineField({
          name: 'videoEmbed',
          title: 'Video Embed',
          type: 'object',
          fields: [
            defineField({
              name: 'url',
              title: 'Video URL',
              type: 'url',
              description: 'Paste the URL from YouTube, Vimeo, etc.',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'caption',
              title: 'Caption',
              type: 'string',
            }),
          ],
        }),
      ],
    }),
    
    // --- NEW: SEO GROUP ---
    defineField({
      name: 'metaTitle',
      title: 'Meta Title',
      type: 'string',
      group: 'seo',
      description: 'The title that appears in the browser tab and in search engine results. Aim for under 60 characters.',
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'text',
      rows: 3,
      group: 'seo',
      description: 'The summary that appears in search engine results. Aim for under 160 characters.',
    }),
    defineField({
      name: 'openGraphImage',
      title: 'Social Share Image (Open Graph)',
      type: 'image',
      group: 'seo',
      description: 'The image that appears when you share a link to this project on social media. Recommended size: 1200x630 pixels.',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'category',
      media: 'coverImage',
    },
  },
  /* NOTE ON DELETING AND DOWNLOADING PROJECTS:
    - Deleting a project is a built-in feature in Sanity Studio. When you open a project document, 
      you can click the menu icon (three dots) and select "Delete".
    - Downloading (exporting) all your project data is done through the Sanity CLI (Command Line Interface) 
      using the command `sanity dataset export`. This is not configured within the schema itself.
  */
})
