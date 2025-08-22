import Image from 'next/image';
import Link from 'next/link';
import { Inter, Poppins } from 'next/font/google';
import { PortableText, PortableTextComponents } from '@portabletext/react';
import { notFound } from 'next/navigation';

// --- SANITY & ASSETS ---
import { client } from '../../../../sanity/lib/client';
import { urlForImage } from '../../../../sanity/lib/image';
import { getFileAsset } from '@sanity/asset-utils';
import PostViewTracker from './PostViewTracker';
// ✅ Import the CommentSection component
import CommentSection from '../../components/CommentSection';

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

// --- TYPES ---
interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

// --- DATA FETCHING ---
async function getPost(slug: string) {
  const query = `*[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    "coverImage": coverImage,
    "coverImageUrl": coverImageUrl,
    "tag": tags[0],
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
        _id,
        name,
        comment,
        createdAt,
        isAdmin
      }
    }
  }`;
  const post = await client.fetch(query, { slug });
  return post;
}

// --- PORTABLE TEXT COMPONENTS ---
const ptComponents: PortableTextComponents = {
  types: {
    inlineImage: ({ value }) => {
      if (!value?.asset?._ref) return null;
      return (
        <figure className="my-10">
          <Image
            src={urlForImage(value).width(1200).height(600).url()}
            alt={value.alt || 'Blog post image'}
            width={1200}
            height={600}
            className="rounded-lg"
          />
          {value.alt && <figcaption className="text-center text-sm text-gray-500 mt-2">{value.alt}</figcaption>}
        </figure>
      );
    },
    pdfFile: ({ value }) => {
      if (!value?.file?.asset?._ref) return null;
      const asset = getFileAsset(value.file, {
        projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
        dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
      });
      return (
        <div className="my-8 flex items-center gap-4 rounded-lg border bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800">
          <IconFile className="h-8 w-8 flex-shrink-0 text-gray-400" />
          <a
            href={asset.url}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-blue-600 hover:underline dark:text-blue-400"
          >
            {value.description || 'Download PDF'}
          </a>
        </div>
      );
    },
    pdfLink: ({ value }) => {
      if (!value?.url) return null;
      return (
        <div className="my-8 flex items-center gap-4 rounded-lg border bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800">
          <IconLinkExternal className="h-8 w-8 flex-shrink-0 text-gray-400" />
          <a
            href={value.url}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-blue-600 hover:underline dark:text-blue-400"
          >
            {value.description || 'View External PDF'}
          </a>
        </div>
      );
    },
  },
  block: {
    h2: ({ children }) => <h2 className="text-3xl font-bold mt-12 mb-4">{children}</h2>,
    h3: ({ children }) => <h3 className="text-2xl font-bold mt-8 mb-4">{children}</h3>,
    blockquote: ({ children }) => <blockquote className="border-l-4 border-blue-500 pl-4 italic my-8">{children}</blockquote>,
  },
};

// --- SVG ICONS ---
const IconArrowLeft = ({ className = 'w-5 h-5' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
  </svg>
);
const IconCalendar = ({ className = 'w-5 h-5' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
    <line x1="16" y1="2" x2="16" y2="6"></line>
    <line x1="8" y1="2" x2="8" y2="6"></line>
    <line x1="3" y1="10" x2="21" y2="10"></line>
  </svg>
);
const IconFile = ({ className = 'w-6 h-6' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
  </svg>
);
const IconLinkExternal = ({ className = 'w-6 h-6' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
  </svg>
);

// --- MAIN COMPONENT ---
export default async function BlogPostPage({ params }: BlogPostPageProps): Promise<JSX.Element> {
  const post = await getPost(params.slug);
  if (!post) notFound();

  let coverImageUrl = 'https://placehold.co/1200x675';
  if (post.coverImage?.asset) {
    coverImageUrl = urlForImage(post.coverImage).width(1200).height(675).url();
  } else if (post.coverImageUrl) {
    coverImageUrl = post.coverImageUrl;
  }

  const authorImage = post.author?.image?.asset
    ? urlForImage(post.author.image).width(80).height(80).url()
    : 'https://i.pravatar.cc/80';

  return (
    <div className={`${inter.variable} ${poppins.variable} antialiased`}>
      <PostViewTracker postId={post._id} />

      <main className="font-inter bg-white dark:bg-gray-900 py-12 md:py-20">
        <div className="relative max-w-6xl mx-auto px-4">
          {/* Share icons */}
          <div className="absolute top-24 -left-32 hidden xl:flex flex-col gap-3">
            <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 -rotate-90 origin-bottom-right">Share</p>
            <div className="h-12 w-[1px] bg-gray-300 dark:bg-gray-700 mx-auto"></div>
          </div>

          <div className="max-w-3xl mx-auto">
            <Link
              href="/blog"
              className="group mb-8 inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
            >
              <IconArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              Back to Blog
            </Link>

            <article>
              <header className="mb-10">
                {post.tag && (
                  <div className="mb-4">
                    <span className="inline-block bg-blue-100 text-blue-800 text-sm font-semibold px-3 py-1 rounded-full dark:bg-blue-900 dark:text-blue-200">
                      {post.tag}
                    </span>
                  </div>
                )}
                <h1 className="font-poppins text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white leading-tight mb-4 text-left">
                  {post.title}
                </h1>
                <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-gray-500 dark:text-gray-400 mt-6">
                  <div className="flex items-center gap-2">
                    <Image src={authorImage} alt={post.author?.name || 'Admin'} width={24} height={24} className="rounded-full" />
                    <span className="font-semibold text-gray-700 dark:text-gray-300">{post.author?.name || 'Admin'}</span>
                  </div>
                  <span className="text-gray-300 dark:text-gray-600 hidden sm:inline-block">|</span>
                  <div className="flex items-center gap-2">
                    <IconCalendar className="w-4 h-4" />
                    <span>{new Date(post.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                  </div>
                </div>
              </header>

              <div className="mb-12">
                <Image src={coverImageUrl} alt={post.title} width={1200} height={675} className="rounded-2xl shadow-xl w-full" priority />
              </div>

              <div className="prose prose-lg lg:prose-xl max-w-none dark:prose-invert prose-headings:font-poppins prose-headings:font-bold prose-a:text-blue-600 hover:prose-a:text-blue-500">
                <PortableText value={post.body} components={ptComponents} />
              </div>

              <hr className="my-12 border-gray-200 dark:border-gray-700" />

              <div className="flex items-center gap-6 p-6 bg-gray-50 dark:bg-gray-800 rounded-2xl">
                <Image src={authorImage} alt={post.author?.name || 'Admin'} width={64} height={64} className="rounded-full" />
                <div>
                  <p className="text-xs font-semibold text-gray-500 dark:text-gray-400">WRITTEN BY</p>
                  <h4 className="font-poppins text-xl font-bold text-gray-900 dark:text-white">{post.author?.name || 'Admin'}</h4>
                  <p className="mt-1 text-gray-600 dark:text-gray-300">{post.author?.bio || post.excerpt}</p>
                </div>
              </div>
            </article>

            <CommentSection initialComments={post.comments || []} postId={post._id} />
          </div>
        </div>
      </main>
    </div>
  );
}
