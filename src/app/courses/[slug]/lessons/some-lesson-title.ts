// schemas/course.ts
import {defineField, defineType} from 'sanity'
import {MasterDetailIcon as GraduationCapIcon} from '@sanity/icons'

export default defineType({
  name: 'course',
  title: 'Course',
  type: 'document',
  icon: GraduationCapIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Course Title',
      type: 'string',
    }),
    defineField({
      name: 'modules',
      title: 'Modules & Lessons (Curriculum)',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'module',
          fields: [
            defineField({ name: 'title', type: 'string' }),
            defineField({
              name: 'lessons',
              title: 'Lessons',
              type: 'array',
              of: [
                {
                  type: 'object',
                  name: 'lesson',
                  fields: [
                    defineField({
                      name: 'title',
                      title: 'Lesson Title',
                      type: 'string',
                    }),
                    defineField({
                      name: 'slug',
                      title: 'Slug',
                      type: 'slug',
                      options: {
                        // ✅ THIS IS THE FIX FOR SLUG GENERATION
                        source: (doc, options) => {
                          const parentModule = (options.parentPath as any[]).slice(-3, -2)[0];
                          const parentLesson = parentModule?.lessons?.find(
                            (lesson: any) => lesson._key === (options.parent as any)._key
                          );
                          return parentLesson?.title || '';
                        },
                      },
                      validation: (Rule) => Rule.required(),
                    }),
                    // ... other lesson fields
                  ],
                },
              ],
            }),
          ],
        },
      ],
    }),
    // ... other course fields
  ],
})