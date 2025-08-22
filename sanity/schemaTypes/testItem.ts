import {defineField, defineType} from 'sanity'

/**
 * This is a simple schema to test the connection between
 * the Next.js app and the Sanity Content Lake.
 * It only contains a single "title" field.
 */
export default defineType({
  name: 'testItem',
  title: 'Test Item',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
  ],
})
