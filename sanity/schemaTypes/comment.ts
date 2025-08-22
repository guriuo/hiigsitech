// sanity-project/schemas/comment.ts
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'comment',
  title: 'Comment',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      readOnly: true,
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      readOnly: true,
    }),
    defineField({
      name: 'comment',
      title: 'Comment',
      type: 'text',
      readOnly: true,
    }),
    defineField({
      name: 'post',
      title: 'Post',
      type: 'reference',
      to: [{type: 'post'}],
      readOnly: true,
    }),
    // ✅ UPDATE: Add a reference to another comment for replies
    defineField({
      name: 'parent',
      title: 'Parent Comment',
      type: 'reference',
      to: [{type: 'comment'}],
      options: {
        // Only allow referencing top-level comments
        filter: '!defined(parent)'
      },
      readOnly: true,
    }),
    // ✅ UPDATE: Add a field to identify admin comments
    defineField({
      name: 'isAdmin',
      title: 'Is Admin',
      type: 'boolean',
      initialValue: false,
      readOnly: true,
    }),
    defineField({
        name: 'createdAt',
        title: 'Created At',
        type: 'datetime',
        readOnly: true,
    })
  ],
})