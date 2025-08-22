// schemas/course.ts
import {defineField, defineType} from 'sanity'
// ✅ FIX: Correctly imports a valid icon from the library
import {MasterDetailIcon as GraduationCapIcon} from '@sanity/icons'

export default defineType({
  name: 'course',
  title: 'Course',
  type: 'document',
  icon: GraduationCapIcon,
  groups: [
    {name: 'content', title: 'Course Content', default: true},
    {name: 'details', title: 'Key Details'},
    {name: 'organization', title: 'Organization'},
    {name: 'seo', title: 'SEO'},
  ],
  fields: [
    // --- CONTENT GROUP ---
    defineField({
      name: 'title',
      title: 'Course Title',
      type: 'string',
      group: 'content',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'tagline',
      title: 'Short Tagline / Subtitle',
      type: 'string',
      group: 'content',
    }),
    defineField({
      name: 'description',
      title: 'Full Course Description',
      type: 'array',
      of: [{type: 'block'}],
      group: 'content',
    }),
    defineField({
      name: 'modules',
      title: 'Modules & Lessons (Curriculum)',
      type: 'array',
      group: 'content',
      of: [
        {
          type: 'object',
          name: 'module',
          title: 'Module',
          fields: [
            defineField({
              name: 'title',
              title: 'Module Title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'lessons',
              title: 'Lessons',
              type: 'array',
              of: [
                {
                  type: 'object',
                  name: 'lesson',
                  title: 'Lesson',
                  fields: [
                    defineField({
                      name: 'title',
                      title: 'Lesson Title',
                      type: 'string',
                      validation: (Rule) => Rule.required(),
                    }),
                    defineField({
                      name: 'slug',
                      title: 'Slug',
                      type: 'slug',
                      options: {
                        // ✅ FIX: This function now correctly finds the lesson's own title
                        // to generate the slug, instead of using the course title.
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
                    defineField({
                      name: 'description',
                      title: 'Short Lesson Description',
                      type: 'text',
                      rows: 2,
                    }),
                    defineField({
                        name: 'videoType',
                        title: 'Video Source',
                        type: 'string',
                        options: { list: ['url', 'file'], layout: 'radio' },
                        initialValue: 'url',
                    }),
                    defineField({
                        name: 'videoUrl',
                        title: 'Video URL (YouTube, Vimeo)',
                        type: 'url',
                        hidden: ({ parent }) => parent?.videoType !== 'url',
                    }),
                    defineField({
                        name: 'videoFile',
                        title: 'Upload Video File',
                        type: 'file',
                        options: { accept: 'video/*' },
                        hidden: ({ parent }) => parent?.videoType !== 'file',
                    }),
                    defineField({
                      name: 'resources',
                      title: 'Downloads & Resources',
                      type: 'array',
                      of: [{
                          type: 'object',
                          name: 'resource',
                          fields: [
                              { name: 'title', title: 'Resource Title', type: 'string', validation: (Rule) => Rule.required()},
                              { name: 'resourceType', title: 'Type', type: 'string', options: { list: ['file', 'link'] }, validation: (Rule) => Rule.required()},
                              { name: 'file', title: 'File', type: 'file', hidden: ({ parent }) => parent?.resourceType !== 'file' },
                              { name: 'url', title: 'URL', type: 'url', hidden: ({ parent }) => parent?.resourceType !== 'link' }
                          ]
                      }]
                    }),
                  ],
                },
              ],
            }),
          ],
        },
      ],
    }),
    defineField({
      name: 'outcomes',
      title: 'Learning Outcomes',
      description: 'Bullet list of major skills gained.',
      type: 'array',
      of: [{type: 'string'}],
      group: 'content',
    }),
    defineField({
      name: 'faq',
      title: 'Frequently Asked Questions',
      type: 'array',
      group: 'content',
      of: [{
        type: 'object',
        name: 'faqItem',
        fields: [
          {name: 'question', type: 'string', title: 'Question'},
          {name: 'answer', type: 'text', title: 'Answer', rows: 3}
        ]
      }]
    }),

    // --- DETAILS GROUP ---
    defineField({
      name: 'price',
      title: 'Price',
      type: 'number',
      group: 'details',
    }),
    defineField({
        name: 'discountPrice',
        title: 'Discount Price (Optional)',
        description: 'If set, this will be the displayed price, with the original price crossed out.',
        type: 'number',
        group: 'details',
    }),
    defineField({
      name: 'duration',
      title: 'Duration',
      description: 'e.g., "10.5 hours", "3 Weeks"',
      type: 'string',
      group: 'details',
    }),
    defineField({
      name: 'rating',
      title: 'Rating (e.g., 4.9)',
      type: 'number',
      group: 'details',
      validation: (Rule) => Rule.min(0).max(5),
    }),
    defineField({
      name: 'studentCount',
      title: 'Number of Students',
      type: 'number',
      group: 'details',
    }),
    defineField({
      name: 'difficulty',
      title: 'Difficulty Level',
      type: 'string',
      group: 'details',
      options: { list: ['Beginner', 'Intermediate', 'Advanced'], layout: 'radio' },
    }),
    defineField({
      name: 'prerequisites',
      title: 'Prerequisites',
      type: 'array',
      of: [{type: 'string'}],
      group: 'details',
    }),
    defineField({
      name: 'lastUpdated',
      title: 'Last Updated Date',
      type: 'date',
      group: 'details',
    }),

    // --- ORGANIZATION GROUP ---
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'organization',
      options: {source: 'title'},
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image / Banner',
      type: 'image',
      group: 'organization',
      options: {hotspot: true},
    }),
    defineField({
      name: 'youtubeUrl',
      title: 'YouTube Preview URL',
      description: 'Link to the YouTube video for the course preview.',
      type: 'url',
      group: 'organization',
    }),
    defineField({
      name: 'instructor',
      title: 'Instructor',
      type: 'reference',
      to: [{type: 'instructor'}],
      group: 'organization',
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      group: 'organization',
      options: { list: ['Web Development', 'Data Science', 'Marketing', 'Design'] },
    }),
    defineField({
      name: 'relatedCourses',
      title: 'Related Courses',
      type: 'array',
      group: 'organization',
      of: [{type: 'reference', to: [{type: 'course'}]}],
    }),
  ],
})