// sanity/schemas/author.ts
import {defineField, defineType} from 'sanity'
import {UserIcon} from '@sanity/icons'

export default defineType({
  name: 'author',
  title: 'Author',
  type: 'document',
  icon: UserIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {hotspot: true},
      validation: (Rule) => Rule.required(),
    }),
    // ✅ ADDED: A new field for the author's description/bio
    defineField({
      name: 'bio',
      title: 'Biography / Short Description',
      type: 'text',
      rows: 3,
      description: 'A short description about the author.',
    }),
  ],
})