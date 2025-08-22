// schemas/quiz.ts
import {defineField, defineType} from 'sanity'
import {HelpCircleIcon} from '@sanity/icons'

export default defineType({
  name: 'quiz',
  title: 'Quiz',
  type: 'document',
  icon: HelpCircleIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Quiz Title',
      type: 'string',
      description: 'e.g., "Module 1: Knowledge Check"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'questions',
      title: 'Questions',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'question',
          fields: [
            defineField({
              name: 'questionText',
              title: 'Question Text',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'options',
              title: 'Options',
              type: 'array',
              of: [{type: 'string'}],
              validation: (Rule) => Rule.min(2).error('You must have at least two options.'),
            }),
            defineField({
              name: 'correctAnswerIndex',
              title: 'Correct Answer Index',
              type: 'number',
              description: 'The index of the correct option above (starts at 0).',
              validation: (Rule) => Rule.required().integer().min(0),
            }),
          ],
        },
      ],
    }),
  ],
})
