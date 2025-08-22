// app/courses/[slug]/CourseView.tsx
'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation'; // ✅ 1. Import useRouter
import { PortableText } from '@portabletext/react';
import { motion } from 'framer-motion';
import { CheckCircle2, Star, Users, Clock, BookOpen, Award, ListChecks, Video, HelpCircle, FileText, PlayCircle, ArrowRight } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

// --- UPDATE YOUR COURSE TYPE ---
// This interface should match the data you fetch from Sanity
export interface Course {
  slug: string; // ✅ 2. Add slug to the interface
  title: string;
  tagline: string;
  description: any[];
  modules: { _key: string; title: string; lessons: { _key: string; title: string; type: string; }[]; }[];
  outcomes: string[];
  faq: { _key: string; question: string; answer: string; }[];
  rating: number;
  studentCount: number;
  duration: string;
  prerequisites: string[];
  coverImageUrl: string;
  youtubeUrl?: string; // YouTube URL for the preview
  instructor: { name: string; bio: string; avatarUrl: string; };
}

// --- YouTube Player Component ---
const YouTubePlayer = ({ youtubeUrl, courseTitle }: { youtubeUrl: string, courseTitle: string }) => {
    const [isPlaying, setIsPlaying] = useState(false);

    const getYouTubeId = (url: string) => {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url.match(regExp);
        return (match && match[2].length === 11) ? match[2] : null;
    };

    const videoId = getYouTubeId(youtubeUrl);

    if (!videoId) {
        return (
            <div className="aspect-video w-full rounded-xl bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
                <p className="text-red-500">Invalid YouTube URL.</p>
            </div>
        );
    }

    const videoSrc = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&controls=0&modestbranding=1`;

    return (
        <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-black group">
            {!isPlaying ? (
                <>
                    <Image
                        src={`https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`}
                        alt={`Thumbnail for ${courseTitle}`}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        onError={(e) => e.currentTarget.style.display = 'none'}
                    />
                    <div 
                        className="absolute inset-0 flex items-center justify-center cursor-pointer z-10"
                        onClick={() => setIsPlaying(true)}
                    >
                        <div className="absolute inset-0 bg-black/40 transition-opacity group-hover:bg-black/20" />
                        <PlayCircle className="w-16 h-16 text-white/80 drop-shadow-lg transition-transform transform group-hover:scale-110" />
                    </div>
                </>
            ) : (
                <iframe
                    src={videoSrc}
                    title="Course Preview"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                ></iframe>
            )}
        </div>
    );
};


// --- Main View Component ---
export default function CourseView({ course }: { course: Course }) {
    const router = useRouter(); // ✅ 3. Get the router instance
    const [isDescExpanded, setIsDescExpanded] = useState(false);

    const totalLessons = (course.modules || []).reduce((acc, module) => acc + (module.lessons?.length || 0), 0);
    
    const descriptionText = (course.description || [])
        .map(block => block.children.map((child: { text: string }) => child.text).join(''))
        .join(' ');
    
    const isLongDescription = descriptionText.split(' ').length > 50;
    
    const shortDescription = isLongDescription 
        ? descriptionText.split(' ').slice(0, 50).join(' ') + '...' 
        : descriptionText;
    
    // ✅ 4. Update the enroll function to navigate
    const enroll = () => {
        router.push(`/courses/${course.slug}/lessons`);
    };

    return (
        <div className="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-gray-100">
            {/* Top Hero Section */}
            <section className="relative w-full bg-blue-900">
                <div className="absolute inset-0">
                    <Image
                        src={course.coverImageUrl}
                        alt={course.title}
                        fill
                        className="object-cover opacity-70"
                        priority
                    />
                    <div className="absolute inset-0 bg-blue-900/80" />
                </div>
                <div className="relative max-w-7xl mx-auto px-6 py-20 flex flex-col items-start gap-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="flex-1"
                    >
                        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight text-white">
                            {course.title}
                        </h1>
                        <p className="mt-2 text-lg md:text-xl text-blue-100 max-w-3xl">
                            {course.tagline}
                        </p>
                        <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3 text-sm text-blue-100">
                            <div className="flex items-center gap-2"><Star className="w-5 h-5 text-yellow-400" /> {course.rating} rating</div>
                            <div className="flex items-center gap-2"><Users className="w-5 h-5" /> {course.studentCount?.toLocaleString()} students</div>
                            <div className="flex items-center gap-2"><Clock className="w-5 h-5" /> {course.duration}</div>
                            <div className="flex items-center gap-2"><BookOpen className="w-5 h-5" /> {totalLessons} lessons</div>
                            <div className="flex items-center gap-2"><Award className="w-5 h-5" /> Certificate</div>
                        </div>
                        <div className="mt-6 flex items-center gap-3">
                            <Avatar className="w-10 h-10">
                                <AvatarImage src={course.instructor.avatarUrl} alt={course.instructor.name} />
                                <AvatarFallback>{course.instructor.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                                <p className="font-semibold text-white">{course.instructor.name}</p>
                                <p className="text-sm text-blue-200">{course.instructor.bio}</p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-6 py-16 grid lg:grid-cols-3 gap-10">
                {/* Left Content Column */}
                <div className="lg:col-span-2 space-y-10 order-2 lg:order-1">
                    <Card className="bg-white dark:bg-gray-900/50 border-gray-200 dark:border-gray-800 rounded-2xl">
                        <CardHeader><CardTitle className="text-2xl font-bold">What you'll learn</CardTitle></CardHeader>
                        <CardContent className="grid md:grid-cols-2 gap-x-8 gap-y-4">
                            {(course.outcomes || []).map((outcome, i) => (
                                <div key={i} className="flex items-start gap-3">
                                    <CheckCircle2 className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                                    <p>{outcome}</p>
                                </div>
                            ))}
                        </CardContent>
                    </Card>

                    <Card className="bg-white dark:bg-gray-900/50 border-gray-200 dark:border-gray-800 rounded-2xl">
                        <CardHeader><CardTitle className="text-2xl font-bold">Curriculum</CardTitle></CardHeader>
                        <CardContent>
                            <Accordion type="single" collapsible defaultValue={course.modules?.[0]?._key} className="w-full space-y-3">
                                {(course.modules || []).map((module, idx) => (
                                    <AccordionItem key={module._key} value={module._key} className="bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800">
                                        <AccordionTrigger className="p-4 text-left font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-4 hover:no-underline">
                                           <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold flex-shrink-0">{idx + 1}</div>
                                            <span>{module.title}</span>
                                        </AccordionTrigger>
                                        <AccordionContent className="pb-4 pr-4 pl-12">
                                            <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                                                {(module.lessons || []).map((lesson, i) => (
                                                    <li key={i} className="flex justify-between items-center">
                                                        <span className="flex items-center gap-3">
                                                            {lesson.type === 'Video' && <Video className="w-4 h-4 text-blue-500" />}
                                                            {lesson.type === 'Quiz' && <HelpCircle className="w-4 h-4 text-purple-500" />}
                                                            {lesson.type === 'Assignment' && <FileText className="w-4 h-4 text-orange-500" />}
                                                            {lesson.type === 'Project' && <BookOpen className="w-4 h-4 text-emerald-500" />}
                                                            {lesson.title}
                                                        </span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </AccordionContent>
                                    </AccordionItem>
                                ))}
                            </Accordion>
                        </CardContent>
                    </Card>

                    <Card className="bg-white dark:bg-gray-900/50 border-gray-200 dark:border-gray-800 rounded-2xl">
                        <CardHeader><CardTitle className="text-2xl font-bold">Requirements</CardTitle></CardHeader>
                        <CardContent className="space-y-3">
                            {(course.prerequisites || []).map((req, i) => (
                                <div key={i} className="flex items-center gap-3">
                                    <ListChecks className="w-5 h-5 text-blue-600" />
                                    <p>{req}</p>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                    
                    <Card className="bg-white dark:bg-gray-900/50 border-gray-200 dark:border-gray-800 rounded-2xl">
                        <CardHeader><CardTitle className="text-2xl font-bold">Course Description</CardTitle></CardHeader>
                        <CardContent>
                            <div className="prose dark:prose-invert max-w-none text-gray-700 dark:text-gray-300">
                               {isDescExpanded || !isLongDescription ? (course.description && <PortableText value={course.description} />) : (<p>{shortDescription}</p>)}
                            </div>
                            {isLongDescription && (
                                <Button variant="link" className="px-0 text-blue-600" onClick={() => setIsDescExpanded(!isDescExpanded)}>
                                    {isDescExpanded ? "Read Less" : "Read More"}
                                </Button>
                            )}
                        </CardContent>
                    </Card>

                    <Card className="bg-white dark:bg-gray-900/50 border-gray-200 dark:border-gray-800 rounded-2xl">
                        <CardHeader><CardTitle className="text-2xl font-bold">Frequently Asked Questions</CardTitle></CardHeader>
                        <CardContent>
                            <Accordion type="single" collapsible className="w-full space-y-3">
                                {(course.faq || []).map((faqItem) => (
                                    <AccordionItem key={faqItem._key} value={faqItem._key} className="bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800">
                                        <AccordionTrigger className="p-4 text-left font-semibold text-gray-800 dark:text-gray-200 hover:no-underline">{faqItem.question}</AccordionTrigger>
                                        <AccordionContent className="pb-4 px-4 text-gray-700 dark:text-gray-300">{faqItem.answer}</AccordionContent>
                                    </AccordionItem>
                                ))}
                            </Accordion>
                        </CardContent>
                    </Card>
                </div>

                {/* Right Sticky Sidebar */}
                <div className="space-y-6 order-1 lg:order-2">
                    <div className="sticky top-24">
                        {course.youtubeUrl ? (
                            <YouTubePlayer youtubeUrl={course.youtubeUrl} courseTitle={course.title} />
                        ) : (
                            <div className="bg-gray-100 dark:bg-gray-900 rounded-xl overflow-hidden aspect-video flex items-center justify-center">
                                <p className="text-gray-500">No Preview Available</p>
                            </div>
                        )}
                        <Button
                            size="lg"
                            className="mt-4 w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500 text-white font-bold text-lg h-14"
                            onClick={enroll}
                        >
                            Enroll Now <ArrowRight className="ml-2 w-5 h-5" />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
