'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { client } from "../../../sanity/lib/client";
import { urlForImage } from "../../../sanity/lib/image";

// --- Type Definition for Project Data ---
type Project = {
  _id: string;
  title: string;
  slug: string;
  coverImage: any;
  category: string;
  excerpt: string;
};

// --- Animation Variants for Staggering ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1 // This will animate each child with a 0.1s delay
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.4, ease: 'easeOut' }
  }
};


// --- Reusable Project Card Component ---
const ProjectCard = ({ project }: { project: Project }) => (
  // The card now uses the `cardVariants`
  <motion.div
    variants={cardVariants}
    layout // Keep the layout prop for smooth repositioning
    exit={{ opacity: 0, scale: 0.8 }} // You can still have a custom exit animation
    transition={{ duration: 0.4, ease: 'backOut' }}
    className="group relative h-[500px] rounded-2xl overflow-hidden shadow-xl transform hover:-translate-y-2 transition-transform duration-300"
  >
    <Link href={`/projects/${project.slug}`} className="absolute inset-0 z-20" aria-label={`View project: ${project.title}`}></Link>
    
    <img 
      src={urlForImage(project.coverImage).width(800).height(1000).url()} 
      alt={project.title} 
      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
    />
    
    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

    <div className="absolute inset-0 p-6 flex flex-col justify-between text-white z-10">
        <div>
            <span className="text-xs font-semibold bg-blue-600 text-white px-3 py-1 rounded-full">{project.category}</span>
        </div>
        <div className="flex justify-between items-end">
            <div className="w-3/4">
                <h3 className="text-2xl font-semibold">{project.title}</h3>
                <p className="mt-2 text-sm text-gray-200 line-clamp-2">
                    {project.excerpt}
                </p>
            </div>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg z-30 relative whitespace-nowrap">
                View
                <ArrowRight className="w-4 h-4" />
            </div>
        </div>
    </div>
  </motion.div>
);

// --- Main Projects Page Component (UPDATED) ---
export default function ProjectsPage() {
  const [allProjects, setAllProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [categories, setCategories] = useState<string[]>(['All']);
  const [activeCategory, setActiveCategory] = useState('All');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      setIsLoading(true);
      const query = `*[_type == "project"]{
        _id,
        title,
        "slug": slug.current,
        coverImage,
        category,
        excerpt
      } | order(_createdAt desc)`;
      const projects: Project[] = await client.fetch(query);
      
      setAllProjects(projects);
      setFilteredProjects(projects);
      
      const uniqueCategories = ['All', ...Array.from(new Set(projects.map(p => p.category)))];
      setCategories(uniqueCategories);
      setIsLoading(false);
    };
    fetchProjects();
  }, []);

  useEffect(() => {
    if (activeCategory === 'All') {
      setFilteredProjects(allProjects);
    } else {
      setFilteredProjects(allProjects.filter(p => p.category === activeCategory));
    }
  }, [activeCategory, allProjects]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-br from-gray-50 via-blue-50 to-pink-50 dark:from-gray-900 dark:via-blue-900/20 dark:to-black"
    >
      {/* Hero Section */}
      <section className="relative pt-40 pb-24 text-center bg-transparent overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 dark:bg-blue-500/10 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-pink-500/10 dark:bg-pink-500/10 rounded-full blur-3xl animate-pulse-slow animation-delay-4000"></div>
        <div className="relative z-10 max-w-4xl mx-auto px-4">
          <motion.h1 initial={{y: 20, opacity: 0}} animate={{y: 0, opacity: 1}} transition={{duration: 0.5}} className="text-5xl md:text-7xl font-extrabold text-gray-900 dark:text-white">
            Our Digital Craftsmanship
          </motion.h1>
          <motion.p initial={{y: 20, opacity: 0}} animate={{y: 0, opacity: 1}} transition={{duration: 0.5, delay: 0.1}} className="mt-6 text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            We merge innovation, design, and performance to create digital experiences that leave a lasting impact.
          </motion.p>
        </div>
      </section>

      {/* Filter & Projects Grid */}
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Filter Tabs */}
          <div className="flex justify-center flex-wrap gap-4 mb-16">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`relative px-5 py-2 text-sm font-semibold rounded-full transition-colors duration-300 focus:outline-none ${activeCategory !== category && 'hover:bg-gray-200 dark:hover:bg-gray-700'}`}
              >
                {activeCategory === category && (
                  <motion.div
                    layoutId="active-pill"
                    className="absolute inset-0 bg-blue-600 rounded-full"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <span className={`relative z-10 ${activeCategory === category ? 'text-white' : 'text-gray-700 dark:text-gray-300'}`}>
                  {category}
                </span>
              </button>
            ))}
          </div>

          {/* Projects Grid (UPDATED) */}
          <motion.div 
            layout // Keep this for the grid repositioning animation
            // Add a transition prop to make the grid rearrange faster
            transition={{ type: "spring", stiffness: 400, damping: 40 }} 
            variants={containerVariants} // Use the container variants
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            <AnimatePresence>
              {!isLoading && filteredProjects.map((project) => (
                <ProjectCard key={project._id} project={project} />
              ))}
            </AnimatePresence>
          </motion.div>
          {isLoading && <p className="text-center text-gray-500">Loading projects...</p>}
        </div>
      </section>
    </motion.div>
  );
}