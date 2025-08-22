import { client } from "../../../sanity/lib/client";
import BlogPageClient from "./BlogPageClient";

export default async function BlogPage() {
  // This single query fetches all the data needed for the page at once
  const query = `{
    "latestPosts": *[_type == "post"] | order(publishedAt desc)[0...9]{
      _id, title, slug, coverImage, coverImageUrl, "author": author->{name}, tags, publishedAt, excerpt
    },
    "popularPosts": *[_type == "post"] | order(views desc)[0...6]{
      _id, title, slug, coverImage, coverImageUrl, "author": author->{name}, tags, publishedAt, excerpt
    },
    "initialPosts": *[_type == "post"] | order(publishedAt desc)[9...15]{
      _id, title, slug, coverImage, coverImageUrl, "author": author->{name}, tags, publishedAt, excerpt
    },
    "total": count(*[_type == "post"])
  }`;
  
  const { latestPosts, popularPosts, initialPosts, total } = await client.fetch(query);

  return (
    <BlogPageClient 
      latestPosts={latestPosts}
      popularPosts={popularPosts}
      initialPosts={initialPosts}
      totalPosts={total}
    />
  );
}

// Revalidate the page every 60 seconds
export const revalidate = 60;