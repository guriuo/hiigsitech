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
        <div className="relative group flex flex-col h-[450px] overflow-hidden rounded-2xl bg-white border border-slate-200 shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
            
            {/* --- UPDATED: New gradient colors for the shadow --- */}
            <div className="absolute -bottom-4 left-4 right-4 h-1/4 rounded-full blur-xl opacity-0 z-[-1] group-hover:opacity-60 transition-opacity duration-500 bg-gradient-to-r from-pink-400 via-emerald-400 to-sky-400 animate-gradient-slow"></div>

            <div className="relative z-10 flex flex-col h-full bg-white rounded-2xl">
                <Link href={`/blog/${post.slug}`} className="group/img relative h-2/5 w-full overflow-hidden rounded-t-2xl">
                    <img src={post.cover} alt={post.title} className="h-full w-full object-cover transition-transform duration-500 group-hover/img:scale-105" />
                    <span className="absolute left-4 top-4 inline-flex items-center rounded-full bg-white px-3 py-1 text-sm font-semibold text-slate-800">
                        {post.tag}
                    </span>
                </Link>

                <div className="flex flex-col flex-grow p-6">
                    <h3 className="text-lg font-bold text-slate-800 line-clamp-2">
                        <Link href={`/blog/${post.slug}`} className="hover:text-blue-600 transition-colors">
                            {post.title}
                        </Link>
                    </h3>
                    
                    <p className="mt-2 text-base text-slate-600 flex-grow line-clamp-4">
                        {post.excerpt}
                    </p>
                    
                    <div className="mt-6 flex items-center gap-4 border-t border-slate-200 pt-5">
                        <img src={`https://i.pravatar.cc/40?u=${post.author}`} alt={post.author} className="w-10 h-10 rounded-full object-cover"/>
                        <div>
                            <p className="text-sm font-semibold text-slate-800">{post.author}</p>
                            <p className="text-xs text-slate-500">{post.date}</p>
                        </div>
                        
                        <Link href={`/blog/${post.slug}`} className="group ml-auto text-sm font-semibold text-blue-600 hover:text-blue-800 transition-colors flex items-center gap-1">
                            Read More
                            <IconArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};