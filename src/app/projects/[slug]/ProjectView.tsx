'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { PortableText } from '@portabletext/react';
import { ArrowLeft, Briefcase, Calendar, Users, Building, ExternalLink } from 'lucide-react';
import { urlForImage } from '../../../../sanity/lib/image';
import type { Project } from './page'; // Import updated types
//import type { Project, GalleryImage } from './page'; // Import types from the server component

// --- Helper function to format dates ---
const formatDate = (dateString: string | undefined) => {
  if (!dateString) return 'N/A';
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
  });
};

// --- Custom Components for Portable Text ---
const ptComponents = {
  types: {
    // Renderer for the 'fullWidthImage' custom block
    fullWidthImage: ({ value }: { value: any }) => {
      if (!value?.asset) return null;
      return (
        <div className="my-12">
          <Image
            src={urlForImage(value.asset).url()}
            alt={value.alt || 'Project image'}
            width={1200}
            height={800}
            className="w-full h-auto rounded-lg shadow-lg"
          />
          {value.caption && <figcaption className="text-center text-sm text-gray-500 mt-2">{value.caption}</figcaption>}
        </div>
      );
    },
    // Renderer for the 'imageGallery' custom block
    imageGallery: ({ value }: { value: any }) => {
      if (!value?.images || value.images.length === 0) return null;
      return (
        <div className="my-12 grid grid-cols-1 sm:grid-cols-2 gap-8">
          {value.images.map((image: any) => (
            <div key={image._key} className="relative aspect-square rounded-lg overflow-hidden shadow-lg">
               <Image
                src={urlForImage(image.asset).url()}
                alt={image.alt || 'Gallery image'}
                fill
                className="object-cover"
              />
               {image.caption && <div className="absolute bottom-0 left-0 w-full p-2 bg-black/50 text-white text-xs text-center">{image.caption}</div>}
            </div>
          ))}
        </div>
      );
    },
    // Renderer for the 'videoEmbed' custom block
    videoEmbed: ({ value }: { value: any }) => {
        if (!value?.url) return null;
        // Basic check for YouTube URL to extract video ID
        const isYouTube = value.url.includes('youtube.com') || value.url.includes('youtu.be');
        if (isYouTube) {
            const videoId = value.url.split('v=')[1] || value.url.split('/').pop();
            const embedUrl = `https://www.youtube.com/embed/${videoId}`;
            return (
                <div className="my-12 aspect-video">
                    <iframe 
                        src={embedUrl} 
                        title="YouTube video player" 
                        frameBorder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowFullScreen
                        className="w-full h-full rounded-lg shadow-lg"
                    ></iframe>
                     {value.caption && <figcaption className="text-center text-sm text-gray-500 mt-2">{value.caption}</figcaption>}
                </div>
            );
        }
        // Add more embed logic for other providers like Vimeo if needed
        return <p>Unsupported video URL.</p>;
    }
  },
};


// --- Main View Component (Client) ---
export default function ProjectView({ project }: { project: Project }) {
  const timeline = `${formatDate(project.startDate)} – ${formatDate(project.endDate)}`;

  return (
    <div className="bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      <main>
        {/* Hero Section */}
        <section className="relative h-[50vh] min-h-[350px] flex items-end text-white">
          <div className="absolute inset-0">
            <Image src={urlForImage(project.coverImage).url()} alt={project.title} fill className="object-cover" priority />
            <div className="absolute inset-0 bg-black/60"></div>
          </div>
          <div className="relative z-10 max-w-5xl mx-auto px-4 w-full pb-12">
            <Link href="/projects" className="group inline-flex items-center gap-2 text-sm font-semibold text-white hover:text-blue-300 transition-colors mb-4">
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              All Projects
            </Link>
            <h1 className="text-4xl md:text-6xl font-extrabold mt-2">{project.title}</h1>
          </div>
        </section>

        {/* Project Metadata & Description */}
        <section className="py-16 md:py-24">
          <div className="max-w-5xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Metadata Sidebar */}
            <aside className="md:col-span-1">
              <div className="sticky top-24 p-6 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
                <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Project Details</h2>
                <ul className="space-y-4 text-sm text-gray-600 dark:text-gray-300">
                  <li className="flex items-center gap-3"><Building className="w-5 h-5 text-blue-500" /> <div><strong>Client:</strong> {project.client}</div></li>
                  <li className="flex items-center gap-3"><Briefcase className="w-5 h-5 text-blue-500" /> <div><strong>Industry:</strong> {project.industry}</div></li>
                  {/* UPDATED: Displaying new date format */}
                  <li className="flex items-center gap-3"><Calendar className="w-5 h-5 text-blue-500" /> <div><strong>Timeline:</strong> {timeline}</div></li>
                  <li className="flex items-center gap-3"><Users className="w-5 h-5 text-blue-500" /> <div><strong>My Role:</strong> {project.role}</div></li>
                </ul>
                <a href="#" className="mt-6 inline-flex w-full justify-center items-center gap-2 px-4 py-2.5 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                    View Live Project
                    <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </aside>

            {/* Main Content */}
            <div className="md:col-span-2">
              <div className="prose prose-lg max-w-none dark:prose-invert prose-a:text-blue-600">
                {/* UPDATED: PortableText now uses custom components to render new blocks */}
                <PortableText value={project.body} components={ptComponents} />
              </div>
            </div>
          </div>
        </section>

        {/* REMOVED: The old, separate gallery section is no longer needed */}
      </main>
    </div>
  );
}
