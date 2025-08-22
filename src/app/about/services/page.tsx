'use client';

import React from 'react';
// ✅ FIX: Imported `useInView` and `animate` directly from framer-motion
import { motion, Variants, useInView, animate } from "framer-motion";
import { ArrowRight, Code, PenTool, Video, Bot, Check, Star, Target, ShieldCheck, Layers, BrainCircuit, Quote } from "lucide-react";
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

const AnimatedCounter = ({ to, suffix }: { to: number, suffix: string }) => {
    const ref = React.useRef<HTMLSpanElement>(null);
    // ✅ FIX: useInView is now correctly referenced
    const isInView = useInView(ref, { once: true, margin: "-50px" });

    React.useEffect(() => {
        if (isInView && ref.current) {
            // ✅ FIX: `animate` function is now correctly called
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

    return (
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
                className="relative pt-40 pb-24 text-center bg-gray-50 dark:bg-black/50 overflow-hidden"
            >
                <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/10 dark:bg-blue-500/10 rounded-full blur-3xl animate-pulse-slow"></div>
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-500/10 dark:bg-pink-500/10 rounded-full blur-3xl animate-pulse-slow animation-delay-4000"></div>
                <div className="relative z-10 max-w-4xl mx-auto px-4">
                    <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl font-extrabold text-gray-900 dark:text-white">
                        Transform Your Ideas Into Digital Success
                    </motion.h1>
                    <motion.p variants={itemVariants} className="mt-6 text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                        At Aleen Creatives, we deliver premium solutions across web, mobile, design, and marketing that drive real business results.
                    </motion.p>
                    <motion.div variants={itemVariants} className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
                        <Link href="/contact" className="connect-button inline-flex items-center justify-center text-lg">
                            Start Your Project
                        </Link>
                        <Link href="/projects" className="bg-white/10 dark:bg-black/20 backdrop-blur-md text-black dark:text-white font-semibold py-3 px-8 rounded-full shadow-lg hover:bg-white/20 dark:hover:bg-black/30 transition-transform transform hover:scale-105 duration-300 inline-flex items-center justify-center text-lg">
                            See Our Work
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
                className="py-24 px-4"
            >
                <div className="max-w-6xl mx-auto text-center">
                    <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white">What We Do</h2>
                    <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-300">Our expertise spans the full digital spectrum, ensuring a cohesive and powerful brand experience from start to finish.</p>
                    <div className="mt-16 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
                        <motion.div variants={itemVariants} className="flex flex-col items-center gap-3">
                            <Code className="w-10 h-10 text-blue-500" />
                            <span className="font-semibold">Web Development</span>
                        </motion.div>
                        <motion.div variants={itemVariants} className="flex flex-col items-center gap-3">
                            <PenTool className="w-10 h-10 text-blue-500" />
                            <span className="font-semibold">UI/UX Design</span>
                        </motion.div>
                        <motion.div variants={itemVariants} className="flex flex-col items-center gap-3">
                            <Video className="w-10 h-10 text-blue-500" />
                            <span className="font-semibold">Motion Graphics</span>
                        </motion.div>
                        <motion.div variants={itemVariants} className="flex flex-col items-center gap-3">
                            <Target className="w-10 h-10 text-blue-500" />
                            <span className="font-semibold">Digital Marketing</span>
                        </motion.div>
                        <motion.div variants={itemVariants} className="flex flex-col items-center gap-3">
                            <Bot className="w-10 h-10 text-blue-500" />
                            <span className="font-semibold">Consulting</span>
                        </motion.div>
                    </div>
                </div>
            </motion.section>

            {/* 3. Detailed Service Sections */}
            <motion.section
                variants={sectionVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                className="py-24 px-4 bg-gray-50 dark:bg-black/50"
            >
                <div className="max-w-6xl mx-auto text-center">
                    <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white">Explore Our Expertise</h2>
                    <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
                        <motion.div variants={itemVariants} className="p-6 bg-white dark:bg-gray-900 rounded-lg shadow-md">
                            <h3 className="text-xl font-bold">Web & App Development</h3>
                            <p className="mt-2 text-gray-600 dark:text-gray-400">Custom websites and mobile apps that scale, perform, and are designed for engagement and growth.</p>
                        </motion.div>
                        <motion.div variants={itemVariants} className="p-6 bg-white dark:bg-gray-900 rounded-lg shadow-md">
                            <h3 className="text-xl font-bold">UI/UX Design</h3>
                            <p className="mt-2 text-gray-600 dark:text-gray-400">Beautiful, intuitive interfaces that delight users, enhance usability, and drive conversions.</p>
                        </motion.div>
                        <motion.div variants={itemVariants} className="p-6 bg-white dark:bg-gray-900 rounded-lg shadow-md">
                            <h3 className="text-xl font-bold">Motion Graphics</h3>
                            <p className="mt-2 text-gray-600 dark:text-gray-400">Bring your brand to life with captivating animations, from logo reveals to explainer videos.</p>
                        </motion.div>
                        <motion.div variants={itemVariants} className="p-6 bg-white dark:bg-gray-900 rounded-lg shadow-md">
                            <h3 className="text-xl font-bold">Digital Marketing</h3>
                            <p className="mt-2 text-gray-600 dark:text-gray-400">Data-driven strategies to drive traffic, generate qualified leads, and boost your revenue.</p>
                        </motion.div>
                        <motion.div variants={itemVariants} className="p-6 bg-white dark:bg-gray-900 rounded-lg shadow-md">
                            <h3 className="text-xl font-bold">Business Consulting</h3>
                            <p className="mt-2 text-gray-600 dark:text-gray-400">Expert strategy, actionable insights, and clear guidance to accelerate your growth.</p>
                        </motion.div>
                    </div>
                </div>
            </motion.section>

            {/* 4. Pricing / Packages */}
            <motion.section
                variants={sectionVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                className="py-24 px-4"
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
                                {growthFeatures.starter.map(f => <li key={f} className="flex items-start gap-3"><Check className="w-5 h-5 text-blue-500 flex-shrink-0 mt-1" /><span>{f}</span></li>)}
                            </ul>
                            <Link href="/contact" className="mt-10 block w-full text-center px-6 py-3 rounded-lg font-semibold border border-blue-600 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30">Request a Custom Quote</Link>
                        </motion.div>
                        {/* Growth Plan (Popular) */}
                        <motion.div variants={itemVariants} className="relative p-8 rounded-2xl bg-blue-600 text-white flex flex-col shadow-2xl shadow-blue-500/20">
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
                            <Link href="/contact" className="mt-10 block w-full text-center px-6 py-3 rounded-lg font-semibold bg-white text-blue-600 hover:bg-blue-50">Request a Custom Quote</Link>
                        </motion.div>
                        {/* Enterprise Plan */}
                        <motion.div variants={itemVariants} className="relative p-8 rounded-2xl bg-white dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 flex flex-col">
                            <h3 className="text-2xl font-semibold">Enterprise</h3>
                            <p className="mt-4 text-gray-600 dark:text-gray-400">For established businesses seeking a dedicated creative partner.</p>
                            <ul className="mt-8 space-y-4 text-left flex-grow">
                                {growthFeatures.enterprise.map(f => <li key={f} className="flex items-start gap-3"><Check className="w-5 h-5 text-blue-500 flex-shrink-0 mt-1" /><span>{f}</span></li>)}
                            </ul>
                            <Link href="/contact" className="mt-10 block w-full text-center px-6 py-3 rounded-lg font-semibold border border-blue-600 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30">Request a Custom Quote</Link>
                        </motion.div>
                    </div>
                </div>
            </motion.section>

            {/* 5. Why Choose Us */}
            <motion.section
                variants={sectionVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                className="py-24 px-4 bg-gray-50 dark:bg-black/50"
            >
                <div className="max-w-6xl mx-auto text-center">
                    <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white">Why Aleen Creatives</h2>
                    <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-300">We combine innovative solutions, measurable results, and a client-focused approach to deliver unparalleled value.</p>
                    <div className="mt-16 grid grid-cols-2 md:grid-cols-3 gap-8">
                        <motion.div variants={itemVariants} className="text-center">
                            <h3 className="text-5xl font-bold text-blue-500"><AnimatedCounter to={50} suffix="+" /></h3>
                            <p className="mt-2 text-gray-500 dark:text-gray-400">Projects Delivered</p>
                        </motion.div>
                         <motion.div variants={itemVariants} className="text-center">
                            <h3 className="text-5xl font-bold text-blue-500"><AnimatedCounter to={30} suffix="+" /></h3>
                            <p className="mt-2 text-gray-500 dark:text-gray-400">Happy Clients</p>
                        </motion.div>
                         <motion.div variants={itemVariants} className="text-center">
                            <h3 className="text-5xl font-bold text-blue-500"><AnimatedCounter to={7} suffix="+" /></h3>
                            <p className="mt-2 text-gray-500 dark:text-gray-400">Years of Experience</p>
                        </motion.div>
                    </div>
                </div>
            </motion.section>

            {/* 6. Testimonials */}
            <motion.section
                variants={sectionVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                className="py-24 px-4"
            >
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white">Trusted by Industry Leaders</h2>
                    <div className="mt-12">
                        <motion.div variants={itemVariants} className="p-8 bg-gray-50 dark:bg-gray-900/50 rounded-xl">
                            <Quote className="w-8 h-8 mx-auto text-blue-400" />
                            <blockquote className="mt-4 text-xl italic text-gray-700 dark:text-gray-300">
                                "Aleen Creatives is the partner you want on your team. Their dedication to quality and results is evident in everything they do."
                            </blockquote>
                            <cite className="mt-4 block font-semibold not-italic">- Client Name, Company</cite>
                        </motion.div>
                    </div>
                </div>
            </motion.section>

            {/* 7. Call-to-Action */}
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
    );
}
