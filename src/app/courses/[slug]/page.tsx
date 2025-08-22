// src/app/courses/[slug]/page.tsx
import React from 'react';
import { notFound } from 'next/navigation';
import { client } from '../../../../sanity/lib/client'; // Adjust path as needed
import CourseView from './CourseView';

// --- TypeScript Type Definitions ---
export type Instructor = {
  name: string;
  bio: string;
  avatarUrl: string;
  credentials: any[];
};

export type Module = {
  _key: string;
  title: string;
  lessons: { _key: string; title:string; type: string }[];
};

export type FaqItem = {
    _key: string;
    question: string;
    answer: string;
};

export type RelatedCourse = {
    _id: string;
    title: string;
    slug: string;
    coverImageUrl: string;
};

export type Course = {
  slug: string;
  title: string;
  tagline: string;
  category: string;
  coverImageUrl: string;
  price: number;
  duration: string;
  difficulty: string;
  lastUpdated: string;
  description: any[];
  outcomes: string[];
  prerequisites: string[];
  modules: Module[];
  faq: FaqItem[];
  instructor: Instructor;
  relatedCourses: RelatedCourse[];
  youtubeUrl?: string;
  rating: number;
  studentCount: number;
};

// --- Data Fetching Function ---
async function getCourse(slug: string): Promise<Course> {
  const query = `*[_type == "course" && slug.current == $slug][0] {
    "slug": slug.current,
    title,
    tagline,
    category,
    "coverImageUrl": coverImage.asset->url,
    price,
    duration,
    difficulty,
    lastUpdated,
    description,
    outcomes,
    prerequisites,
    modules,
    faq,
    youtubeUrl,
    rating,
    studentCount,
    instructor->{
      name,
      bio,
      "avatarUrl": avatar.asset->url,
      credentials
    },
    relatedCourses[]->{
        _id,
        title,
        "slug": slug.current,
        "coverImageUrl": coverImage.asset->url
    }
  }`;
  const course = await client.fetch(query, { slug });
  return course;
}

// --- Main Page Component (Server) ---
// ✅ FIX: Destructure slug directly from params in the function signature
export default async function CourseDetailPage({ params: { slug } }: { params: { slug: string } }) {
  // ✅ FIX: Use the destructured 'slug' variable directly
  const course = await getCourse(slug);

  if (!course) {
    notFound();
  }

  return <CourseView course={course} />;
}