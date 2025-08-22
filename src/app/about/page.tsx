'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, Variants, useInView, animate, AnimatePresence } from "framer-motion";
import { ArrowRight, Zap, Gem, Users, Linkedin, Briefcase, Star, Target, Quote, Rocket, ShoppingCart, BookOpen, HeartPulse, Home, Clapperboard, ChevronLeft, ChevronRight } from "lucide-react";
import Link from 'next/link';

// --- Animation Variants ---
const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut", staggerChildren: 0.2 }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

// --- Reusable Components ---
const SectionTitle = ({ children }: { children: React.ReactNode }) => (
    <h2 className="text-4xl md:text-5xl font-extrabold text-center text-gray-900 dark:text-white">
        {children}
    </h2>
);

const AnimatedCounter = ({ to }: { to: number }) => {
    const ref = useRef<HTMLSpanElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });

    useEffect(() => {
        if (isInView && ref.current) {
            const controls = animate(0, to, {
                duration: 2,
                ease: "easeOut",
                onUpdate(value) {
                    if (ref.current) {
                        ref.current.textContent = Math.round(value).toString();
                    }
                }
            });
            return () => controls.stop();
        }
    }, [isInView, to]);

    return <span ref={ref}>0</span>;
};


// --- Main About Page Component ---
export default function AboutPage() {

    const differentiators = [
        { icon: <Zap />, title: "Smart Solutions, Tangible Growth", desc: "Strategies tailored to deliver measurable business value." },
        { icon: <Gem />, title: "Design That Works Hard", desc: "Creative assets that don’t just look good, they perform." },
        { icon: <Briefcase />, title: "Agility Meets Expertise", desc: "Quick execution without compromising quality." },
        { icon: <Target />, title: "Future-Ready Approach", desc: "Tech and trends that keep you ahead of the curve." },
        { icon: <Star />, title: "Full-Stack Creativity", desc: "From strategy to execution, we cover it all." },
        { icon: <Users />, title: "Partnership Over Service", desc: "We invest in your success like it’s our own." },
    ];

    const achievements = [
        { value: 50, suffix: "+", label: "Projects Delivered" },
        { value: 30, suffix: "+", label: "Happy Clients" },
        { value: 7, suffix: "+", label: "Years of Expertise" },
        { value: 5, suffix: "+", label: "Global Partnerships" },
        { value: 95, suffix: "%", label: "Client Satisfaction" },
    ];

    const industries = [
        { icon: <Rocket />, name: "Technology & Startups" },
        { icon: <ShoppingCart />, name: "Retail & E-commerce" },
        { icon: <BookOpen />, name: "Education & E-learning" },
        { icon: <HeartPulse />, name: "Health & Wellness" },
        { icon: <Home />, name: "Real Estate & Property" },
        { icon: <Clapperboard />, name: "Media & Entertainment" },
    ];

    const processSteps = [
        { num: "01", name: "Discover", desc: "Understanding your vision, goals, and challenges to build a strategic foundation." },
        { num: "02", name: "Plan", desc: "Creating a strategic roadmap and a clear blueprint for success." },
        { num: "03", name: "Create", desc: "Designing and developing with precision, creativity, and technical excellence." },
        { num: "04", name: "Launch & Evolve", desc: "Delivering high-impact results and providing ongoing support for growth." },
    ];
    
    // ✅ UPDATED: Expanded testimonials with Somali names and shorter quotes
    const testimonials = [
        { quote: "Their team delivered our project on time and exceeded all our initial expectations.", name: "Ahmed Yusuf", company: "Tech Solutions Inc." },
        { quote: "A truly professional and dedicated partner who provided invaluable strategic insights for our company.", name: "Amina Ali", company: "Innovate Group" },
        { quote: "The UI/UX design they created is simply stunning. Our user engagement has skyrocketed.", name: "Hassan Omar", company: "Digital Ventures" },
        { quote: "Working with them was a seamless experience. Their communication and project management are top-notch.", name: "Fatima Mohamed", company: "Creative Minds" },
        { quote: "They don’t just build apps; they build brands. A game-changer for our business.", name: "Ibrahim Said", company: "Market Leaders Co." },
        { quote: "The final product was polished, professional, and delivered exactly what we needed to grow.", name: "Khadija Hussein", company: "Growth Partners" },
        { quote: "Their strategic approach helped us navigate a complex market with confidence and great success.", name: "Yusuf Abdi", company: "Future Forward" },
        { quote: "An incredibly talented team that is a pleasure to work with. Highly recommended.", name: "Zahra Nur", company: "Bright Ideas LLC" },
        { quote: "The results speak for themselves. Our metrics have improved across the board since launch.", name: "Ali Jama", company: "Data Driven Co." },
        { quote: "They understood our vision from day one and brought it to life beautifully.", name: "Mariam Hassan", company: "Visionary Tech" },
        { quote: "A reliable, creative, and expert partner for any digital project you can imagine.", name: "Omar Ibrahim", company: "NextGen Solutions" }
    ];

    const [testimonialIndex, setTestimonialIndex] = useState(0);
    
    // ✅ UPDATED: Added auto-carousel logic
    useEffect(() => {
        const timer = setInterval(() => {
            setTestimonialIndex(prev => (prev + 1) % testimonials.length);
        }, 5000); // Change slide every 5 seconds
        return () => clearInterval(timer); // Cleanup on component unmount
    }, [testimonials.length]);

    const paginate = (direction: number) => {
        setTestimonialIndex(prev => (prev + direction + testimonials.length) % testimonials.length);
    };


  return (
    <>
    {/* ✅ UPDATED: Added new keyframes for the animated gradient background */}
    <style jsx global>{`
      @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800;900&display=swap');
      body {
        font-family: 'Poppins', sans-serif;
        user-select: text;
      }
      @keyframes gradient-pan-1 {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
      }
      @keyframes gradient-pan-2 {
        0% { background-position: 100% 50%; }
        50% { background-position: 0% 50%; }
        100% { background-position: 100% 50%; }
      }
    `}</style>
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-white dark:bg-black"
    >
      {/* --- 1. Hero Section --- */}
      <section className="relative pt-36 pb-20 text-center overflow-hidden">
        {/* ✅ UPDATED: New animated gradient background */}
        <div className="absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-gray-50 dark:bg-black"></div>
            <div 
              className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-br from-blue-500/20 via-pink-500/20 to-red-500/20 blur-3xl"
              style={{ backgroundSize: '200% 200%', animation: 'gradient-pan-1 15s ease infinite' }}
            ></div>
            <div 
              className="absolute bottom-0 right-0 w-1/2 h-full bg-gradient-to-tl from-green-500/20 via-cyan-500/20 to-purple-500/20 blur-3xl"
              style={{ backgroundSize: '200% 200%', animation: 'gradient-pan-2 15s ease infinite' }}
            ></div>
        </div>
        
        <motion.div
            variants={sectionVariants}
            initial="hidden"
            animate="visible"
            className="relative z-10 max-w-4xl mx-auto px-4"
        >
          <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl font-extrabold text-gray-900 dark:text-white">
            We Transform Ideas Into Powerful Realities
          </motion.h1>
          <motion.p variants={itemVariants} className="mt-6 text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Aleen Creatives is a thriving business agency founded and led by Mubarik Osman — a visionary in the digital world.
          </motion.p>
          <motion.div variants={itemVariants} className="mt-8">
            <Link href="/portfolio" className="inline-flex items-center justify-center bg-blue-600 text-white font-semibold py-2 px-6 rounded-full shadow-lg hover:bg-blue-700 transition-transform transform hover:scale-105 duration-300 text-sm">
                View Mubarik’s Portfolio <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* --- 2. Who We Are --- */}
      <motion.section
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="py-20 px-4"
      >
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
            <motion.div variants={itemVariants}>
                <h2 className="text-3xl md:text-4xl font-extrabold text-blue-600 dark:text-blue-500">Who We Are</h2>
                <p className="mt-4 text-gray-600 dark:text-gray-300">
                    We specialize in crafting cutting-edge web applications, mobile apps, UI/UX designs, digital marketing strategies, motion graphics, and business consulting that empower brands to stand out in a crowded market. Our team combines strategic thinking with bold creativity, delivering solutions that are not only visually striking but also business-driven.
                </p>
                <p className="mt-4 text-gray-600 dark:text-gray-300">
                    Every project is an opportunity to innovate, inspire, and achieve measurable results. With a track record of excellence and a passion for results, Aleen Creatives continues to be the go-to partner for ambitious brands ready to make an impact.
                </p>
            </motion.div>
            <motion.div variants={itemVariants} className="relative h-80 lg:h-96 rounded-2xl overflow-hidden shadow-2xl">
                <img src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1770" alt="A team planning a project on a whiteboard" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
            </motion.div>
        </div>
      </motion.section>

      {/* --- 3. What Makes Us Different --- */}
      <motion.section
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="py-20 px-4 bg-gray-50 dark:bg-black/50"
      >
        <SectionTitle>What Makes Us Different</SectionTitle>
        <div className="max-w-6xl mx-auto mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {differentiators.map((item) => (
                <motion.div
                    key={item.title}
                    variants={itemVariants}
                    className="relative p-8 bg-white dark:bg-gray-900/80 rounded-2xl shadow-lg overflow-hidden group"
                >
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="flex items-center gap-4">
                        <div className="bg-blue-600/10 dark:bg-blue-900/50 p-3 rounded-full text-blue-600">
                           {React.cloneElement(item.icon, { className: "w-6 h-6" })}
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">{item.title}</h3>
                    </div>
                    <p className="mt-4 text-gray-600 dark:text-gray-400">{item.desc}</p>
                </motion.div>
            ))}
        </div>
      </motion.section>
      
      {/* --- 4. Testimonial Carousel Section --- */}
      <section className="py-20 px-4 relative">
        <div className="max-w-4xl mx-auto text-center">
            <Quote className="w-12 h-12 mx-auto text-blue-400 dark:text-blue-600" />
            <div className="relative h-48 mt-6 overflow-hidden">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={testimonialIndex}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.5 }}
                        className="absolute inset-0 flex flex-col justify-center"
                    >
                        <blockquote className="text-xl md:text-2xl font-medium text-gray-800 dark:text-gray-200 italic">
                            "{testimonials[testimonialIndex].quote}"
                        </blockquote>
                        <cite className="mt-6 block font-semibold text-gray-600 dark:text-gray-400 not-italic">
                            — {testimonials[testimonialIndex].name}, {testimonials[testimonialIndex].company}
                        </cite>
                    </motion.div>
                </AnimatePresence>
            </div>
            <div className="mt-8 flex justify-center gap-4">
                <button onClick={() => paginate(-1)} className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"><ChevronLeft /></button>
                <button onClick={() => paginate(1)} className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"><ChevronRight /></button>
            </div>
        </div>
      </section>

      {/* --- 5. Our Process --- */}
       <motion.section
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="py-20 px-4 bg-gray-50 dark:bg-black/50"
       >
         <SectionTitle>Our Process</SectionTitle>
         <div className="max-w-6xl mx-auto mt-16">
           <div className="relative">
             <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-gray-200 dark:bg-gray-800 -translate-y-1/2"></div>
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
               {processSteps.map((step) => (
                 <motion.div key={step.name} variants={itemVariants} className="relative p-6 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-xl border border-gray-200 dark:border-gray-800 shadow-lg z-10 text-center">
                   <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 bg-blue-600 text-white font-bold text-lg rounded-full flex items-center justify-center border-4 border-gray-50 dark:border-black/50">{step.num}</div>
                   <h4 className="text-xl font-bold text-gray-900 dark:text-white mt-8">{step.name}</h4>
                   <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{step.desc}</p>
                 </motion.div>
               ))}
             </div>
           </div>
         </div>
       </motion.section>

      {/* --- 6. Industries We Serve --- */}
      <motion.section
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="py-20 px-4"
      >
        <SectionTitle>Industries We Serve</SectionTitle>
        <div className="max-w-5xl mx-auto mt-16 grid grid-cols-2 md:grid-cols-3 gap-6 text-center">
            {industries.map((industry) => (
                <motion.div key={industry.name} variants={itemVariants} className="p-6 bg-gray-50 dark:bg-gray-900/50 rounded-lg flex flex-col items-center justify-center gap-3 transition-transform hover:-translate-y-1">
                    {React.cloneElement(industry.icon, { className: "w-8 h-8 text-blue-600" })}
                    <span className="font-semibold text-gray-700 dark:text-gray-300">{industry.name}</span>
                </motion.div>
            ))}
        </div>
      </motion.section>

      {/* --- 7. Achievements in Numbers --- */}
      <motion.section
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="py-20 px-4 bg-gray-50 dark:bg-black/50"
      >
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 text-center">
            {achievements.map((stat) => (
                <motion.div key={stat.label} variants={itemVariants}>
                    <h3 className="text-4xl md:text-5xl font-bold text-blue-600">
                        <AnimatedCounter to={stat.value} />{stat.suffix}
                    </h3>
                    <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 uppercase tracking-wider">{stat.label}</p>
                </motion.div>
            ))}
        </div>
      </motion.section>

      {/* --- 8. Team Section --- */}
      <motion.section
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="py-20 px-4 text-center"
      >
        <SectionTitle>Meet the Founder</SectionTitle>
        <div className="mt-16 flex justify-center" style={{ perspective: '1000px' }}>
          <motion.div 
            variants={itemVariants}
            whileHover={{ rotateY: 10, rotateX: 3, scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className="group bg-white dark:bg-gray-900/50 p-8 rounded-3xl shadow-2xl max-w-sm w-full flex flex-col items-center border border-gray-200 dark:border-gray-800"
            style={{ transformStyle: 'preserve-3d' }}
          >
            <div className="relative w-40 h-40 rounded-full overflow-hidden shadow-lg border-4 border-blue-600/50 transition-all duration-300">
              <img src="https://i.pravatar.cc/200?img=12" alt="Mubarik Osman" className="w-full h-full object-cover" />
            </div>
            <h3 className="mt-5 text-2xl font-bold text-gray-900 dark:text-white">Mubarik Osman</h3>
            <p className="text-blue-600 dark:text-blue-400 font-medium">Founder, CEO & Software Engineer</p>
            <p className="mt-4 text-sm text-gray-500 dark:text-gray-400 italic">“I build bridges between ambitious ideas and tangible, market-leading realities.”</p>
            <div className="mt-6">
              <a href="#" className="text-gray-500 hover:text-blue-600 transition-colors"><Linkedin /></a>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* --- 9. Call to Action --- */}
      <section className="bg-blue-600 text-white">
        <div className="max-w-5xl mx-auto py-20 px-4 text-center">
            <motion.h2
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              className="text-4xl font-extrabold"
            >
              Ready to build the future together?
            </motion.h2>
            <motion.p
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              className="mt-4 max-w-2xl mx-auto text-lg text-blue-100"
            >
              Your vision deserves a dedicated partner. Let's talk about how we can turn your idea into an unforgettable digital experience.
            </motion.p>
            <motion.div
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              className="mt-10"
            >
              <Link href="/contact" className="bg-white text-blue-600 font-semibold py-3 px-8 rounded-full shadow-lg hover:bg-gray-100 transition-transform transform hover:scale-105 duration-300">
                Start Your Project
              </Link>
            </motion.div>
        </div>
      </section>
    </motion.div>
    </>
  );
}
