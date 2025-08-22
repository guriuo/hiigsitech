'use client';

import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Star, Clock, BarChart, Zap, Award, ChevronDown, Users, Video, BookOpen } from 'lucide-react';

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

// --- 3D Animated Background Component ---
const CourseIcons = ({ count = 25 }) => {
    const mesh = useRef<THREE.InstancedMesh>(null!);
    const dummy = useMemo(() => new THREE.Object3D(), []);

    const particles = useMemo(() => {
        const temp = [];
        const geometries = [
            new THREE.BoxGeometry(0.8, 0.8, 0.8),
            new THREE.SphereGeometry(0.5, 16, 16),
            new THREE.ConeGeometry(0.5, 1, 16),
            new THREE.TorusGeometry(0.4, 0.15, 16, 40),
            new THREE.IcosahedronGeometry(0.5, 0),
        ];
        for (let i = 0; i < count; i++) {
            const t = Math.random() * 100;
            const factor = 20 + Math.random() * 100;
            const speed = 0.0005 + Math.random() / 500; // Slower speed
            const x = (Math.random() - 0.5) * 50;
            const y = (Math.random() - 0.5) * 50;
            const z = (Math.random() - 0.5) * 50;
            temp.push({ t, factor, speed, x, y, z, geometry: geometries[Math.floor(Math.random() * geometries.length)] });
        }
        return temp;
    }, [count]);

    useFrame(() => {
        if (!mesh.current) return;
        particles.forEach((particle, i) => {
            let { t, speed } = particle;
            particle.t += speed;
            const s = Math.max(0.1, Math.abs(Math.cos(particle.t)) * 0.5); // Smaller scale
            
            dummy.position.set(particle.x, particle.y, particle.z);
            dummy.rotation.x = dummy.rotation.y = dummy.rotation.z += 0.005;
            dummy.scale.set(s,s,s);
            dummy.updateMatrix();
            mesh.current.setMatrixAt(i, dummy.matrix);
        });
        mesh.current.instanceMatrix.needsUpdate = true;
    });

    return (
        <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color="#a78bfa" emissive="#8b5cf6" roughness={0.2} metalness={0.5} />
        </instancedMesh>
    );
};

// --- Reusable Components ---
const sectionVariants = { hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } } };
const itemVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } };
const IconChevronDown = ({ isOpen }: { isOpen: boolean }) => (<ChevronDown className={`w-5 h-5 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />);

const CourseCard = ({ course }: { course: Course }) => (
  <motion.div variants={itemVariants} layout className="relative group flex flex-col h-full overflow-hidden rounded-2xl bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700/50 shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
    <a href={`/courses/${course.slug}`} className="block">
      <div className="relative h-48 w-full overflow-hidden">
        <img src={course.coverImageUrl || 'https://placehold.co/600x400/1e293b/ffffff?text=Course'} alt={course.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        {course.bestseller && (<span className="absolute top-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-yellow-400 px-3 py-1 text-xs font-bold text-black"><Award className="w-4 h-4" /> Bestseller</span>)}
        {course.latest && (<span className="absolute top-3 right-3 inline-flex items-center gap-1.5 rounded-full bg-purple-500 px-3 py-1 text-xs font-bold text-white"><Zap className="w-4 h-4" /> New</span>)}
      </div>
    </a>
    <div className="flex flex-col flex-grow p-5">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-semibold text-indigo-500 dark:text-indigo-400">{course.category}</span>
        <span className="text-sm font-bold text-gray-800 dark:text-gray-100">{course.price === 0 ? 'Free' : `$${course.price}`}</span>
      </div>
      <h3 className="text-lg font-bold text-gray-900 dark:text-white line-clamp-2 flex-grow"><a href={`/courses/${course.slug}`} className="hover:text-indigo-600 transition-colors">{course.title}</a></h3>
      <div className="mt-4 flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700 pt-4">
        <div className="flex items-center gap-2"><Clock className="w-4 h-4" /><span>{course.duration}</span></div>
        <div className="flex items-center gap-2"><BarChart className="w-4 h-4" /><span>{course.level || 'All Levels'}</span></div>
      </div>
      <div className="mt-4 flex items-center gap-3 border-t border-gray-200 dark:border-gray-700 pt-4">
        <img src={course.instructor.avatarUrl || `https://i.pravatar.cc/40?u=${course.instructor.name}`} alt={course.instructor.name} className="w-10 h-10 rounded-full object-cover" />
        <div>
          <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">{course.instructor.name}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">Instructor</p>
        </div>
      </div>
    </div>
  </motion.div>
);

const FAQItem = ({ faq, isOpen, onClick }: { faq: { q: string, a: string }, isOpen: boolean, onClick: () => void }) => (
    <motion.div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden" variants={itemVariants}>
        <button onClick={onClick} className="w-full flex justify-between items-center p-5 text-left font-semibold text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-800/50 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
            <span>{faq.q}</span>
            <IconChevronDown isOpen={isOpen} />
        </button>
        <AnimatePresence>
            {isOpen && (<motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: 'easeInOut' }} className="overflow-hidden"><p className="p-5 pt-0 text-gray-600 dark:text-gray-400">{faq.a}</p></motion.div>)}
        </AnimatePresence>
    </motion.div>
);

