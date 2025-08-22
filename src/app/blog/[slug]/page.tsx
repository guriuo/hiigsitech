import Image from 'next/image';
import Link from 'next/link';
import { Inter, Poppins } from 'next/font/google';
import { PortableText, PortableTextComponents } from '@portabletext/react';
import { notFound } from 'next/navigation';
import { client } from '../../../../sanity/lib/client';
import { urlForImage } from '../../../../sanity/lib/image';
import CommentSection from '../../components/CommentSection';
import PostViewTracker from './PostViewTracker';

// --- FONTS ---
const poppins = Poppins({
  weight: ['400', '600', '700', '800'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
});
const inter = Inter({
  weight: ['400', '500', '600'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

// --- DATA FETCHING ---
async function getPost(slug: string) {
  const query = `*[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    "coverImage": coverImage,
    "author": author->{name, image, bio},
    publishedAt,
    body,
    excerpt,
    "comments": *[_type == "comment" && post._ref == ^._id && !defined(parent)] | order(createdAt asc) {
      _id,
      name,
      comment,
      createdAt,
      isAdmin,
      "replies": *[_type == "comment" && parent._ref == ^._id] | order(createdAt asc) {
        _id, name, comment, createdAt, isAdmin
      }
    }
  }`;
  const post = await client.fetch(query, { slug });
  return post;
}

// --- CUSTOM COMPONENTS & ICONS (Keep your existing code for these) ---
const ptComponents: PortableTextComponents = { /* ... your components here ... */ };
const IconArrowLeft = () => ( <svg>...</svg> );
// ... etc.

// ✅ UPDATE: Added a specific type for the page props
type BlogPostPageProps = {
  params: {
    slug: string;
  };
};

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = await getPost(params.slug);
  if (!post) notFound();

  const coverImageUrl = post.coverImage?.asset
    ? urlForImage(post.coverImage).width(1200).height(675).url()
    : 'https://placehold.co/1200x675';
  
  const authorImage = post.author?.image?.asset
    ? urlForImage(post.author.image).width(80).height(80).url()
    : 'https://i.pravatar.cc/80';

  return (
    <div className={`${inter.variable} ${poppins.variable} antialiased`}>
      <PostViewTracker postId={post._id} />
      <main className="font-inter bg-white dark:bg-gray-900 py-12 md:py-20">
        <div className="max-w-3xl mx-auto px-4">
          <Link href="/blog" className="group mb-8 inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors">
            Back to Blog
          </Link>
          <article>
            <header className="mb-10">
              <h1 className="font-poppins text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white leading-tight mb-4 text-left">
                {post.title}
              </h1>
              {/* ... rest of your header ... */}
            </header>
            <div className="mb-12">
              <Image 
                src={coverImageUrl}
                alt={post.title} 
                width={1200} 
                height={675} 
                className="rounded-2xl shadow-xl w-full" 
                priority
              />
            </div>
            <div className="prose prose-lg lg:prose-xl max-w-none dark:prose-invert">
              <PortableText value={post.body} components={ptComponents} />
            </div>
            <hr className="my-12 border-gray-200 dark:border-gray-700" />
            <div className="flex items-center gap-6 p-6 bg-gray-50 dark:bg-gray-800 rounded-2xl">
                {/* ... author box ... */}
            </div>
          </article>
          <CommentSection initialComments={post.comments || []} postId={post._id} />
        </div>
      </main>
    </div>
  );
}