// sanity.config.ts

import {defineConfig, type SchemaTypeDefinition} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'

// 1. Import all your schemas
import testItem from './sanity/schemaTypes/testItem'
import post from './sanity/schemaTypes/post'
import project from './sanity/schemaTypes/project'
import course from './sanity/schemaTypes/course'
import instructor from './sanity/schemaTypes/instructor'
import author from './sanity/schemaTypes/author' // 👇 ADD THIS LINE to import your author schema


// 2. Add the new schemas to the array
const schemas: SchemaTypeDefinition[] = [
    testItem,
    post,
    project,
    course,
    instructor,
    author // 👇 ADD THIS LINE to register your author schema
]

export default defineConfig({
  basePath: '/studio',
  name: 'default',
  title: 'Mubarik Osman',
  
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  
  plugins: [
    structureTool(),
    visionTool()
  ],

  schema: {
    types: schemas,
  },
})