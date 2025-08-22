// app/courses/[slug]/lessons/[lessonSlug]/page.tsx

import React from 'react';
import { notFound } from 'next/navigation';
// Adjust this import path if your folder structure is different
import { client } from '../../../../../../sanity/lib/client';
import LessonsView from '../LessonsView'; 
import { CourseForLessons } from '../page'; // Import types from the parent page

// This function fetches the entire course, which is needed by LessonsView
// to display the sidebar with all the lessons.
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

// This is the main server component that will render for each individual lesson URL.
export default async function LessonPage({ params }: { params: { slug: string; lessonSlug: string } }) {
  // We fetch the entire course using the course slug from the URL.
  const course = await getCourseForLessons(params.slug);

  if (!course) {
    notFound();
  }
  
  // We pass the entire course object to your existing LessonsView component.
  // LessonsView is smart enough to read the `lessonSlug` from the URL
  // and display the correct active lesson.
  return <LessonsView course={course} />;
}