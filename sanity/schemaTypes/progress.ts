// schemas/progress.ts
import {defineField, defineType} from 'sanity'
import {CheckmarkIcon} from '@sanity/icons'

export default defineType({
  name: 'progress',
  title: 'User Course Progress',
  type: 'document',
  icon: CheckmarkIcon,
  fields: [
    defineField({
      name: 'user',
      title: 'User',
      type: 'reference',
      to: [{type: 'user'}], // This 'user' type is created by the NextAuth.js Sanity adapter
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'course',
      title: 'Course',
      type: 'reference',
      to: [{type: 'course'}],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'completedLessons',
      title: 'Completed Lessons',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'completedLesson',
          fields: [
            {
              name: 'lessonKey',
              title: 'Lesson Key',
              type: 'string',
              description: 'The _key of the lesson from the course modules array.',
            },
            {
              name: 'completedAt',
              title: 'Completed At',
              type: 'datetime',
            },
          ],
        },
      ],
    }),
  ],
})