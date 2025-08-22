// src/app/courses/[slug]/lessons/page.tsx

import React from 'react';
import { notFound } from 'next/navigation';
// Make sure this path is correct for your project structure
import { client } from '../../../../../sanity/lib/client';
import LessonsView from './LessonsView';

// --- TypeScript Type Definitions for this page ---
export type Resource = {
  _key: string;
  title: string;
  resourceType: 'file' | 'link';
  file?: { asset?: { url: string; originalFilename: string; } };
  url?: string;
};

export type Lesson = {
  _key: string;
  title: string;
  slug: { current: string; };
  description?: string;
  videoType?: 'url' | 'file';
  videoUrl?: string;
  videoFile?: { asset?: { url:string; } };
  resources?: Resource[];
};

export type Module = {
  _key: string;
  title: string;
  lessons: Lesson[];
};

export type CourseForLessons = {
  title: string;
  courseSlug: string;
  modules: Module[];
};

// --- Data Fetching Function ---
async function getCourseForLessons(slug: string): Promise<CourseForLessons> {
  const query = `*[_type == "course" && slug.current == $slug][0] {
    title,
    "courseSlug": slug.current,
    modules[] {
      _key,
      title,
      lessons[] {
        _key,
        title,
        slug,
        description,
        videoType,
        videoUrl,
        videoFile { asset->{ url } },
        resources[] {
          _key,
          title,
          resourceType,
          file { asset->{ url, originalFilename } },
          url
        }
      }
    }
  }`;
  const course = await client.fetch(query, { slug });
  return course;
}

// --- Main Page Component (Server) ---
// ✅ FIX: Destructure slug directly from params in the function signature
export default async function CourseLessonsPage({ params: { slug } }: { params: { slug: string } }) {
  // ✅ FIX: Use the destructured 'slug' variable directly
  const course = await getCourseForLessons(slug);

  if (!course) {
    notFound();
  }

  return <LessonsView course={course} />;
}