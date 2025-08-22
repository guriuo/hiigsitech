// sanity-project/schemas/contactSubmission.ts
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'contactSubmission',
  title: 'Contact Submission',
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
    // ✅ UPDATE: Add the phone field
    defineField({
      name: 'phone',
      title: 'Phone',
      type: 'string',
      readOnly: true,
    }),
    defineField({
      name: 'project',
      title: 'Company / Project',
      type: 'string',
      readOnly: true,
    }),
    defineField({
      name: 'message',
      title: 'Message',
      type: 'text',
      readOnly: true,
    }),
    defineField({
        name: 'createdAt',
        title: 'Received At',
        type: 'datetime',
        readOnly: true,
    })
  ],
})