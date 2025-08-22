'use client';

import React, { useState, useRef, MouseEvent } from 'react';
import { motion, useMotionValue, useTransform, Variants } from "framer-motion";
import Link from 'next/link';
import { Search, Mail, Flame, Star } from 'lucide-react';
import { BlogCard } from "./BlogCard";
import { client } from "../../../sanity/lib/client";
import { urlForImage } from "../../../sanity/lib/image";

// --- Type Definition ---
type Post = {
  _id: string;
  title: string;
  excerpt: string;
  cover: string;
  tag: string;
  author: string;
  date: string;
  slug: string;
};

// Processes raw Sanity data
const processPosts = (posts: any[]): Post[] => {
    return posts.map(post => {
        let coverImageUrl = 'https://placehold.co/800x500';
        if (post.coverImage?.asset) {
            coverImageUrl = urlForImage(post.coverImage).width(800).height(500).url();
        } else if (post.coverImageUrl) {
            coverImageUrl = post.coverImageUrl;
        }
        return {
            _id: post._id,
            title: post.title,
            slug: post.slug.current,
            cover: coverImageUrl,
            author: post.author?.name || 'Admin',
            tag: post.tags?.[0] || 'General',
            date: new Date(post.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
            excerpt: post.excerpt,
        };
    });
};

// --- Animation Variants ---
const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut", staggerChildren: 0.1 }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};


// --- Main Client Component ---
export default function BlogPageClient({ latestPosts: latestPostsRaw, popularPosts: popularPostsRaw, initialPosts: initialPostsRaw, totalPosts }: { latestPosts: any[]; popularPosts: any[]; initialPosts: any[]; totalPosts: number; }) {
  
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const latestPosts = processPosts(latestPostsRaw);
  const popularPosts = processPosts(popularPostsRaw);
  
  const [mainPosts, setMainPosts] = useState<Post[]>(processPosts(initialPostsRaw));

  // Logic for 3D hero animation
  const heroRef = useRef<HTMLElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const parallaxX1 = useTransform(mouseX, [0, 500], [-15, 15]);
  const parallaxY1 = useTransform(mouseY, [0, 500], [-15, 15]);
  const parallaxX2 = useTransform(mouseX, [0, 500], [25, -25]);
  const parallaxY2 = useTransform(mouseY, [0, 500], [25, -25]);

  const handleMouseMove = (event: MouseEvent<HTMLElement>) => {
    if (heroRef.current) {
      const rect = heroRef.current.getBoundingClientRect();
      mouseX.set(event.clientX - rect.left);
      mouseY.set(event.clientY - rect.top);
    }
  };

  // Load More function
  const loadMorePosts = async () => {
    setIsLoading(true);
    const offset = 9 + mainPosts.length;
    const query = `*[_type == "post"] | order(publishedAt desc)[${offset}...${offset + 6}]{
      _id, title, slug, coverImage, coverImageUrl, "author": author->{name}, tags, publishedAt, excerpt
    }`;
    const newPostsRaw = await client.fetch(query);
    const newPosts = processPosts(newPostsRaw);
    setMainPosts(prevPosts => [...prevPosts, ...newPosts]);
    setIsLoading(false);
  };

  const allPostsForSearch = [...latestPosts, ...popularPosts, ...mainPosts];
  const filteredPosts = searchTerm
    ? allPostsForSearch.filter(post => 
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (post.excerpt && post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    : [];

  // This hardcoded example assumes you fetched these posts separately
  // In a real app, you would pass these as props from page.tsx
  const featuredCategoryPosts = popularPosts.slice(0,3);

  return (
    <div className="min-h-screen w-full antialiased bg-white dark:bg-black text-gray-900 dark:text-white">
      
      {/* 1. Hero Section */}
      <motion.section 
        ref={heroRef}
        onMouseMove={handleMouseMove}
        className="relative pt-40 pb-24 text-center overflow-hidden"
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-white dark:bg-black"></div>
            <div className="animate-smoke-fast absolute top-0 -left-1/4 w-3/4 h-full bg-gradient-to-br from-purple-500/10 via-blue-500/10 to-transparent blur-3xl"></div>
            <div className="animate-smoke-slow absolute bottom-0 -right-1/4 w-3/4 h-full bg-gradient-to-tl from-pink-500/10 via-cyan-500/10 to-transparent blur-3xl"></div>
            <motion.div style={{ x: parallaxX1, y: parallaxY1 }} className="absolute top-1/4 left-1/4 w-48 h-48 bg-pink-500/10 rounded-full blur-3xl animate-float-1"></motion.div>
            <motion.div style={{ x: parallaxX2, y: parallaxY2 }} className="absolute bottom-1/4 right-1/3 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-float-2"></motion.div>
            <motion.div style={{ x: parallaxY1, y: parallaxX1 }} className="absolute bottom-1/2 right-1/2 w-56 h-56 bg-green-500/10 rounded-full blur-3xl animate-float-3"></motion.div>
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4">
            <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl font-extrabold text-gray-900 dark:text-white">
              Insights & Inspiration for Digital Growth
            </motion.h1>
            <motion.p variants={itemVariants} className="mt-6 text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Explore articles, trends, and tips from our experts to stay ahead in the digital world.
            </motion.p>
            <motion.div variants={itemVariants} className="mt-10 max-w-lg mx-auto">
                <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input type="text" placeholder="Search for articles..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
                        // ✅ UPDATED: Added blue border on focus for a "stroke" effect
                        className="w-full pl-12 pr-4 py-4 rounded-full bg-white/50 dark:bg-gray-800/50 border border-slate-200 dark:border-gray-700 shadow-sm backdrop-blur-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" />
                </div>
            </motion.div>
        </div>
      </motion.section>
      
      {searchTerm ? (
        <section className="py-20 px-4">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl font-bold text-center mb-12">Search Results for "{searchTerm}"</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredPosts.map((post) => ( <BlogCard key={post._id} post={post} /> ))}
                </div>
            </div>
        </section>
      ) : (
        <>
          <motion.section className="py-20 px-4" variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }}>
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">Latest Insights</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {latestPosts.map(post => (
                  <motion.div key={post._id} variants={itemVariants}> <BlogCard post={post} /> </motion.div>
                ))}
              </div>
            </div>
          </motion.section>

          <motion.section className="py-20 px-4 bg-gray-50 dark:bg-black/50" variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }}>
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12 flex items-center justify-center gap-2">
                <Flame className="text-amber-500" /> Popular Posts
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {popularPosts.map(post => (
                  <motion.div key={post._id} variants={itemVariants}>
                    <BlogCard post={post} />
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.section>

          {mainPosts.length > 0 && (
            <motion.section className="py-20 px-4" variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }}>
                <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl font-bold text-center mb-12">More Posts</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {mainPosts.map(post => (
                    <motion.div key={post._id} variants={itemVariants}> <BlogCard post={post} /> </motion.div>
                    ))}
                </div>

                {(latestPosts.length + popularPosts.length + mainPosts.length) < totalPosts && (
                    <div className="text-center mt-16">
                    <motion.button onClick={loadMorePosts} disabled={isLoading} className="bg-blue-600 text-white font-semibold py-3 px-8 rounded-full shadow-lg hover:bg-blue-700 disabled:bg-gray-400 transition-all transform hover:scale-105" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} >
                        {isLoading ? 'Loading...' : 'Load More'}
                    </motion.button>
                    </div>
                )}
                </div>
            </motion.section>
          )}

         

          {/* ✅ RESTORED: Newsletter CTA Section */}
          <motion.section className="py-20 px-4" variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
            <div className="max-w-2xl mx-auto text-center p-8 bg-gray-100 dark:bg-gray-800/50 rounded-2xl">
                <Mail className="w-10 h-10 mx-auto text-blue-500" />
                <h2 className="text-2xl font-bold mt-4">Get insights straight to your inbox</h2>
                <form className="mt-6 flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                    <input type="email" placeholder="Enter your email" className="w-full px-4 py-3 rounded-md bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 outline-none transition-shadow" />
                    <button type="submit" className="bg-blue-600 text-white font-semibold py-3 px-6 rounded-md shadow-lg hover:bg-blue-700 transition-colors">Subscribe</button>
                </form>
            </div>
          </motion.section>

          {/* ✅ RESTORED: Big Blue Marketing CTA Section */}
          <motion.section className="py-20 px-4 bg-blue-600 text-white" variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
            <div className="max-w-4xl mx-auto text-center">
              <motion.h2 variants={itemVariants} className="text-4xl font-extrabold">
                Ready to build the future together?
              </motion.h2>
              <motion.p variants={itemVariants} className="mt-4 max-w-2xl mx-auto text-lg text-blue-100">
                Your vision deserves a dedicated partner. Let's talk about how we can turn your idea into an unforgettable digital experience.
              </motion.p>
              <motion.div variants={itemVariants} className="mt-10">
                <Link href="/contact" className="bg-white text-blue-600 font-semibold py-3 px-8 rounded-full shadow-lg hover:bg-gray-100 transition-transform transform hover:scale-105 duration-300">
                  Contact Us
                </Link>
              </motion.div>
            </div>
          </motion.section>
        </>
      )}
    </div>
  );
}