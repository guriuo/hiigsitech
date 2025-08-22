// app/courses/page.tsx
import React from 'react';
import { client } from "../../../sanity/lib/client"; // Adjust path if needed
import CoursesClientView from './CoursesClientView'; // Import the new client component

// --- Type Definitions ---
export type Instructor = {
  name: string;
  avatarUrl: string;
};

export type Course = {
  _id: string;
  title: string;
  slug: string;
  coverImageUrl: string;
  category: string;
  duration: string;
  price: number;
  bestseller: boolean;
  latest: boolean;
  instructor: Instructor;
  level?: 'Beginner' | 'Intermediate' | 'Advanced';
};

// --- Data Fetching ---
export default async function CoursesPage() {
  const query = `*[_type == "course"]{
    _id,
    title,
    "slug": slug.current,
    "coverImageUrl": coverImage.asset->url,
    category,
    duration,
    price,
    bestseller,
    latest,
    "level": difficulty, // Make sure your Sanity schema has a 'difficulty' field
    instructor->{
      name,
      "avatarUrl": avatar.asset->url
    }
  }`;

  const courses: Course[] = await client.fetch(query);

  return <CoursesClientView courses={courses} />;
}