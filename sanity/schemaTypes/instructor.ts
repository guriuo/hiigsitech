// schemas/instructor.ts
import {defineField, defineType} from 'sanity'
import {UsersIcon} from '@sanity/icons'

export default defineType({
  name: 'instructor',
  title: 'Instructor',
  type: 'document',
  icon: UsersIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Full Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'avatar',
      title: 'Avatar',
      type: 'image',
      options: {hotspot: true},
      validation: (Rule) => Rule.required(),
    }),
    // ✅ NEW: Short bio for the instructor card
    defineField({
        name: 'bio',
        title: 'Short Bio',
        description: 'A brief, one-line introduction (e.g., "Lead Developer at Google").',
        type: 'string',
    }),
    // ✅ NEW: Credentials and experience details
    defineField({
        name: 'credentials',
        title: 'Credentials & Experience',
        description: 'A rich text field for detailing experience, qualifications, and professional background.',
        type: 'array',
        of: [{type: 'block'}]
    })
  ],
})