// src/app/blog/[slug]/page.tsx

import Image from 'next/image';
import { client } from '@/sanity/lib/client';
import { urlForImage } from '@/sanity/lib/image';
import { PortableText } from '@portabletext/react';

// The GROQ query to fetch the specific post data
const POST_QUERY = `*[_type == "post" && slug.current == $slug][0]{
  _id,
  title,
  coverImage,
  category,
  publishedAt,
  body
}`;

// Define the type for the post data for better type safety
type Post = {
  _id: string;
  title: string;
  coverImage: any; // You can define a more specific type for your image asset
  category: string;
  publishedAt: string;
  body: any[]; // Portable Text content is an array of blocks
};

// The page component is an async function to fetch data
export default async function SinglePostPage({ params }: { params: { slug: string } }) {
  const post: Post = await client.fetch(POST_QUERY, { slug: params.slug });

  // Handle case where no post is found
  if (!post) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Post not found
      </div>
    );
  }

  const coverImageUrl = urlForImage(post.coverImage).width(1200).url();
  const postDate = new Date(post.publishedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <main className="min-h-screen bg-gray-50">
      <article className="max-w-4xl mx-auto px-4 py-16 lg:py-24">
        {/* Post Header */}
        <div className="text-center mb-12">
          <p className="text-lg font-semibold text-blue-600 mb-2">{post.category}</p>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900">
            {post.title}
          </h1>
          <p className="mt-4 text-gray-500">{postDate}</p>
        </div>

        {/* Cover Image */}
        {coverImageUrl && (
          <div className="mb-12 rounded-lg overflow-hidden shadow-lg">
            <Image
              src={coverImageUrl}
              alt={`Cover image for ${post.title}`}
              width={1200}
              height={675} // Assuming a 16:9 aspect ratio
              className="w-full h-auto object-cover"
              priority // Load the main image faster
            />
          </div>
        )}

        {/* Post Body Content */}
        <div className="prose prose-lg prose-indigo max-w-none mx-auto">
          <PortableText value={post.body} />
        </div>
      </article>
    </main>
  );
}