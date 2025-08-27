'use client'

import Link from 'next/link';

// Helper type for post data
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

// Reusable arrow icon
const IconArrowRight = ({ className = "" }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <line x1="5" y1="12" x2="19" y2="12"></line>
      <polyline points="12 5 19 12 12 19"></polyline>
  </svg>
);

export const BlogCard = ({ post }: { post: Post }) => {
    return (
        // ✅ UPDATED: Added dark mode classes for background and border
        <div className="relative group flex flex-col h-[450px] overflow-hidden rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
            
            {/* --- Gradient shadow --- */}
            <div className="absolute -bottom-4 left-4 right-4 h-1/4 rounded-full blur-xl opacity-0 z-[-1] group-hover:opacity-60 transition-opacity duration-500 bg-gradient-to-r from-pink-400 via-emerald-400 to-sky-400 animate-gradient-slow"></div>

            {/* ✅ UPDATED: Added dark mode class for background */}
            <div className="relative z-10 flex flex-col h-full bg-white dark:bg-slate-800 rounded-2xl">
                <Link href={`/blog/${post.slug}`} className="group/img relative h-2/5 w-full overflow-hidden rounded-t-2xl">
                    <img src={post.cover} alt={post.title} className="h-full w-full object-cover transition-transform duration-500 group-hover/img:scale-105" />
                    {/* ✅ UPDATED: Added dark mode classes for tag background and text */}
                    <span className="absolute left-4 top-4 inline-flex items-center rounded-full bg-white dark:bg-slate-700 px-3 py-1 text-sm font-semibold text-slate-800 dark:text-slate-200">
                        {post.tag}
                    </span>
                </Link>

                <div className="flex flex-col flex-grow p-6">
                    {/* ✅ UPDATED: Added dark mode class for title text */}
                    <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 line-clamp-2">
                        {/* ✅ UPDATED: Added dark mode class for hover text color */}
                        <Link href={`/blog/${post.slug}`} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                            {post.title}
                        </Link>
                    </h3>
                    
                    {/* ✅ UPDATED: Added dark mode class for excerpt text */}
                    <p className="mt-2 text-base text-slate-600 dark:text-slate-400 flex-grow line-clamp-4">
                        {post.excerpt}
                    </p>
                    
                    {/* ✅ UPDATED: Added dark mode class for border */}
                    <div className="mt-6 flex items-center gap-4 border-t border-slate-200 dark:border-slate-700 pt-5">
                        <img src={`https://i.pravatar.cc/40?u=${post.author}`} alt={post.author} className="w-10 h-10 rounded-full object-cover"/>
                        <div>
                            {/* ✅ UPDATED: Added dark mode class for author text */}
                            <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">{post.author}</p>
                            {/* ✅ UPDATED: Added dark mode class for date text */}
                            <p className="text-xs text-slate-500 dark:text-slate-400">{post.date}</p>
                        </div>
                        
                        {/* ✅ UPDATED: Added dark mode classes for link text */}
                        <Link href={`/blog/${post.slug}`} className="group ml-auto text-sm font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors flex items-center gap-1">
                            Read More
                            <IconArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};
