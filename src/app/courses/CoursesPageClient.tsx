// app/courses/CoursesPageClient.tsx
'use client';

// ... all your imports (React, motion, lucide-react, etc.)
import { Course } from "./page"; // Import the type definition

// ... Animation Variants and Reusable Components (AnimatedCounter, CourseCard) are the same

// --- Main Courses Page Component ---
// 👇 It now accepts a `courses` prop
export default function CoursesPageClient({ courses }: { courses: Course[] }) {
    
    // ❌ REMOVE the hardcoded `allCourses` array
    // const allCourses = [ ... ];

    const categories = ['All', 'Development', 'Design', 'Marketing', 'Data Science', 'Cloud', 'Cybersecurity', 'AI', 'Business', 'Productivity', 'Mobile', 'Game Dev'];
    const [activeCategory, setActiveCategory] = useState('All');
    const [activeSort, setActiveSort] = useState('All');

    const filteredAndSortedCourses = useMemo(() => {
        // 👇 Use the `courses` prop here
        let filtered = activeCategory === 'All' ? courses : courses.filter(c => c.category === activeCategory);
        if (activeSort === 'Latest') filtered = filtered.filter(c => c.latest);
        else if (activeSort === 'Best Selling') filtered = filtered.filter(c => c.bestseller);
        return filtered;
    // 👇 Add `courses` to the dependency array
    }, [activeCategory, activeSort, courses]);
    
    // The rest of your JSX remains exactly the same!
    return (
        <motion.div /* ... */ >
            {/* ... Hero Section ... */}
            {/* ... Stats Section ... */}
            {/* ... Categories Section ... */}
            
            {/* Courses Grid & Filters */}
            <section className="py-24 px-4 bg-gray-50 dark:bg-black/50">
                <div className="max-w-7xl mx-auto">
                   {/* ... Your filters JSX ... */}
                    
                    <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <AnimatePresence>
                            {/* This now maps over your dynamic, filtered data */}
                            {filteredAndSortedCourses.map((course) => (
                                <CourseCard key={course._id} course={course} />
                            ))}
                        </AnimatePresence>
                    </motion.div>
                </div>
            </section>

            {/* ... Contact Us Section ... */}
        </motion.div>
    );
}