'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, Variants, useInView, animate, AnimatePresence } from "framer-motion";
import { Code, PenTool, Video, Bot, Check, Star, Target, Quote, Smartphone, Pencil, Palette, Cloud, Rocket, ShoppingCart, BookOpen, HeartPulse, Home, Clapperboard, ChevronLeft, ChevronRight, BrainCircuit, Layers, ShieldCheck, Gem } from "lucide-react";
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
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

// --- Reusable Components ---
const SectionTitle = ({ children }: { children: React.ReactNode }) => (
    <h2 className="text-4xl md:text-5xl font-extrabold text-center text-gray-900 dark:text-white">
        {children}
    </h2>
);

const SectionSubtitle = ({ children }: { children: React.ReactNode }) => (
    <p className="mt-4 max-w-3xl mx-auto text-center text-lg text-gray-600 dark:text-gray-300">
        {children}
    </p>
);

const AnimatedCounter = ({ to, suffix }: { to: number, suffix: string }) => {
    const ref = React.useRef<HTMLSpanElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });

    React.useEffect(() => {
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

    return <><span ref={ref}>0</span>{suffix}</>;
};

// --- Main Services Page Component ---
export default function ServicesPage() {

    const growthFeatures = {
        starter: ["Custom Logo Design", "Social Media Management (2 Platforms)", "15 Custom Posts / Month"],
        growth: ["Everything in Starter", "Web Design (Up to 5 Pages)", "Basic SEO & Analytics", "30 Custom Posts / Month", "1 Short Video"],
        enterprise: ["Everything in Growth", "Full Brand Guidelines Book", "E-commerce Functionality", "Advanced SEO & Reporting", "Dedicated Account Manager"]
    };
    
    const stats = [
        { value: 50, suffix: "+", label: "Projects Delivered" },
        { value: 30, suffix: "+", label: "Happy Clients" },
        { value: 7, suffix: "+", label: "Years of Experience" },
        { value: 20, suffix: "+", label: "Partners" },
        { value: 98, suffix: "%", label: "Client Satisfaction" },
    ];
    
    const processSteps = [
        { num: "01", name: "Discover", desc: "Understanding your vision, goals, and challenges to build a strategic foundation." },
        { num: "02", name: "Plan", desc: "Creating a strategic roadmap and a clear blueprint for success." },
        { num: "03", name: "Create", desc: "Designing and developing with precision, creativity, and technical excellence." },
        { num: "04", name: "Launch & Evolve", desc: "Delivering high-impact results and providing ongoing support for growth." },
    ];

    const industries = [
        { icon: <Rocket />, name: "Technology & Startups" },
        { icon: <ShoppingCart />, name: "Retail & E-commerce" },
        { icon: <BookOpen />, name: "Education & E-learning" },
        { icon: <HeartPulse />, name: "Health & Wellness" },
        { icon: <Home />, name: "Real Estate & Property" },
        { icon: <Clapperboard />, name: "Media & Entertainment" },
    ];
    
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
    
    useEffect(() => {
        const timer = setInterval(() => {
            setTestimonialIndex(prev => (prev + 1) % testimonials.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [testimonials.length]);

    const paginate = (direction: number) => {
        setTestimonialIndex(prev => (prev + direction + testimonials.length) % testimonials.length);
    };
    
    const faqs = [
        { q: "How long does a project usually take?", a: "Most projects take 4–12 weeks, depending on scope and complexity. We provide a detailed timeline after our initial discovery phase." },
        { q: "Do you offer post-launch support?", a: "Yes — ongoing maintenance, updates, and support are part of our packages to ensure your digital product remains secure and performs optimally." },
        { q: "Can you work with international clients?", a: "Absolutely. We collaborate with clients remotely across all time zones, using modern tools to ensure seamless communication and project management." },
    ];

    const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
    
    const servicesGrid = [
        { icon: <ShieldCheck />, name: "Brand Strategy" },
        { icon: <Palette />, name: "Logo Design" },
        { icon: <Code />, name: "Web Development" },
        { icon: <Smartphone />, name: "Mobile Apps" },
        { icon: <PenTool />, name: "UI/UX" },
        { icon: <Target />, name: "Digital Marketing" },
        { icon: <Video />, name: "Motion Graphics" },
        { icon: <Layers />, name: "Software Development" },
        { icon: <Cloud />, name: "Cloud Integration" },
        { icon: <Gem />, name: "Product Design" },
        { icon: <Pencil />, name: "Copywriting" },
        { icon: <Bot />, name: "Consulting" },
    ];


    return (
      <>
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
          .background-animate {
            background-size: 200% 200%;
            animation: gradient-pan-1 3s ease infinite;
          }
        `}</style>
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-white dark:bg-black"
        >
            {/* 1. Hero Section */}
            <motion.section
                variants={sectionVariants}
                initial="hidden"
                animate="visible"
                className="relative pt-36 pb-20 text-center overflow-hidden"
            >
                <div className="absolute inset-0 -z-10">
                    <div className="absolute inset-0 bg-gray-50 dark:bg-black"></div>
                    <div 
                      className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20 blur-3xl"
                      style={{ backgroundSize: '200% 200%', animation: 'gradient-pan-1 15s ease infinite' }}
                    ></div>
                    <div 
                      className="absolute bottom-0 right-0 w-1/2 h-full bg-gradient-to-tl from-green-500/20 via-cyan-500/20 to-yellow-500/20 blur-3xl"
                      style={{ backgroundSize: '200% 200%', animation: 'gradient-pan-2 15s ease infinite' }}
                    ></div>
                </div>
                <div className="relative z-10 max-w-4xl mx-auto px-4">
                    <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl font-extrabold text-gray-900 dark:text-white">
                        Transform Your Ideas Into Digital Success
                    </motion.h1>
                    <motion.p variants={itemVariants} className="mt-6 text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                        At Hiigsi Tech, we deliver premium solutions across web, mobile, design, and marketing that drive real business results.
                    </motion.p>
                    <motion.div variants={itemVariants} className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
                        <Link href="/contact" className="group relative inline-flex items-center justify-center text-lg bg-blue-600 text-white font-semibold py-3 px-8 rounded-full shadow-lg transition-transform transform hover:scale-105 duration-300 overflow-hidden">
                            <span className="absolute h-full w-full bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500 background-animate"></span>
                            <span className="relative z-10">Start Your Project</span>
                        </Link>
                        <Link href="/projects" className="group relative inline-flex items-center justify-center text-lg bg-white/10 dark:bg-black/20 backdrop-blur-md text-black dark:text-white font-semibold py-3 px-8 rounded-full shadow-lg hover:bg-white/20 dark:hover:bg-black/30 transition-transform transform hover:scale-105 duration-300 overflow-hidden">
                            <span className="absolute h-full w-full bg-gradient-to-r from-green-400 via-cyan-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500 background-animate"></span>
                            <span className="relative z-10">See Our Work</span>
                        </Link>
                    </motion.div>
                </div>
            </motion.section>

            {/* 2. Services Overview */}
            <motion.section
                variants={sectionVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                className="py-20 px-4"
            >
                <div className="max-w-6xl mx-auto text-center">
                    <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white">What We Do</h2>
                    <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-300">Our expertise spans the full digital spectrum, ensuring a cohesive and powerful brand experience.</p>
                    <div className="mt-16 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-x-4 gap-y-8">
                        {servicesGrid.map(service => (
                             <motion.div key={service.name} variants={itemVariants} className="flex flex-col items-center gap-3 p-4 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800/50 transition-colors">
                                {React.cloneElement(service.icon, { className: "w-8 h-8 text-blue-600" })}
                                <span className="font-semibold text-center text-sm">{service.name}</span>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </motion.section>

            {/* 3. Detailed Service Sections */}
            <motion.section
                variants={sectionVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                className="py-20 px-4 bg-gray-50 dark:bg-black/50"
                style={{ perspective: '1000px' }}
            >
                <div className="max-w-6xl mx-auto text-center">
                    <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white">Explore Our Expertise</h2>
                    <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
                        <motion.div variants={itemVariants} whileHover={{ rotateY: 10, rotateX: 5, scale: 1.05 }} transition={{ type: 'spring', stiffness: 300, damping: 20 }} style={{ transformStyle: 'preserve-3d' }} className="p-6 bg-white dark:bg-gray-900 rounded-lg shadow-md"><h3 className="text-xl font-bold">Web & App Development</h3><p className="mt-2 text-gray-600 dark:text-gray-400">Custom websites and mobile apps that scale, perform, and are designed for engagement and growth.</p></motion.div>
                        <motion.div variants={itemVariants} whileHover={{ rotateY: 10, rotateX: 5, scale: 1.05 }} transition={{ type: 'spring', stiffness: 300, damping: 20 }} style={{ transformStyle: 'preserve-3d' }} className="p-6 bg-white dark:bg-gray-900 rounded-lg shadow-md"><h3 className="text-xl font-bold">UI/UX Design</h3><p className="mt-2 text-gray-600 dark:text-gray-400">Beautiful, intuitive interfaces that delight users, enhance usability, and drive conversions.</p></motion.div>
                        <motion.div variants={itemVariants} whileHover={{ rotateY: 10, rotateX: 5, scale: 1.05 }} transition={{ type: 'spring', stiffness: 300, damping: 20 }} style={{ transformStyle: 'preserve-3d' }} className="p-6 bg-white dark:bg-gray-900 rounded-lg shadow-md"><h3 className="text-xl font-bold">Motion Graphics</h3><p className="mt-2 text-gray-600 dark:text-gray-400">Bring your brand to life with captivating animations, from logo reveals to explainer videos.</p></motion.div>
                        <motion.div variants={itemVariants} whileHover={{ rotateY: 10, rotateX: 5, scale: 1.05 }} transition={{ type: 'spring', stiffness: 300, damping: 20 }} style={{ transformStyle: 'preserve-3d' }} className="p-6 bg-white dark:bg-gray-900 rounded-lg shadow-md"><h3 className="text-xl font-bold">Digital Marketing</h3><p className="mt-2 text-gray-600 dark:text-gray-400">Data-driven strategies to drive traffic, generate qualified leads, and boost your revenue.</p></motion.div>
                        <motion.div variants={itemVariants} whileHover={{ rotateY: 10, rotateX: 5, scale: 1.05 }} transition={{ type: 'spring', stiffness: 300, damping: 20 }} style={{ transformStyle: 'preserve-3d' }} className="p-6 bg-white dark:bg-gray-900 rounded-lg shadow-md"><h3 className="text-xl font-bold">Business Consulting</h3><p className="mt-2 text-gray-600 dark:text-gray-400">Expert strategy, actionable insights, and clear guidance to accelerate your growth.</p></motion.div>
                    </div>
                </div>
            </motion.section>

            {/* 4. Our Process */}
            <motion.section variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} className="py-20 px-4">
                <SectionTitle>Our Process</SectionTitle>
                <div className="max-w-6xl mx-auto mt-16">
                    <div className="relative">
                        <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-gray-200 dark:bg-gray-800 -translate-y-1/2"></div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                            {processSteps.map((step) => (
                                <motion.div key={step.name} variants={itemVariants} className="relative p-6 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-xl border border-gray-200 dark:border-gray-800 shadow-lg z-10 text-center">
                                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 bg-blue-600 text-white font-bold text-lg rounded-full flex items-center justify-center border-4 border-white dark:border-black">{step.num}</div>
                                    <h4 className="text-xl font-bold text-gray-900 dark:text-white mt-8">{step.name}</h4>
                                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{step.desc}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </motion.section>

            {/* 5. Industries We Serve */}
            <motion.section variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} className="py-20 px-4 bg-gray-50 dark:bg-black/50">
                <SectionTitle>Industries We Serve</SectionTitle>
                <div className="max-w-5xl mx-auto mt-16 grid grid-cols-2 md:grid-cols-3 gap-6 text-center">
                    {industries.map((industry) => (
                        <motion.div key={industry.name} variants={itemVariants} className="p-6 bg-white dark:bg-gray-900/50 rounded-lg flex flex-col items-center justify-center gap-3 transition-transform hover:-translate-y-1">
                            {React.cloneElement(industry.icon, { className: "w-8 h-8 text-blue-600" })}
                            <span className="font-semibold text-gray-700 dark:text-gray-300">{industry.name}</span>
                        </motion.div>
                    ))}
                </div>
            </motion.section>

            {/* 6. Why Choose Us (Stats) */}
            <motion.section variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} className="py-20 px-4">
                <SectionTitle>Why Choose Us</SectionTitle>
                <SectionSubtitle>We combine innovative solutions, measurable results, and a client-focused approach to deliver unparalleled value.</SectionSubtitle>
                <div className="max-w-5xl mx-auto mt-16 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 text-center">
                    {stats.map((stat) => (
                        <motion.div key={stat.label} variants={itemVariants}>
                            <h3 className="text-5xl font-bold text-blue-600">
                                <AnimatedCounter to={stat.value} suffix={stat.suffix} />
                            </h3>
                            <p className="mt-2 text-gray-500 dark:text-gray-400">{stat.label}</p>
                        </motion.div>
                    ))}
                </div>
            </motion.section>

            {/* 7. Testimonials */}
            <motion.section variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} className="py-20 px-4 bg-gray-50 dark:bg-black/50">
                <SectionTitle>Trusted by Industry Leaders</SectionTitle>
                <div className="max-w-4xl mx-auto mt-12">
                    <div className="relative h-48 overflow-hidden">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={testimonialIndex}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.5 }}
                                className="absolute inset-0 flex flex-col justify-center items-center text-center"
                            >
                                <Quote className="w-8 h-8 text-blue-600" />
                                <blockquote className="mt-4 text-xl italic text-gray-700 dark:text-gray-300">
                                    "{testimonials[testimonialIndex].quote}"
                                </blockquote>
                                <cite className="mt-4 block font-semibold not-italic">— {testimonials[testimonialIndex].name}, {testimonials[testimonialIndex].company}</cite>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                    <div className="mt-8 flex justify-center gap-4">
                        <button onClick={() => paginate(-1)} className="p-2 rounded-full bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"><ChevronLeft /></button>
                        <button onClick={() => paginate(1)} className="p-2 rounded-full bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"><ChevronRight /></button>
                    </div>
                </div>
            </motion.section>

            {/* 8. FAQ */}
            <motion.section variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} className="py-20 px-4">
                <SectionTitle>Frequently Asked Questions</SectionTitle>
                <div className="mt-12 max-w-3xl mx-auto flex flex-col gap-4">
                    {faqs.map((faq, index) => (
                        <motion.div key={index} variants={itemVariants} className="border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden">
                            <button onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)} className="w-full flex justify-between items-center p-5 text-left font-semibold">
                                <span>{faq.q}</span>
                                <ChevronRight className={`transition-transform duration-300 ${openFaqIndex === index ? 'rotate-90' : ''}`} />
                            </button>
                            <AnimatePresence>
                                {openFaqIndex === index && (
                                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
                                        <p className="p-5 pt-0 text-gray-600 dark:text-gray-400">{faq.a}</p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>
            </motion.section>
            
            {/* 9. Pricing / Packages */}
            <motion.section
                variants={sectionVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                className="py-20 px-4 bg-gray-50 dark:bg-black/50"
            >
                <div className="max-w-6xl mx-auto text-center">
                    <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white">Flexible Plans for Every Business</h2>
                    <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-300">Choose a package that aligns with your goals or contact us for a custom solution.</p>
                    <div className="mt-16 grid lg:grid-cols-3 gap-8 items-stretch">
                        {/* Starter Plan */}
                        <motion.div variants={itemVariants} className="relative p-8 rounded-2xl bg-white dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 flex flex-col">
                            <h3 className="text-2xl font-semibold">Starter</h3>
                            <p className="mt-4 text-gray-600 dark:text-gray-400">For new businesses ready to make a professional mark.</p>
                            <ul className="mt-8 space-y-4 text-left flex-grow">
                                {growthFeatures.starter.map(f => <li key={f} className="flex items-start gap-3"><Check className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" /><span>{f}</span></li>)}
                            </ul>
                            <Link href="/contact" className="mt-10 block w-full text-center px-6 py-3 rounded-lg font-semibold border border-blue-600 text-blue-600 hover:bg-blue-600/10 dark:hover:bg-blue-900/30 transition-colors">Request a Custom Quote</Link>
                        </motion.div>
                        {/* Growth Plan (Popular) */}
                        <motion.div variants={itemVariants} className="relative p-8 rounded-2xl bg-blue-600 text-white flex flex-col shadow-2xl shadow-blue-600/20">
                             <div className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2">
                                 <span className="inline-flex items-center gap-x-1.5 rounded-full bg-white text-blue-600 px-4 py-1.5 text-sm font-medium">
                                     <Star className="w-4 h-4" /> Most Popular
                                 </span>
                             </div>
                            <h3 className="text-2xl font-semibold">Growth</h3>
                            <p className="mt-4 text-blue-100">For businesses aiming for rapid expansion and market presence.</p>
                            <ul className="mt-8 space-y-4 text-left flex-grow">
                                {growthFeatures.growth.map(f => <li key={f} className="flex items-start gap-3"><Check className="w-5 h-5 text-white flex-shrink-0 mt-1" /><span>{f}</span></li>)}
                            </ul>
                            <Link href="/contact" className="mt-10 block w-full text-center px-6 py-3 rounded-lg font-semibold bg-white text-blue-600 hover:bg-gray-100 transition-colors">Request a Custom Quote</Link>
                        </motion.div>
                        {/* Enterprise Plan */}
                        <motion.div variants={itemVariants} className="relative p-8 rounded-2xl bg-white dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 flex flex-col">
                            <h3 className="text-2xl font-semibold">Enterprise</h3>
                            <p className="mt-4 text-gray-600 dark:text-gray-400">For established businesses seeking a dedicated creative partner.</p>
                            <ul className="mt-8 space-y-4 text-left flex-grow">
                                {growthFeatures.enterprise.map(f => <li key={f} className="flex items-start gap-3"><Check className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" /><span>{f}</span></li>)}
                            </ul>
                            <Link href="/contact" className="mt-10 block w-full text-center px-6 py-3 rounded-lg font-semibold border border-blue-600 text-blue-600 hover:bg-blue-600/10 dark:hover:bg-blue-900/30 transition-colors">Request a Custom Quote</Link>
                        </motion.div>
                    </div>
                </div>
            </motion.section>

            {/* 10. Call-to-Action */}
            <section className="bg-blue-600 text-white">
                <div className="max-w-5xl mx-auto py-20 px-4 text-center">
                    <motion.h2
                      variants={itemVariants}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, amount: 0.5 }}
                      className="text-4xl font-extrabold"
                    >
                      Let’s Create Something Exceptional
                    </motion.h2>
                    <motion.p
                      variants={itemVariants}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, amount: 0.5 }}
                      className="mt-4 max-w-2xl mx-auto text-lg text-blue-100"
                    >
                      Ready to discuss your next project? Reach out and let's start building the future of your brand.
                    </motion.p>
                    <motion.div
                      variants={itemVariants}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, amount: 0.5 }}
                      className="mt-10"
                    >
                      <Link href="/contact" className="bg-white text-blue-600 font-semibold py-3 px-8 rounded-full shadow-lg hover:bg-gray-100 transition-transform transform hover:scale-105 duration-300">
                        Get in Touch
                      </Link>
                    </motion.div>
                </div>
            </section>
        </motion.div>
      </>
    );
}
