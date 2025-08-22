// sanity.config.ts
import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schema} from './sanity/schemaTypes' // Correctly points to your schemas

// Get project ID and dataset from the .env.local file
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!

export default defineConfig({
  basePath: '/studio', // This is the URL for your admin panel
  name: 'Aleen_Creatives_Content_Studio',
  title: 'Aleen Creatives Studio',
  projectId,
  dataset,
  plugins: [
    structureTool(),
    visionTool(), // A tool for testing your queries
  ],
  schema,
})