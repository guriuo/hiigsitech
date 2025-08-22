// src/app/blog/[slug]/page.tsx
import React from 'react';

// Dummy blog data for demo purposes
const blogPosts: Record<string, { title: string; content: string }> = {
  "hello-world": {
    title: "Hello World",
    content: "This is your first blog post. Welcome!",
  },
  "nextjs-tips": {
    title: "Next.js Tips",
    content: "Here are some tips for working with Next.js App Router.",
  },
};

// Props from Next.js App Router
interface PageProps {
  params: { slug: string };
}

export default function BlogPostPage({ params }: PageProps) {
  const { slug } = params;
  const post = blogPosts[slug];

  if (!post) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold">Post not found</h1>
        <p>No blog post matches the slug: {slug}</p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
      <p className="text-lg">{post.content}</p>
    </div>
  );
}
