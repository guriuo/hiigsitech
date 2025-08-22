// --- FILE: app/learn/[slug]/[lessonSlug]/page.tsx ---

import React from 'react';
import Link from 'next/link';
import { client } from '../../../../../sanity/lib/client'; // Adjust path
import { CheckCircle, ArrowLeft, ArrowRight } from 'lucide-react';

// --- Helper function to fetch course data ---
async function getCourseForLesson(slug: string) {
    // Query to get the course and all its lessons with slugs and video URLs
    const query = `*[_type == "course" && slug.current == $slug][0] {
        title,
        "courseSlug": slug.current,
        modules[]{
            _key,
            title,
            lessons[]{
                _key,
                title,
                "slug": slug.current,
                youtubeUrl // Ensure each lesson has a YouTube URL in your Sanity schema
            }
        }
    }`;
    const course = await client.fetch(query, { slug });
    return course;
}

// --- Helper function to create a clean YouTube embed URL ---
const getCleanYoutubeEmbedUrl = (url: string) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    const videoId = (match && match[2].length === 11) ? match[2] : null;
    if (videoId) {
        return `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&controls=1&modestbranding=1`;
    }
    return null;
};

// --- Main Lesson Page Component ---
export default async function LessonPage({ params }: { params: { slug: string, lessonSlug: string } }) {
    const course = await getCourseForLesson(params.slug);
    
    // Flatten all lessons from modules into a single array
    const allLessons = course.modules.flatMap((module: any) => module.lessons);
    
    // Find the current lesson based on the URL's lessonSlug
    const currentLessonIndex = allLessons.findIndex((lesson: any) => lesson.slug === params.lessonSlug);
    const currentLesson = allLessons[currentLessonIndex];

    // Determine the previous and next lessons for navigation
    const prevLesson = allLessons[currentLessonIndex - 1];
    const nextLesson = allLessons[currentLessonIndex + 1];

    const embedUrl = getCleanYoutubeEmbedUrl(currentLesson?.youtubeUrl);

    return (
        <div className="flex flex-col lg:flex-row h-screen bg-gray-100 dark:bg-black text-gray-900 dark:text-gray-100">
            
            {/* --- Main Content Area --- */}
            <main className="flex-1 flex flex-col">
                {/* 1. Header */}
                <header className="flex justify-between items-center p-4 border-b dark:border-gray-800 bg-white dark:bg-gray-900">
                    <h1 className="text-xl font-bold">{course.title}</h1>
                    <span className="text-sm text-gray-500">Lesson {currentLessonIndex + 1} of {allLessons.length}</span>
                </header>

                {/* 2. Video Player */}
                <div className="flex-1 bg-black flex items-center justify-center p-4">
                    <div className="w-full max-w-4xl aspect-video">
                        {embedUrl ? (
                            <iframe
                                src={embedUrl}
                                title={currentLesson.title}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                className="w-full h-full"
                            ></iframe>
                        ) : (
                            <div className="w-full h-full bg-gray-800 flex items-center justify-center text-white">
                                No video available for this lesson.
                            </div>
                        )}
                    </div>
                </div>

                {/* 4. Navigation Buttons */}
                <footer className="flex justify-between items-center p-4 border-t dark:border-gray-800 bg-white dark:bg-gray-900">
                    <div>
                        {prevLesson && (
                            <Link href={`/learn/${course.courseSlug}/${prevLesson.slug}`}>
                                <button className="flex items-center gap-2 px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600">
                                    <ArrowLeft size={16} />
                                    Previous
                                </button>
                            </Link>
                        )}
                    </div>
                    <div>
                        {nextLesson && (
                            <Link href={`/learn/${course.courseSlug}/${nextLesson.slug}`}>
                                <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                                    Next Lesson
                                    <ArrowRight size={16} />
                                </button>
                            </Link>
                        )}
                    </div>
                </footer>
            </main>

            {/* --- 3. Lesson List Sidebar --- */}
            <aside className="w-full lg:w-96 border-l dark:border-gray-800 p-4 overflow-y-auto bg-white dark:bg-gray-900 lg:order-last order-first">
                <h2 className="text-lg font-bold mb-4">Course Content</h2>
                <div className="space-y-4">
                    {course.modules.map((module: any) => (
                        <div key={module._key}>
                            <h3 className="font-semibold mb-2">{module.title}</h3>
                            <ul className="space-y-1">
                                {module.lessons.map((lesson: any) => (
                                    <li key={lesson._key}>
                                        <Link href={`/learn/${course.courseSlug}/${lesson.slug}`}>
                                            <div className={`p-3 rounded-lg flex items-center gap-3 transition-colors ${lesson.slug === params.lessonSlug ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300' : 'hover:bg-gray-100 dark:hover:bg-gray-800'}`}>
                                                <CheckCircle size={18} className="text-gray-400" /> {/* Add logic to turn green on completion */}
                                                <span>{lesson.title}</span>
                                            </div>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </aside>
        </div>
    );
}
