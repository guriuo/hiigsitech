import React from 'react';
import { notFound } from 'next/navigation';
import { client } from '../../../../sanity/lib/client'; // Adjust path
import ProjectView from './ProjectView'; // <-- THIS PATH IS NOW CORRECTED

// --- Type Definitions ---
// It's good practice to define types that can be shared
export type GalleryImage = {
  _key: string;
  _type: 'galleryImage';
  asset: any;
  tag: 'App' | 'Web' | 'Branding';
};

export type Project = {
  title: string;
  coverImage: any;
  client: string;
  industry: string;
  duration: string;
  role: string;
  body: any[];
  gallery: GalleryImage[];
};

// --- Data Fetching Function ---
async function getProject(slug: string): Promise<Project> {
  const query = `*[_type == "project" && slug.current == $slug][0] {
    title, coverImage, client, industry, duration, role, body, gallery
  }`;
  const project = await client.fetch(query, { slug });
  return project;
}

// --- Main Page Component (Server) ---
export default async function ProjectDetailPage({ params }: { params: { slug: string } }) {
  const project = await getProject(params.slug);

  // If no project is found, show the 404 page
  if (!project) {
    notFound();
  }

  // Render the Client Component and pass the fetched data as a prop
  return <ProjectView project={project} />;
}
