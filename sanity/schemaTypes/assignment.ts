// schemas/assignment.ts
import {defineField, defineType} from 'sanity'
import {ClipboardIcon} from '@sanity/icons'

export default defineType({
  name: 'assignment',
  title: 'Assignment',
  type: 'document',
  icon: ClipboardIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Assignment Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'instructions',
      title: 'Instructions',
      type: 'array',
      of: [{type: 'block'}],
      description: 'Detailed instructions for the assignment.',
    }),
    defineField({
      name: 'dueDate',
      title: 'Due Date',
      type: 'date',
      options: {
        dateFormat: 'YYYY-MM-DD',
      },
    }),
  ],
})