// --- Main Client Component for /courses page ---
export default function CoursesClientView({ courses: initialCourses = [] }: { courses: Course[] }) {
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [activePrice, setActivePrice] = useState('All');
  const [activeLevel, setActiveLevel] = useState('All');
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    // If we receive courses, we are no longer in an initial loading state.
    if (initialCourses && initialCourses.length > 0) {
        setIsLoading(false);
    } else {
        // Handle case where no courses are passed initially, maybe show loading for a moment
        const timer = setTimeout(() => setIsLoading(false), 500); // Prevent flicker
        return () => clearTimeout(timer);
    }
  }, [initialCourses]);

  const categories = useMemo(() => ['All', ...Array.from(new Set((initialCourses || []).map(c => c.category)))].slice(0, 5), [initialCourses]);
  const levels = ['All', 'Beginner', 'Intermediate', 'Advanced'];
  const prices = ['All', 'Paid', 'Free'];

  const filteredCourses = useMemo(() => {
    if (!initialCourses) return [];
    return initialCourses
      .filter(course => course.title.toLowerCase().includes(searchTerm.toLowerCase()))
      .filter(course => activeCategory === 'All' || course.category === activeCategory)
      .filter(course => activePrice === 'All' || (activePrice === 'Free' ? course.price === 0 : course.price > 0))
      .filter(course => activeLevel === 'All' || course.level === activeLevel);
  }, [initialCourses, searchTerm, activeCategory, activePrice, activeLevel]);
  
  const featuredCourses = useMemo(() => {
    if (!initialCourses) return [];
    return initialCourses.filter(c => c.bestseller || c.latest).slice(0, 8)
  }, [initialCourses]);
  
  const faqs = [
    { q: "How do I enroll in a course?", a: "Simply click on the course you're interested in, and then click the 'Enroll Now' button. You'll be guided through a secure payment and registration process." },
    { q: "Do I get a certificate upon completion?", a: "Yes! All our courses come with a verifiable certificate of completion that you can add to your LinkedIn profile or resume." },
    { q: "Is there lifetime access to the courses?", a: "Absolutely. Once you enroll, you have lifetime access to the course materials, including all future updates, across all your devices." },
    { q: "What if I'm not satisfied with a course?", a: "We offer a 30-day money-back guarantee. If you're not completely satisfied, you can request a full refund, no questions asked." },
  ];

  return (
    <div className="bg-gray-100 dark:bg-black text-gray-800 dark:text-gray-200">
      <motion.header className="relative pt-32 pb-20 text-center bg-white dark:bg-gray-900/80 overflow-hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}>
        {isClient && (<div className="absolute inset-0 z-0 opacity-20 dark:opacity-30 filter blur-sm"><Canvas camera={{ fov: 75, position: [0, 0, 20] }}><ambientLight intensity={0.5} /><pointLight position={[10, 10, 10]} intensity={1} /><CourseIcons /></Canvas></div>)}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-purple-500/10 dark:bg-purple-500/5 blur-3xl rounded-full -translate-x-1/4"></div>
        <div className="absolute bottom-0 left-0 w-1/2 h-full bg-teal-500/10 dark:bg-teal-500/5 blur-3xl rounded-full translate-x-1/4"></div>
        <div className="relative z-10 max-w-4xl mx-auto px-4">
          <motion.h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 dark:text-white tracking-tight" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.7, delay: 0.2 }}>Unlock Your Potential. <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-teal-500">Start Learning Today.</span></motion.h1>
          <motion.p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-300" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.7, delay: 0.4 }}>Explore our expert-led courses in technology, business, and design. Find the perfect course to advance your career and skills.</motion.p>
          <motion.div className="mt-8 max-w-xl mx-auto" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.7, delay: 0.6 }}>
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input type="text" placeholder="Search for a course..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-12 pr-4 py-3 rounded-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-shadow" />
            </div>
          </motion.div>
        </div>
      </motion.header>

      <main className="px-4 sm:px-6 lg:px-8 py-16">
        <motion.div className="max-w-7xl mx-auto mb-12" variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                <div className="flex flex-col"><label className="text-sm font-medium mb-2 text-gray-600 dark:text-gray-400">Category</label><select onChange={(e) => setActiveCategory(e.target.value)} className="p-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-indigo-500 outline-none">{categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}</select></div>
                <div className="flex flex-col"><label className="text-sm font-medium mb-2 text-gray-600 dark:text-gray-400">Price</label><select onChange={(e) => setActivePrice(e.target.value)} className="p-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-indigo-500 outline-none">{prices.map(price => <option key={price} value={price}>{price}</option>)}</select></div>
                <div className="flex flex-col"><label className="text-sm font-medium mb-2 text-gray-600 dark:text-gray-400">Level</label><select onChange={(e) => setActiveLevel(e.target.value)} className="p-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-indigo-500 outline-none">{levels.map(level => <option key={level} value={level}>{level}</option>)}</select></div>
                <div className="flex flex-col justify-end"><button onClick={() => { setActiveCategory('All'); setActivePrice('All'); setActiveLevel('All'); setSearchTerm(''); document.querySelectorAll('select').forEach(s => s.selectedIndex = 0); }} className="w-full p-3 rounded-lg bg-gradient-to-r from-purple-600 via-indigo-700 to-teal-600 text-white font-semibold hover:opacity-90 transition-opacity">Reset Filters</button></div>
            </div>
        </motion.div>

        {!isLoading && featuredCourses.length > 0 && (
            <motion.section className="max-w-7xl mx-auto mb-20" variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Featured Courses</h2>
                <div className="relative"><div className="flex space-x-6 overflow-x-auto pb-4 -mx-4 px-4 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-700 scrollbar-track-transparent">{featuredCourses.map(course => (<div key={course._id} className="flex-shrink-0 w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.33%-16px)] xl:w-[calc(25%-18px)]"><CourseCard course={course} /></div>))}</div></div>
            </motion.section>
        )}

        <motion.section className="max-w-7xl mx-auto" variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }}>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">All Courses ({isLoading ? '...' : filteredCourses.length})</h2>
          <AnimatePresence>
            <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {isLoading ? (<div className="col-span-full text-center py-16"><p className="text-lg text-gray-500 dark:text-gray-400">Loading courses...</p></div>) 
              : filteredCourses.length > 0 ? (filteredCourses.map(course => <CourseCard key={course._id} course={course} />)) 
              : (<motion.div initial={{opacity: 0}} animate={{opacity: 1}} className="col-span-full text-center py-16 bg-white dark:bg-gray-900/50 rounded-2xl"><p className="text-xl font-semibold text-gray-700 dark:text-gray-300">No courses match your criteria.</p><p className="mt-2 text-gray-500 dark:text-gray-400">Try adjusting your filters or check back later for new content!</p></motion.div>)}
            </motion.div>
          </AnimatePresence>
        </motion.section>

        <motion.section className="max-w-3xl mx-auto my-24" variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
            <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-10">Frequently Asked Questions</h2>
            <motion.div className="flex flex-col gap-4" variants={{ visible: { transition: { staggerChildren: 0.1 } } }}>{faqs.map((faq, index) => (<FAQItem key={index} faq={faq} isOpen={openFaq === index} onClick={() => setOpenFaq(openFaq === index ? null : index)}/>))}</motion.div>
        </motion.section>
        
        <motion.section className="max-w-5xl mx-auto my-24 py-16 bg-white dark:bg-gray-900/50 rounded-2xl shadow-xl" variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center px-4">
                <motion.div variants={itemVariants} className="flex flex-col items-center"><BookOpen className="w-12 h-12 text-indigo-500 mb-2"/><p className="text-3xl font-bold text-gray-900 dark:text-white">50+</p><p className="text-gray-600 dark:text-gray-400">Courses</p></motion.div>
                <motion.div variants={itemVariants} className="flex flex-col items-center"><Users className="w-12 h-12 text-indigo-500 mb-2"/><p className="text-3xl font-bold text-gray-900 dark:text-white">5k+</p><p className="text-gray-600 dark:text-gray-400">Students</p></motion.div>
                <motion.div variants={itemVariants} className="flex flex-col items-center"><Video className="w-12 h-12 text-indigo-500 mb-2"/><p className="text-3xl font-bold text-gray-900 dark:text-white">1000+</p><p className="text-gray-600 dark:text-gray-400">Video Lessons</p></motion.div>
                <motion.div variants={itemVariants} className="flex flex-col items-center"><Star className="w-12 h-12 text-indigo-500 mb-2"/><p className="text-3xl font-bold text-gray-900 dark:text-white">95%</p><p className="text-gray-600 dark:text-gray-400">Satisfaction</p></motion.div>
            </div>
        </motion.section>

        <motion.section className="max-w-5xl mx-auto my-24" variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.5 }}>
            <div className="relative text-center p-12 sm:p-16 rounded-3xl bg-gradient-to-r from-purple-600 via-indigo-700 to-teal-600 text-white overflow-hidden">
                 <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full"></div>
                 <div className="absolute -bottom-16 -left-10 w-56 h-56 bg-white/10 rounded-full"></div>
                 <div className="relative z-10">
                    <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">Join Thousands of Learners Today</h2>
                    <p className="mt-4 max-w-xl mx-auto text-lg text-indigo-100">Take the next step in your career. With our flexible learning options, you can learn at your own pace, anytime, anywhere.</p>
                    <a href="#" className="mt-8 inline-block bg-white text-indigo-600 font-bold py-4 px-10 rounded-full text-lg hover:bg-gray-100 transition-transform transform hover:scale-105 duration-300 shadow-lg">Start Learning Now</a>
                 </div>
            </div>
        </motion.section>
      </main>
    </div>
  );
}
