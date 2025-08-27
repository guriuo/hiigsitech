import React from 'react';
import { notFound } from 'next/navigation';
import { client } from '../../../../sanity/lib/client';
import ProjectView from './ProjectView';

// --- UPDATED: Type Definitions for the new schema ---
export type Project = {
  title: string;
  coverImage: any;
  client: string;
  industry: string;
  startDate?: string; // Changed from duration
  endDate?: string;   // Changed from duration
  role: string;
  body: any[]; // Body now contains all content blocks
  metaTitle?: string;
  metaDescription?: string;
  openGraphImage?: any;
};

// --- UPDATED: Data Fetching Function ---
async function getProject(slug: string): Promise<Project> {
  // The query now fetches the new date fields and the entire body array,
  // including the content of custom blocks like imageGallery and videoEmbed.
  const query = `*[_type == "project" && slug.current == $slug][0] {
    title,
    coverImage,
    client,
    industry,
    startDate,
    endDate,
    role,
    body[]{
      ..., 
      _type == "imageGallery" => {
        ...,
        images[]{
          ...,
          asset->
        }
      }
    },
    metaTitle,
    metaDescription,
    openGraphImage
  }`;
  const project = await client.fetch(query, { slug });
  return project;
}

// --- Main Page Component (Server) ---
export default async function ProjectDetailPage({ params }: { params: { slug: string } }) {
  const project = await getProject(params.slug);

  if (!project) {
    notFound();
  }

  return <ProjectView project={project} />;
}
