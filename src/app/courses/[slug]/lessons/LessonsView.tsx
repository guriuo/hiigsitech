'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { 
  PlayCircle, CheckCircle, ArrowLeft, ArrowRight, Download, 
  MessageSquare, Notebook, Menu, X, Link as LinkIcon 
} from 'lucide-react';
import { CourseForLessons, Module, Lesson, Resource } from './page';

// ✅ THIS IS THE FIX
// The missing helper function is now included.
const getCleanEmbedUrl = (url: string) => {
    if (!url) return null;
    // YouTube
    const youtubeRegExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const youtubeMatch = url.match(youtubeRegExp);
    if (youtubeMatch && youtubeMatch[2].length === 11) {
        return `https://www.youtube.com/embed/${youtubeMatch[2]}?autoplay=1&rel=0&controls=1&modestbranding=1`;
    }
    // Vimeo
    const vimeoMatch = /vimeo\.com\/(\d+)/.exec(url);
    if (vimeoMatch) {
        return `https://player.vimeo.com/video/${vimeoMatch[1]}?autoplay=1`;
    }
    return null;
};

export default function LessonsView({ course }: { course: CourseForLessons }) {
  const router = useRouter();
  const params = useParams();
  const lessonSlug = params.lessonSlug as string;

  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('resources');
  
  const [notes, setNotes] = useState('');
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);

  const allLessons = course.modules?.flatMap(module => module.lessons || []) || [];

  useEffect(() => {
    const progress = localStorage.getItem(`progress_${course.courseSlug}`);
    if (progress) {
      setCompletedLessons(JSON.parse(progress));
    }
  }, [course.courseSlug]);

  useEffect(() => {
    const lessonFromSlug = allLessons.find(l => l.slug && l.slug.current === lessonSlug);
    setActiveLesson(lessonFromSlug || allLessons[0] || null);
  }, [lessonSlug, allLessons]);

  useEffect(() => {
    if (activeLesson?._key) {
      const noteKey = `notes_${course.courseSlug}_${activeLesson._key}`;
      const savedNote = localStorage.getItem(noteKey);
      setNotes(savedNote || '');
    }
  }, [activeLesson, course.courseSlug]);

  const handleNoteChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNotes(e.target.value);
    if (activeLesson?._key) {
      const noteKey = `notes_${course.courseSlug}_${activeLesson._key}`;
      localStorage.setItem(noteKey, e.target.value);
    }
  };
  
  const activeLessonIndex = allLessons.findIndex(l => l._key === activeLesson?._key);
  
  const handleNextLesson = () => {
    const nextLesson = allLessons[activeLessonIndex + 1];
    if (nextLesson && nextLesson.slug?.current) {
      router.push(`/courses/${course.courseSlug}/lessons/${nextLesson.slug.current}`);
    }
  };

  const handlePrevLesson = () => {
    const prevLesson = allLessons[activeLessonIndex - 1];
    if (prevLesson && prevLesson.slug?.current) {
      router.push(`/courses/${course.courseSlug}/lessons/${prevLesson.slug.current}`);
    }
  };

  const handleMarkComplete = () => {
    if (!activeLesson?._key) return;

    if (!completedLessons.includes(activeLesson._key)) {
      const newCompleted = [...completedLessons, activeLesson._key];
      setCompletedLessons(newCompleted);
      localStorage.setItem(`progress_${course.courseSlug}`, JSON.stringify(newCompleted));
    }
    
    handleNextLesson();
  };

  const videoSrc = activeLesson?.videoType === 'url' 
      ? getCleanEmbedUrl(activeLesson.videoUrl || '')
      : activeLesson?.videoFile?.asset?.url;

  const isLessonCompleted = activeLesson?._key ? completedLessons.includes(activeLesson._key) : false;
  const progressPercentage = allLessons.length > 0 ? Math.round((completedLessons.length / allLessons.length) * 100) : 0;

  const TabButton = ({ tabName, label, icon: Icon }: { tabName: string, label: string, icon: React.ElementType }) => (
    <button
      onClick={() => setActiveTab(tabName)}
      className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-t-lg border-b-2 transition-colors ${
        activeTab === tabName
          ? 'border-blue-600 text-blue-600'
          : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
      }`}
    >
      <Icon className="w-5 h-5" />
      {label}
    </button>
  );

  const SidebarContent = () => (
    <>
        <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold">Course Content</h3>
            <button onClick={() => setSidebarOpen(false)} className="md:hidden p-1">
                <X size={24} />
            </button>
        </div>
        
        <div className="mb-6">
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${progressPercentage}%` }}></div>
            </div>
            <p className="text-xs text-gray-500 mt-1">{completedLessons.length} of {allLessons.length} lessons completed</p>
        </div>
        
        <div className="flex-1 space-y-4 overflow-y-auto pr-2">
            {course.modules?.map((module: Module) => (
                <div key={module._key}>
                    <h4 className="font-semibold mb-2 text-gray-800 dark:text-gray-200">{module.title}</h4>
                    <ul className="space-y-1">
                        {module.lessons?.map((lesson: Lesson) => {
                            const isCompleted = completedLessons.includes(lesson._key);
                            return (
                            <li key={lesson._key}>
                                <button
                                  onClick={() => lesson.slug?.current && router.push(`/courses/${course.courseSlug}/lessons/${lesson.slug.current}`)}
                                  className={`w-full text-left flex items-center gap-3 p-3 rounded-lg transition-colors ${
                                    activeLesson?._key === lesson._key
                                      ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300'
                                      : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                                  }`}
                                >
                                    <CheckCircle className={`w-5 h-5 flex-shrink-0 transition-colors ${isCompleted ? 'text-green-500' : 'text-gray-400'}`} />
                                    <span className="flex-1 text-sm">{lesson.title}</span>
                                </button>
                            </li>
                        )})}
                    </ul>
                </div>
            ))}
        </div>
    </>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black text-gray-900 dark:text-gray-100 flex">
      <aside className="w-80 lg:w-96 bg-white dark:bg-gray-900/50 border-r border-gray-200 dark:border-gray-800 p-6 hidden md:flex flex-col">
        <SidebarContent />
      </aside>

      <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
        <div className="w-full max-w-5xl mx-auto">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl sm:text-3xl font-bold mb-4">{course.title}</h1>
            <button onClick={() => setSidebarOpen(true)} className="md:hidden p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700">
                <Menu size={20} />
            </button>
          </div>
          
          <div className="aspect-video bg-black rounded-2xl mb-4 flex items-center justify-center shadow-lg overflow-hidden">
            {videoSrc ? (
                <iframe
                    key={activeLesson?._key}
                    src={videoSrc}
                    title={activeLesson?.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                ></iframe>
            ) : (
                <div className="text-center text-white">
                    <PlayCircle className="w-16 h-16 text-white/70 mx-auto" />
                    <p className="mt-2">No video for this lesson.</p>
                </div>
            )}
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
            <div>
              <h2 className="text-xl font-semibold">{activeLesson?.title || 'No Lesson Selected'}</h2>
              <p className="text-sm text-gray-500">{activeLesson?.description}</p>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={handlePrevLesson} disabled={activeLessonIndex === 0} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors disabled:opacity-50"><ArrowLeft className="w-5 h-5" /></button>
              
              <button onClick={handleMarkComplete} disabled={!activeLesson} className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50">
                  {isLessonCompleted ? 'Next Lesson' : 'Mark as Complete'}
              </button>

              <button onClick={handleNextLesson} disabled={activeLessonIndex === allLessons.length - 1} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors disabled:opacity-50"><ArrowRight className="w-5 h-5" /></button>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-900/50 rounded-2xl shadow-sm">
            <div className="border-b border-gray-200 dark:border-gray-800 px-4">
              <nav className="flex gap-4">
                <TabButton tabName="notes" label="Notes" icon={Notebook} />
                <TabButton tabName="q&a" label="Q&A" icon={MessageSquare} />
                <TabButton tabName="resources" label="Resources" icon={Download} />
              </nav>
            </div>
            <div className="p-6 min-h-[200px]">
              {activeTab === 'notes' && (
                <div>
                  <h3 className="font-bold text-lg mb-2">My Notes</h3>
                  <p className="text-sm text-gray-500 mb-4">Your notes are saved automatically to this browser.</p>
                  <textarea
                    value={notes}
                    onChange={handleNoteChange}
                    placeholder="Write down your thoughts, code snippets, or key takeaways for this lesson..."
                    className="w-full h-48 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  ></textarea>
                </div>
              )}
              {activeTab === 'q&a' && <div><h3 className="font-bold text-lg mb-2">Questions & Answers</h3><p>A discussion forum or Q&A section would go here.</p></div>}
              {activeTab === 'resources' && (
                <div>
                  <h3 className="font-bold text-lg mb-4">Downloads & Resources</h3>
                  {activeLesson?.resources && activeLesson.resources.length > 0 ? (
                      <ul className="space-y-3">
                          {activeLesson.resources.map((resource: Resource) => (
                              <li key={resource._key}>
                                  <a 
                                    href={resource.resourceType === 'file' ? resource.file?.asset?.url : resource.url} 
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    download={resource.resourceType === 'file' ? resource.file?.asset?.originalFilename : undefined}
                                    className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                                  >
                                      {resource.resourceType === 'file' ? <Download size={20} className="text-blue-500"/> : <LinkIcon size={20} className="text-blue-500"/>}
                                      <span className="flex-1 font-medium">{resource.title}</span>
                                      <ArrowRight size={16} className="text-gray-400"/>
                                  </a>
                              </li>
                          ))}
                      </ul>
                  ) : (
                      <p className="text-gray-500">No resources for this lesson.</p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {isSidebarOpen && (
          <div className="md-hidden fixed inset-0 z-50">
              <div className="absolute inset-0 bg-black/60" onClick={() => setSidebarOpen(false)}></div>
              <aside className="absolute top-0 left-0 h-full w-80 max-w-[90vw] bg-white dark:bg-gray-900 border-r dark:border-gray-800 p-6 flex flex-col">
                  <SidebarContent />
              </aside>
          </div>
      )}
    </div>
  );
}