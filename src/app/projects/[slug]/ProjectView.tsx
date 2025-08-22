'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { PortableText } from '@portabletext/react';
import { ArrowLeft, Briefcase, Calendar, Users, Building, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { urlForImage } from '../../../../sanity/lib/image'; // Adjust path
import type { Project, GalleryImage } from './page'; // Import types from the server component

// --- Main View Component (Client) ---
export default function ProjectView({ project }: { project: Project }) {
  const [activeTag, setActiveTag] = useState('All');

  const galleryTags = ['All', ...Array.from(new Set(project.gallery?.map(img => img.tag) || []))];
  const filteredGallery = activeTag === 'All' 
    ? project.gallery 
    : project.gallery?.filter(img => img.tag === activeTag);

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
                  <li className="flex items-center gap-3"><Calendar className="w-5 h-5 text-blue-500" /> <div><strong>Timeline:</strong> {project.duration}</div></li>
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
              <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">About the Project</h2>
              <div className="prose prose-lg max-w-none dark:prose-invert prose-a:text-blue-600">
                <PortableText value={project.body} />
              </div>
            </div>
          </div>
        </section>

        {/* Image Gallery Section */}
        {filteredGallery && filteredGallery.length > 0 && (
          <section className="pb-16 md:pb-24">
            <div className="max-w-5xl mx-auto px-4">
              <h2 className="text-3xl font-bold mb-8 text-center text-gray-900 dark:text-white">Gallery</h2>
              {/* Filter Buttons */}
              <div className="flex justify-center flex-wrap gap-4 mb-12">
                {galleryTags.map(tag => (
                  <button
                    key={tag}
                    onClick={() => setActiveTag(tag)}
                    className={`relative px-5 py-2 text-sm font-semibold rounded-full transition-colors duration-300 focus:outline-none ${activeTag !== tag && 'hover:bg-gray-200 dark:hover:bg-gray-700'}`}
                  >
                    {activeTag === tag && (
                      <motion.div layoutId="gallery-pill" className="absolute inset-0 bg-blue-600 rounded-full" transition={{ type: "spring", stiffness: 300, damping: 30 }} />
                    )}
                    <span className={`relative z-10 ${activeTag === tag ? 'text-white' : 'text-gray-700 dark:text-gray-300'}`}>{tag}</span>
                  </button>
                ))}
              </div>
              {/* Image Grid */}
              <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <AnimatePresence>
                  {filteredGallery.map((image) => (
                    <motion.div
                      key={image._key}
                      layout
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.4, ease: 'backOut' }}
                      className="relative aspect-square rounded-lg overflow-hidden shadow-lg"
                    >
                      <Image src={urlForImage(image.asset).url()} alt={image.tag} fill className="object-cover" />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
