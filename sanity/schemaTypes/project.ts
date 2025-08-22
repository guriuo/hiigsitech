import {defineField, defineType} from 'sanity'
import {CaseIcon} from '@sanity/icons'

export default defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  icon: CaseIcon,
  groups: [
    {name: 'metadata', title: 'Project Metadata', default: true},
    {name: 'content', title: 'Page Content'},
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
      type: 'image',
      group: 'metadata',
      options: {hotspot: true},
      validation: (Rule) => Rule.required(),
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
    defineField({
      name: 'duration',
      title: 'Project Duration / Timeline',
      type: 'string',
      group: 'metadata',
      description: 'e.g., 3 Weeks (Jan 2025 – Feb 2025)',
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
    defineField({
      name: 'body',
      title: 'Main Project Description',
      type: 'array',
      group: 'content',
      description: 'The detailed description of the project.',
      of: [{type: 'block'}],
    }),
    defineField({
      name: 'gallery',
      title: 'Project Gallery',
      type: 'array',
      group: 'content',
      description: 'Upload images and tag them (e.g., "App", "Web", "Branding").',
      of: [
        defineField({
          name: 'galleryImage',
          title: 'Image',
          type: 'image',
          options: {hotspot: true},
          fields: [
            defineField({
              name: 'tag',
              title: 'Tag',
              type: 'string',
              options: {
                list: [
                  {title: 'App', value: 'App'},
                  {title: 'Web', value: 'Web'},
                  {title: 'Branding', value: 'Branding'},
                ],
                layout: 'radio',
              },
              validation: (Rule) => Rule.required(),
            }),
          ],
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'category',
      media: 'coverImage',
    },
  },
})
