'use client';

import type { Course } from './page';
import React, { useState, useMemo, useEffect, useRef } from 'react';
import { motion, Variants, AnimatePresence, useInView, animate } from "framer-motion";
import { ArrowRight, Clock, Star, BookCopy, Users, Video, GraduationCap, Mail, Code, PenTool, Target, Database } from "lucide-react";
import Link from 'next/link';

// --- Animation Variants & Reusable Components (No Changes Here) ---
const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut", staggerChildren: 0.15 }
  }
};
const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};
const AnimatedCounter = ({ to }: { to: number }) => {
    const ref = useRef<HTMLSpanElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });

    useEffect(() => {
        if (isInView && ref.current) {
            const controls = animate(0, to, {
                duration: 2.5,
                ease: "easeOut",
                onUpdate(value) {
                    if (ref.current) {
                        ref.current.textContent = Math.round(value).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                    }
                }
            });
            return () => controls.stop();
        }
    }, [isInView, to]);

    return <span ref={ref}>0</span>;
};


// --- UPDATED CourseCard Component ---
const CourseCard = ({ course }: { course: Course }) => (
    // ✅ WRAPPED the entire card in a Link component pointing to the correct slug
    <Link href={`/courses/${course.slug}`} className="block h-full">
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.4, ease: 'backOut' }}
            className="group relative rounded-2xl overflow-hidden bg-white dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 flex flex-col h-full cursor-pointer"
        >
            <div className="relative h-56">
                <img src={course.coverImageUrl} alt={course.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                {course.bestseller && <span className="absolute top-4 left-4 text-xs font-semibold bg-amber-400 text-black px-3 py-1 rounded-full flex items-center gap-1"><Star size={12} fill="currentColor"/> Bestseller</span>}
                {course.latest && !course.bestseller && <span className="absolute top-4 left-4 text-xs font-semibold bg-green-500 text-white px-3 py-1 rounded-full">New</span>}
                <span className="absolute bottom-4 right-4 text-xs font-semibold bg-black/50 text-white px-3 py-1.5 rounded-full backdrop-blur-sm flex items-center gap-2"><Clock size={14} /> {course.duration}</span>
            </div>
            <div className="p-6 flex flex-col flex-grow">
                <div className="flex justify-between items-center">
                    <span className="text-sm font-semibold text-blue-500">{course.category}</span>
                    <span className={`text-lg font-bold ${course.price === 0 ? 'text-green-500' : 'text-gray-900 dark:text-white'}`}>
                        {course.price === 0 ? 'Free' : `$${course.price}`}
                    </span>
                </div>
                <h3 className="mt-2 text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-500 transition-colors">{course.title}</h3>
                <div className="mt-auto pt-4 border-t border-gray-200 dark:border-gray-700 flex items-center gap-3">
                    <img src={course.instructor.avatarUrl} alt={course.instructor.name} className="w-8 h-8 rounded-full" />
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400">{course.instructor.name}</span>
                </div>
            </div>
            <div className="p-6 pt-0">
                 <div className="connect-button w-full text-center inline-block">
                     View Course
                 </div>
            </div>
        </motion.div>
    </Link>
);


// --- Main Courses Page Component (Client) ---
export default function CoursesView({ courses }: { courses: Course[] }) {
    const allCourses = courses;
    const categories = ['All', ...Array.from(new Set(allCourses.map(c => c.category)))];
    const [activeCategory, setActiveCategory] = useState('All');
    const [activeSort, setActiveSort] = useState('All');

    const filteredAndSortedCourses = useMemo(() => {
        let filtered = activeCategory === 'All' 
            ? allCourses 
            : allCourses.filter(c => c.category === activeCategory);
            
        if (activeSort === 'Latest') filtered = filtered.filter(c => c.latest);
        else if (activeSort === 'Best Selling') filtered = filtered.filter(c => c.bestseller);
        
        return filtered;
    }, [activeCategory, activeSort, allCourses]);

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="bg-white dark:bg-black">
            {/* All other sections remain the same */}
            
            {/* Courses Grid & Filters */}
            <section className="py-24 px-4 bg-gray-50 dark:bg-black/50">
                <div className="max-w-7xl mx-auto">
                    {/* Filters UI (No changes needed here) */}
                    <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <AnimatePresence>
                            {(filteredAndSortedCourses || []).map((course) => (
                                <CourseCard key={course._id} course={course} />
                            ))}
                        </AnimatePresence>
                    </motion.div>
                </div>
            </section>
            
            {/* Contact Us Section (No changes needed) */}
        </motion.div>
    );
}
