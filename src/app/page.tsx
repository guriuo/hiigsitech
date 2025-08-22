'use client';

import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { motion, AnimatePresence, useScroll, useTransform, Variants, animate, useMotionValue } from "framer-motion";
import { ArrowRight, Phone, Mail, MapPin, Smile, Users, Briefcase, Clock, Star, Loader } from "lucide-react";
import Link from 'next/link';
import { client } from '../../sanity/lib/client';
import { urlForImage } from '../../sanity/lib/image';

// --- Type Definitions ---
type Project = {
  _id: string;
  title: string;
  slug: string;
  description: string;
  coverImage: any;
  tags: string[];
};

type PostForHome = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  cover: string;
  tag: string;
  author: string;
  date: string;
};

// --- Animation Variants ---
const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const staggeredItemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

// --- SVG Icons ---
const IconArrowRight = ({ className = "ml-1 w-4 h-4" }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
);
const IconArrowLeft = ({ className = "mr-1 w-4 h-4" }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
);
const IconTrophy = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-yellow-400"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg>;
const IconChevronDown = ({ isOpen }: { isOpen: boolean }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`w-5 h-5 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}><polyline points="6 9 12 15 18 9"></polyline></svg>;
const IconQuote = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 text-blue-300 dark:text-blue-700 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-[-12deg]"><path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 2v6c0 7 4 8 8 8Z"/><path d="M14 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2h-4c-1.25 0-2 .75-2 2v6c0 7 4 8 8 8Z"/></svg>;
const IconLinkedin = () => <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6"><title>LinkedIn</title><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z"/></svg>;
const IconTwitter = () => <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6"><title>X</title><path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.931ZM17.61 20.644h2.039L6.486 3.24H4.298Z"/></svg>;
const IconGithub = () => <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6"><title>GitHub</title><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>;

// --- Reusable Components ---
const CustomIcon = ({ svg, className }: { svg: string, className?: string }) => (
    <div className={className} dangerouslySetInnerHTML={{ __html: svg }} />
);

const AnimatedSection = ({ children, className = '', id = '' }: { children: React.ReactNode, className?: string, id?: string }) => (
    <motion.section
        id={id}
        className={`py-16 sm:py-20 px-4 ${className}`}
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
    >
        {children}
    </motion.section>
);

const WavyUnderline = () => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });
    const pathLength = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]);

    return (
        <svg ref={ref} className="w-48 h-4 -mt-2" viewBox="0 0 200 15" fill="none" xmlns="http://www.w3.org/2000/svg">
            <motion.path
                d="M2 10.5C28.4615 3.5 106.639 -5.5 198 10.5"
                stroke="url(#paint0_linear_1_2)"
                strokeWidth="4"
                strokeLinecap="round"
                style={{ pathLength }}
            />
            <defs>
                <linearGradient id="paint0_linear_1_2" x1="100" y1="2" x2="100" y2="13" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#3B82F6"/>
                    <stop offset="1" stopColor="#2563EB"/>
                </linearGradient>
            </defs>
        </svg>
    );
};

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
    <div className="flex flex-col items-center">
        <motion.h2
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5 }}
        >
            {children}
        </motion.h2>
        <WavyUnderline />
    </div>
);

const SectionSubtitle = ({ children }: { children: React.ReactNode }) => (
   <motion.p
        className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto text-center mt-4"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.5, delay: 0.1 }}
    >
        {children}
    </motion.p>
);

const Particles = ({ count = 50, theme }: { count?: number, theme: string }) => {
  const mesh = useRef<THREE.InstancedMesh>(null!);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const t = Math.random() * 100;
      const factor = 10 + Math.random() * 20;
      const speed = 0.002 + Math.random() / 400;
      const edge = Math.floor(Math.random() * 4);
      let x = 0, y = 0, z = -20 + Math.random() * 40;
      switch(edge){
        case 0: x = -50; y = -50 + Math.random()*100; break;
        case 1: x = 50; y = -50 + Math.random()*100; break;
        case 2: x = -50 + Math.random()*100; y = -50; break;
        case 3: x = -50 + Math.random()*100; y = 50; break;
      }
      temp.push({ t, factor, speed, x, y, z });
    }
    return temp;
  }, [count]);

  useFrame((state) => {
    const mouseX = state.mouse.x * state.viewport.width / 2;
    const mouseY = state.mouse.y * state.viewport.height / 2;
    particles.forEach((p, i) => {
      let hoverMultiplier = 1;
      const distance = Math.hypot(mouseX - p.x, mouseY - p.y);
      if (distance < 5) hoverMultiplier = 1 + (1 - distance / 5) * 4;
      p.t += p.speed * hoverMultiplier;
      const centerPull = 0.01;
      const decay = 0.002;
      p.x += (Math.cos(p.t/10 * p.factor)) * 0.05 - centerPull*(p.x/50) - decay*(Math.random()-0.5);
      p.y += (Math.sin(p.t/10 * p.factor)) * 0.05 - centerPull*(p.y/50) - decay*(Math.random()-0.5);
      p.z += Math.sin(p.t/20) * 0.02;
      const s = 0.5 + Math.abs(Math.sin(p.t)) * 0.8;
      dummy.position.set(p.x, p.y, p.z);
      dummy.scale.set(s, s, s);
      dummy.rotation.set(s * 2, s * 2, s * 2);
      dummy.updateMatrix();
      mesh.current.setMatrixAt(i, dummy.matrix);
    });
    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
      <boxGeometry args={[1,1,1]} />
      <meshStandardMaterial color={theme === 'dark' ? '#ffffff' : '#000000'} roughness={0.3} />
    </instancedMesh>
  );
};

const LogoCloud = () => {
    const logos = [ 'Dahabshiil', 'Somtel', 'Hormuud', 'Ethio Telecom', 'Awash Bank', 'Al Gamil', 'Premem Bank', 'CBEBank', 'Taaj', 'IBS Bank', 'MyBank', 'Kaah Bank', 'Dara Salaam', 'Golis Telcom', 'Netco Telecom', 'Telcom Somalia', 'SkyNet', 'SomCable', 'Kaah Power', 'Somali Energy', 'PowerGen', 'Sahal Energy', 'Jubba Airways', 'Daallo Airlines', 'Somali Airlines', 'Freedom Air', 'Mogadishu Port', 'Berbera Port', 'Bosaaso Port', 'Mogadishu Freezone', 'Banadir Port', 'Somali Shipping', 'Hodan Group', 'Hilaac Group', 'Global Tech', 'Tayo Builders', 'Safari Group', 'Hafun Fishing', 'Hormuud Milk', 'Towfiiq Dairy', 'Shabelle Water', 'Juba Juice', 'Ethiopian Airlines'];
    return (
        <div className="py-12 bg-white dark:bg-black">
            <motion.div
                className="max-w-7xl mx-auto text-center px-4"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5 }}
            >
                <p className="text-sm text-gray-500 dark:text-gray-400">We’ve collaborated with industry leaders and top regional brands.</p>
                <div className="mt-8 relative w-full overflow-hidden">
                    <div className="flex animate-marquee">
                        {logos.concat(logos).map((logo, index) => (
                            <div key={index} className="flex-shrink-0 w-40 sm:w-48 mx-4 sm:mx-6 flex items-center justify-center">
                                <span className="text-xl sm:text-2xl font-bold text-gray-400 dark:text-gray-600 grayscale hover:grayscale-0 transition-all duration-300">{logo}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

const ServicesSection = () => {
    const cardsData = [
      { title: "Web Development", icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>`, desc: "Building high-performance, scalable websites that deliver exceptional user experiences and drive results." },
      { title: "App Development", icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect><line x1="12" y1="18" x2="12.01" y2="18"></line></svg>`, desc: "Creating powerful mobile and desktop applications tailored to your unique vision and audience needs." },
      { title: "UI/UX Design", icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5h9M3 12h9M3 19h9M5 5l14 14"/></svg>`, desc: "Designing intuitive, beautiful interfaces that keep users engaged and coming back for more." },
      { title: "Branding", icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 17.5L3 6V3h3l11.5 11.5"/><path d="M12 2.5L21.5 12"/></svg>`, desc: "Building memorable brand identities that reflect your core values and capture your audience’s attention." },
      { title: "Digital Marketing", icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10z"/><path d="M12 12v6a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2h-4v-2"/></svg>`, desc: "Crafting targeted strategies that attract, nurture, and convert your ideal customers into loyal fans." },
      { title: "Consulting", icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>`, desc: "Expert advice and data-driven strategies to solve challenges, unlock growth, and optimize operations." },
      { title: "Motion Graphics", icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>`, desc: "Engaging animations and visual effects for logos, apps, and brand promos that capture attention." },
      { title: "Copywriting", icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19l7-7 3 3-7 7-3-3z"></path><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"></path><path d="M2 2l7.586 7.586"></path><circle cx="11" cy="11" r="2"></circle></svg>`, desc: "Compelling copy that tells your story, connects with your audience, and drives action." },
    ];

    return (
        <AnimatedSection id="services">
            <SectionTitle>What We Do</SectionTitle>
            <SectionSubtitle>Our expertise blends creativity, technology, and strategy to deliver solutions that don’t just look great — they perform.</SectionSubtitle>
            <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 p-4 mt-12"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                transition={{ staggerChildren: 0.1 }}
            >
                {cardsData.map((card, index) => (
                    <motion.div
                        key={index}
                        className="relative group h-full"
                        variants={staggeredItemVariants}
                    >
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-700 to-blue-500 rounded-lg blur opacity-0 group-hover:opacity-80 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
                        <div className="relative p-6 bg-white dark:bg-gray-900/80 backdrop-blur-sm rounded-2xl shadow-lg h-full flex flex-col justify-start transition-transform duration-300 group-hover:-translate-y-2">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="p-3 rounded-full bg-blue-600/10"><CustomIcon svg={card.icon} className="w-6 h-6 text-blue-600 transition-transform duration-500 group-hover:scale-110" /></div>
                                <h3 className="text-xl font-extrabold text-gray-900 dark:text-white">{card.title}</h3>
                            </div>
                            <div><p className="text-sm text-gray-600 dark:text-gray-300">{card.desc}</p></div>
                        </div>
                    </motion.div>
                ))}
            </motion.div>
        </AnimatedSection>
    );
};

const PortfolioSection = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 2;
    const totalPages = projects.length > 0 ? Math.ceil(projects.length / itemsPerPage) : 1;

    useEffect(() => {
        const fetchProjects = async () => {
            setIsLoading(true);
            const query = `*[_type == "project"] | order(_createdAt desc)[0...6] { _id, title, "slug": slug.current, "description": excerpt, coverImage, "tags": [category] }`;
            const fetchedProjects = await client.fetch<Project[]>(query);
            setProjects(fetchedProjects);
            setIsLoading(false);
        };
        fetchProjects();
    }, []);

    useEffect(() => {
        if (!isLoading && projects.length > itemsPerPage) {
            const timer = setInterval(() => {
                setCurrentPage((prev) => (prev + 1) % totalPages);
            }, 6000);
            return () => clearInterval(timer);
        }
    }, [isLoading, projects.length, totalPages]);

    return (
        <AnimatedSection id="projects" className="bg-gray-50 dark:bg-black/50">
            <SectionTitle>Our Latest Projects</SectionTitle>
            <SectionSubtitle>We transform ideas into exceptional digital products. Here’s a glimpse of our craft.</SectionSubtitle>
            <div className="max-w-6xl mx-auto mt-16">
                <div className="relative overflow-hidden min-h-[500px]">
                    {isLoading ? (
                        <p className="text-center text-gray-500 dark:text-gray-400">Loading projects...</p>
                    ) : (
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentPage}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -30 }}
                                transition={{ duration: 0.6 }}
                                className="grid grid-cols-1 md:grid-cols-2 gap-10"
                            >
                                {projects.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage).map((project) => {
                                    const imageUrl = project.coverImage && project.coverImage.asset
                                        ? urlForImage(project.coverImage).width(800).height(640).url()
                                        : 'https://placehold.co/800x640/eee/333?text=Image+Not+Available';

                                    return (
                                        <motion.div
                                            key={project._id}
                                            whileHover={{ y: -8 }}
                                            transition={{ type: "spring", stiffness: 200 }}
                                            className="relative group rounded-2xl overflow-hidden bg-white dark:bg-gray-900/50 shadow-lg flex flex-col"
                                        >
                                            <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-blue-600 transition-all duration-300 pointer-events-none"></div>
                                            <div className="relative rounded-t-xl overflow-hidden">
                                                <img 
                                                  src={imageUrl}
                                                  alt={project.title} 
                                                  className="w-full h-64 object-cover transform group-hover:scale-105 transition-transform duration-500"
                                                />
                                            </div>
                                            <div className="p-6 flex flex-col flex-grow">
                                                <div className="flex gap-2 mb-3">
                                                    {project.tags.map(tag => <span key={tag} className="text-xs font-semibold bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-300 px-2 py-1 rounded-full">{tag}</span>)}
                                                </div>
                                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{project.title}</h3>
                                                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 flex-grow">{project.description}</p>
                                                <Link 
                                                    href={`/projects/${project.slug}`}
                                                    className="connect-button group/btn mt-4 inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium w-fit"
                                                >
                                                    View Project
                                                    <IconArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-0.5" />
                                                </Link>
                                            </div>
                                        </motion.div>
                                    );
                                })}
                            </motion.div>
                        </AnimatePresence>
                    )}
                </div>
                {projects.length > itemsPerPage && (
                    <div className="flex items-center justify-center mt-12 gap-6">
                        <button onClick={() => setCurrentPage((currentPage - 1 + totalPages) % totalPages)} className="p-2 rounded-full bg-white/80 dark:bg-black/50 backdrop-blur-md shadow-lg hover:scale-110 transition-transform"><IconArrowLeft className="w-6 h-6 mr-0" /></button>
                        <div className="flex items-center gap-3">
                            {Array.from({ length: totalPages }).map((_, i) => (
                                <button key={i} onClick={() => setCurrentPage(i)} className={`h-2 rounded-full bg-blue-600 transition-all duration-300 ${i === currentPage ? 'w-8' : 'w-2 hover:bg-blue-500'}`} />
                            ))}
                        </div>
                        <button onClick={() => setCurrentPage((currentPage + 1) % totalPages)} className="p-2 rounded-full bg-white/80 dark:bg-black/50 backdrop-blur-md shadow-lg hover:scale-110 transition-transform"><IconArrowRight className="w-6 h-6 ml-0" /></button>
                    </div>
                )}
            </div>
        </AnimatedSection>
    );
};


const AnimatedCounter = ({ value }: { value: number }) => {
    const count = useMotionValue(0);
    const rounded = useTransform(count, (latest) => Math.round(latest));
    
    useEffect(() => {
        const animation = animate(count, value, {
            duration: 2.5,
            ease: "easeOut",
        });
        return animation.stop;
    }, [value, count]);

    return <motion.span>{rounded}</motion.span>;
};

const StatsSection = () => {
    const stats = [
        { icon: <Briefcase/>, value: 50, label: "Projects Completed", suffix: '+' },
        { icon: <Smile/>, value: 30, label: "Happy Clients", suffix: '+' },
        { icon: <MapPin/>, value: 5, label: "Countries Served", suffix: '+' },
        { icon: <Clock/>, textValue: "24/7", label: "Support" },
        { icon: <Users/>, value: 120, label: "Users Reached", suffix: 'M+' },
        { icon: <Star/>, value: 95, label: "Client Satisfaction", suffix: '%' },
    ];
    return (
        <AnimatedSection>
            <motion.div
                className="max-w-6xl mx-auto p-8 bg-white dark:bg-gray-900/50 rounded-2xl shadow-lg"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
                variants={sectionVariants}
                transition={{ staggerChildren: 0.2 }}
            >
                <div className="grid grid-cols-2 md:grid-cols-3 gap-8 text-center">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            className="flex flex-col items-center"
                            variants={staggeredItemVariants}
                        >
                            <div className="text-blue-600 w-12 h-12 mx-auto mb-4">{React.cloneElement(stat.icon, { className: "w-full h-full" })}</div>
                            <h3 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
                                {stat.value ? <AnimatedCounter value={stat.value} /> : stat.textValue}
                                {stat.suffix && <span className="text-blue-600">{stat.suffix}</span>}
                            </h3>
                            <p className="text-gray-500 dark:text-gray-400 mt-2">{stat.label}</p>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </AnimatedSection>
    );
};


const TestimonialsSection = () => {
    const testimonials = [
        { name: 'Ayaan Hirsi', role: 'Founder, HantiKaab', tag: 'Fintech', quote: 'Their team transformed our vision into a reality. The final product exceeded all our expectations!', image: 'https://placehold.co/100x100/4f46e5/ffffff?text=AH' },
        { name: 'Omar Hassan', role: 'CEO, GuriUp', tag: 'Real Estate', quote: 'A truly professional and dedicated partner. They delivered on time and provided invaluable strategic insights.', image: 'https://placehold.co/100x100/059669/ffffff?text=OH' },
        { name: 'Fatxi Ahmed', role: 'Product Manager, ArdayKaab', tag: 'EdTech', quote: 'The UI/UX design they created is simply stunning. Our user engagement has skyrocketed since the launch.', image: 'https://placehold.co/100x100/db2777/ffffff?text=FA' },
        { name: 'Liban Yusuf', role: 'Startup Founder', tag: 'E-commerce', quote: 'Working with them was a seamless experience. Their communication and project management are top-notch.', image: 'https://placehold.co/100x100/d97706/ffffff?text=LY' },
        { name: 'Sahra Mohamed', role: 'Marketing Director', tag: 'HealthTech', quote: 'They don’t just build apps; they build brands. Their strategic approach was a game-changer for us.', image: 'https://placehold.co/100x100/6d28d9/ffffff?text=SM' }
    ];
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isMobile, setIsMobile] = useState(false);
    
    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const itemsPerPage = isMobile ? 1 : 2;
    const totalPages = Math.ceil(testimonials.length / itemsPerPage);

    const next = () => setCurrentIndex((prev) => (prev + 1) % totalPages);
    const prev = () => setCurrentIndex((prev) => (prev - 1 + totalPages + totalPages) % totalPages);

    useEffect(() => {
        const timer = setInterval(() => {
            next();
        }, 5000); 
        return () => clearInterval(timer);
    }, []);

    return (
        <AnimatedSection id="testimonials">
            <SectionTitle>What Our Clients Say</SectionTitle>
            <div className="max-w-4xl mx-auto mt-12 p-4 sm:p-6 bg-gray-50 dark:bg-gray-900/50 rounded-2xl shadow-inner">
                <div className="relative overflow-hidden min-h-[360px] flex items-center">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentIndex}
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -50 }}
                            transition={{ duration: 0.5 }}
                            className="w-full grid grid-cols-1 md:grid-cols-2 gap-6"
                        >
                            {testimonials.slice(currentIndex * itemsPerPage, (currentIndex + 1) * itemsPerPage).map((t) => (
                                <div key={t.name} className="relative group p-1 rounded-2xl overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                    <div className="relative bg-white dark:bg-gray-900 backdrop-blur-sm rounded-xl p-6 h-full transition-transform duration-500 group-hover:-translate-y-1 shadow-lg">
                                        <IconQuote />
                                        <blockquote className="mt-3 text-sm sm:text-base text-gray-700 dark:text-gray-300 font-serif italic">
                                            “{t.quote}”
                                        </blockquote>
                                        <div className="mt-4 flex items-center gap-3">
                                            <img src={t.image} alt={t.name} className="w-12 h-12 rounded-full object-cover border-2 border-blue-200 dark:border-blue-800"/>
                                            <div>
                                                <cite className="text-sm font-bold text-gray-900 dark:text-white not-italic">{t.name}</cite>
                                                <p className="text-xs text-gray-500 dark:text-gray-400">{t.role}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </motion.div>
                    </AnimatePresence>
                </div>
                <div className="flex items-center justify-center mt-8">
                    <button onClick={prev} className="p-2 rounded-full bg-white dark:bg-black/50 backdrop-blur-md shadow-lg hover:scale-110 transition-transform"><IconArrowLeft className="w-5 h-5" /></button>
                    <div className="flex items-center gap-2 mx-4">
                        {Array.from({ length: totalPages }).map((_, i) => (
                            <button key={i} onClick={() => setCurrentIndex(i)} className={`h-2 rounded-full bg-blue-600 transition-all duration-300 ${i === currentIndex ? 'w-6' : 'w-2 hover:bg-blue-500'}`} />
                        ))}
                    </div>
                    <button onClick={next} className="p-2 rounded-full bg-white dark:bg-black/50 backdrop-blur-md shadow-lg hover:scale-110 transition-transform"><IconArrowRight className="w-5 h-5" /></button>
                </div>
            </div>
        </AnimatedSection>
    );
};

const SpecialSection = ({id}: {id: string}) => {
    const pillars = [
        { title: "Smart Solutions, Lasting Impact" }, { title: "Insightful Design, Seamless Experience" },
        { title: "Tech-Forward Development, Reliable Delivery" }, { title: "Visual Storytelling, Memorable Branding" },
        { title: "Strategy-Driven Marketing, Real Growth" }, { title: "Expert Guidance, Hands-On Support" }
    ];
    return(
        <AnimatedSection id={id} className="bg-gray-50 dark:bg-black/50">
            <SectionTitle>What Makes Us Special</SectionTitle>
            <SectionSubtitle>We combine creativity, technology, and strategy to deliver results that set us apart in the digital world.</SectionSubtitle>
            <motion.div
                className="mt-12 max-w-5xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-6"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                transition={{ staggerChildren: 0.1 }}
            >
                {pillars.map(pillar => (
                    <motion.div
                        key={pillar.title}
                        className="flex items-center space-x-4 p-4 bg-white dark:bg-gray-900/80 rounded-xl shadow-md"
                        variants={staggeredItemVariants}
                    >
                       <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-blue-600 flex-shrink-0"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                        <h3 className="font-semibold text-gray-800 dark:text-gray-200">{pillar.title}</h3>
                    </motion.div>
                ))}
            </motion.div>
        </AnimatedSection>
    )
}

const FAQSection = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(0);
    const faqs = [
        { q: "How long does a project usually take?", a: "Most projects take 4–12 weeks, depending on scope and complexity. We provide a detailed timeline after our initial discovery phase." },
        { q: "Do you offer post-launch support?", a: "Yes — ongoing maintenance, updates, and support are part of our packages to ensure your digital product remains secure and performs optimally." },
        { q: "Can you work with international clients?", a: "Absolutely. We collaborate with clients remotely across all time zones, using modern tools to ensure seamless communication and project management." },
        { q: "What is your development process like?", a: "We follow an agile methodology, which involves discovery, design, development, and deployment phases, with regular check-ins and feedback loops to keep you involved." },
        { q: "How do you handle project pricing?", a: "We offer both fixed-price quotes for well-defined scopes and flexible hourly rates for ongoing work. All pricing is transparent and agreed upon before any work begins." },
        { q: "What technologies do you specialize in?", a: "We specialize in modern frameworks like React, Next.js, and Node.js, but are flexible and choose the best technology for the project's needs." },
    ];

    return (
        <AnimatedSection id="faq" className="bg-gray-50 dark:bg-black/50">
            <SectionTitle>Frequently Asked Questions</SectionTitle>
            <motion.div
                className="mt-12 max-w-3xl mx-auto flex flex-col gap-4"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                transition={{ staggerChildren: 0.1 }}
            >
                {faqs.map((faq, index) => (
                    <motion.div
                        key={index}
                        className="border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden"
                        variants={staggeredItemVariants}
                    >
                        <button onClick={() => setOpenIndex(openIndex === index ? null : index)} className="w-full flex justify-between items-center p-5 text-left font-semibold text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-900/50 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors">
                            <span>{faq.q}</span>
                            <IconChevronDown isOpen={openIndex === index} />
                        </button>
                        <AnimatePresence>
                            {openIndex === index && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                                    className="overflow-hidden"
                                >
                                    <p className="p-5 pt-0 text-gray-600 dark:text-gray-400">{faq.a}</p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                ))}
            </motion.div>
        </AnimatedSection>
    );
};

const BlogCard = ({ post }: { post: PostForHome }) => {
    return (
        <div className="relative group flex flex-col h-full overflow-hidden rounded-2xl bg-white border border-slate-200 dark:border-slate-800 shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
            <div className="relative z-10 flex flex-col h-full bg-white dark:bg-gray-900 rounded-2xl">
                <Link href={`/blog/${post.slug}`} className="group/img relative h-48 w-full overflow-hidden rounded-t-2xl">
                    <img src={post.cover} alt={post.title} className="h-full w-full object-cover transition-transform duration-500 group-hover/img:scale-105" />
                    <span className="absolute left-4 top-4 inline-flex items-center rounded-full bg-white/80 dark:bg-black/60 px-3 py-1 text-sm font-semibold text-slate-800 dark:text-slate-200 backdrop-blur-sm">
                        {post.tag}
                    </span>
                </Link>

                <div className="flex flex-col flex-grow p-6">
                    <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 line-clamp-2">
                        <Link href={`/blog/${post.slug}`} className="hover:text-blue-600 transition-colors">
                            {post.title}
                        </Link>
                    </h3>
                    
                    <p className="mt-2 text-base text-slate-600 dark:text-slate-400 flex-grow line-clamp-3">
                        {post.excerpt}
                    </p>
                    
                    <div className="mt-6 flex items-center gap-4 border-t border-slate-200 dark:border-slate-700 pt-5">
                        <img src={`https://i.pravatar.cc/40?u=${post.author}`} alt={post.author} className="w-10 h-10 rounded-full object-cover"/>
                        <div>
                            <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">{post.author}</p>
                            <p className="text-xs text-slate-500 dark:text-slate-400">{post.date}</p>
                        </div>
                        
                        <Link href={`/blog/${post.slug}`} className="group ml-auto text-sm font-semibold text-blue-600 hover:text-blue-800 transition-colors flex items-center gap-1">
                            Read More
                            <IconArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

const BlogSection = ({ posts, isLoading }: { posts: PostForHome[], isLoading: boolean }) => (
    <AnimatedSection id="blog">
        <SectionTitle>Insights & Ideas</SectionTitle>
        <SectionSubtitle>We share tips, strategies, and deep dives to help you stay ahead in the digital world.</SectionSubtitle>
        <motion.div
            className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            transition={{ staggerChildren: 0.15 }}
        >
            {isLoading ? (
                <p className="text-center text-gray-500 dark:text-gray-400 col-span-full">Loading latest posts...</p>
            ) : posts.length > 0 ? (
                posts.map((p) => (
                    <motion.div key={p.id} variants={staggeredItemVariants}>
                        <BlogCard post={p} />
                    </motion.div>
                ))
            ) : (
                <p className="text-center text-gray-500 dark:text-gray-400 col-span-full">
                    No recent blog posts found. Please check back later.
                </p>
            )}
        </motion.div>
        <div className="mt-16 text-center">
            <Link 
                href="/blog" 
                className="inline-block text-white font-bold py-4 px-8 rounded-full bg-blue-600 hover:bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 background-animate transition-all duration-300 hover:scale-105 shadow-lg"
            >
                View All Posts
            </Link>
        </div>
    </AnimatedSection>
);

// ===== CONTACT SECTION - UPDATED WITH DYNAMIC FORM LOGIC =====
const ContactSection = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [project, setProject] = useState('');
    const [message, setMessage] = useState('');
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('submitting');

        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, project, message }),
            });

            if (res.ok) {
                setStatus('success');
            } else {
                throw new Error('Submission failed');
            }
        } catch (error) {
            console.error(error);
            setStatus('error');
        }
    };
    
    return (
        <AnimatedSection id="contact" className="bg-gray-50 dark:bg-black/50">
            <SectionTitle>Start Your Project Today</SectionTitle>
            <SectionSubtitle>Share your idea and we’ll craft a plan that turns it into a reality.</SectionSubtitle>
            <div className="mt-12 max-w-5xl mx-auto grid lg:grid-cols-2 gap-12 items-stretch">
                <motion.div
                    className="space-y-6 p-8 bg-white dark:bg-gray-900/80 rounded-2xl shadow-lg flex flex-col"
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.6 }}
                >
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Contact Information</h3>
                    <p className="text-gray-600 dark:text-gray-300">Find us here. We're eager to hear about your next big idea.</p>
                    <div className="space-y-4 flex-grow">
                        <a href="tel:+252633227084" className="flex items-center gap-4 group">
                            <Phone className="w-5 h-5 text-blue-600"/>
                            <span className="text-gray-700 dark:text-gray-200 group-hover:text-blue-600 transition-colors">+252 63 322 7084</span>
                        </a>
                        <a href="mailto:contact@aleencreatives.com" className="flex items-center gap-4 group">
                            <Mail className="w-5 h-5 text-blue-600"/>
                            <span className="text-gray-700 dark:text-gray-200 group-hover:text-blue-600 transition-colors">contact@aleencreatives.com</span>
                        </a>
                        <div className="flex items-center gap-4">
                            <MapPin className="w-5 h-5 text-blue-600"/>
                            <span className="text-gray-700 dark:text-gray-200">Hargeisa, Somalia</span>
                        </div>
                    </div>
                    <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
                        <h4 className="font-semibold text-gray-800 dark:text-gray-200">Follow Us</h4>
                        <div className="mt-4 flex space-x-4 text-gray-500 dark:text-gray-400">
                            <a href="#" className="hover:text-blue-600"><IconLinkedin /></a>
                            <a href="#" className="hover:text-blue-600"><IconTwitter /></a>
                            <a href="#" className="hover:text-blue-600"><IconGithub /></a>
                        </div>
                    </div>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.6 }}
                >
                {status === 'success' ? (
                    <div className="text-center p-8 bg-white dark:bg-gray-900/80 rounded-2xl shadow-lg h-full flex flex-col justify-center items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-16 h-16 mx-auto text-green-500" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                        <h3 className="mt-4 text-2xl font-bold text-gray-900 dark:text-white">Thank You!</h3>
                        <p className="mt-2 text-gray-600 dark:text-gray-300">Your message has been sent. We'll be in touch shortly.</p>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-6 p-8 bg-white dark:bg-gray-900/80 rounded-2xl shadow-lg h-full">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Name</label>
                                <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required className="w-full px-4 py-2 rounded-md bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none transition-shadow" />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
                                <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full px-4 py-2 rounded-md bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none transition-shadow" />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="project" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Company / Project</label>
                            <input type="text" id="project" value={project} onChange={(e) => setProject(e.target.value)} className="w-full px-4 py-2 rounded-md bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none transition-shadow" />
                        </div>
                        <div>
                            <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Message / Goals</label>
                            <textarea id="message" value={message} onChange={(e) => setMessage(e.target.value)} rows={4} required className="w-full px-4 py-2 rounded-md bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none transition-shadow"></textarea>
                        </div>
                        <button type="submit" disabled={status === 'submitting'} className="w-full inline-flex items-center justify-center bg-blue-600 text-white font-semibold py-3 px-8 rounded-full shadow-lg hover:bg-blue-700 transition-transform transform hover:scale-105 duration-300 disabled:opacity-50 disabled:cursor-not-allowed">
                             {status === 'submitting' ? <Loader className="animate-spin w-5 h-5 mr-3" /> : null}
                             {status === 'submitting' ? 'Sending...' : 'Send Message'}
                        </button>
                         {status === 'error' && <p className="text-red-500 text-sm mt-2">Something went wrong. Please try again.</p>}
                    </form>
                )}
                </motion.div>
            </div>
        </AnimatedSection>
    );
};


// --- MAIN PAGE COMPONENT ---
export default function Home() {
  const [theme, setTheme] = useState<'dark' | 'light'>('light');
  const [isClient, setIsClient] = useState(false);
  const [posts, setPosts] = useState<PostForHome[]>([]);
  const [isLoadingPosts, setIsLoadingPosts] = useState(true);

  useEffect(() => {
    setIsClient(true);
    const savedTheme = localStorage.getItem('theme') as 'dark' | 'light' || 'light';
    setTheme(savedTheme);
  }, []);
  
  useEffect(() => {
    const fetchPosts = async () => {
        setIsLoadingPosts(true);
        try {
            const query = `*[_type == "post"]{
                _id, title, "slug": slug.current, coverImage, "author": author->name, tags, publishedAt, excerpt
            } | order(publishedAt desc)[0...3]`;

            const sanityPosts = await client.fetch(query);

            const processedPosts: PostForHome[] = sanityPosts.map((post: any) => ({
                id: post._id,
                title: post.title,
                slug: post.slug,
                cover: post.coverImage && post.coverImage.asset
                    ? urlForImage(post.coverImage).width(800).height(50_0).url()
                    : 'https://placehold.co/800x500',
                author: post.author || 'Admin',
                tag: post.tags?.[0] || 'General',
                date: new Date(post.publishedAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                }),
                excerpt: post.excerpt,
            }));
            
            setPosts(processedPosts);
        } catch (error) {
            console.error("Failed to fetch blog posts:", error);
            setPosts([]);
        } finally {
            setIsLoadingPosts(false);
        }
    };

    fetchPosts();
  }, []);

  return (
    <>
    <motion.div
        className={`bg-white dark:bg-black text-gray-800 dark:text-gray-200 overflow-x-hidden`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* --- HERO SECTION --- */}
      <div className={`relative min-h-screen w-full`}>
        {/* Decorative Blobs */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-pink-500/30 dark:bg-pink-500/20 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute top-0 right-0 w-80 h-80 bg-green-500/30 dark:bg-green-500/20 rounded-full blur-3xl animate-pulse-slow animation-delay-2000"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-500/30 dark:bg-purple-500/20 rounded-full blur-3xl animate-pulse-slow animation-delay-4000"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/30 dark:bg-blue-600/20 rounded-full blur-3xl animate-pulse-slow animation-delay-6000"></div>
        
        {isClient && (
            <div className="absolute inset-0 z-0 filter blur-sm">
            <Canvas camera={{ fov: 100, position: [0, 0, 30] }}>
                <ambientLight intensity={theme === 'dark' ? 0.8 : 0.5} />
                <pointLight position={[10,10,10]} intensity={theme === 'dark' ? 1.5 : 1} />
                <Particles count={50} theme={theme} />
            </Canvas>
            </div>
        )}

        <div className="relative z-10 flex flex-col min-h-screen">
          <main className="flex-grow flex flex-col items-center justify-center text-center px-4 pb-12 pt-20">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
                <div className="flex items-center gap-2 bg-white/80 dark:bg-black/50 backdrop-blur-md py-2 px-4 rounded-full shadow-md border border-gray-200 dark:border-gray-800">
                    <IconTrophy />
                    <span className="font-semibold text-xs sm:text-sm text-gray-800 dark:text-gray-200">#1 in Tech Innovation</span>
                </div>
                <div className="flex items-center gap-2 bg-white/80 dark:bg-black/50 backdrop-blur-md py-2 px-4 rounded-full shadow-md border border-gray-200 dark:border-gray-800">
                    <div className="flex -space-x-2 overflow-hidden">
                        <img className="inline-block h-6 w-6 rounded-full ring-2 ring-white dark:ring-black" src="https://i.pravatar.cc/40?img=1" alt=""/>
                        <img className="inline-block h-6 w-6 rounded-full ring-2 ring-white dark:ring-black" src="https://i.pravatar.cc/40?img=2" alt=""/>
                        <img className="inline-block h-6 w-6 rounded-full ring-2 ring-white dark:ring-black" src="https://i.pravatar.cc/40?img=3" alt=""/>
                        <div className="h-6 w-6 rounded-full ring-2 ring-white dark:ring-black bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-xs font-bold text-gray-600 dark:text-gray-300">+</div>
                    </div>
                    <span className="font-semibold text-xs sm:text-sm text-gray-800 dark:text-gray-200">Trusted by 10k+ people</span>
                </div>
            </div>
            
            <h1 className={`text-4xl leading-tight sm:text-5xl md:text-6xl font-extrabold tracking-tight text-gray-900 dark:text-white`}>
              We Build Digital Experiences That Drive Results
            </h1>
            
            <p className={`mt-4 max-w-3xl mx-auto text-base sm:text-lg text-gray-700 dark:text-gray-300`}>From concept to code, we craft websites, apps, and brands that leave a lasting impact.</p>
            
            <div className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-4 w-full max-w-xs sm:max-w-none">
              <a href="#contact" className="w-full sm:w-auto flex items-center justify-center bg-blue-600 text-white font-semibold py-3 px-8 rounded-full shadow-lg hover:bg-blue-700 transition-transform transform hover:scale-105 duration-300">
                Start Your Project <IconArrowRight />
              </a>
              <a href="#projects" className="w-full sm:w-auto bg-white/10 dark:bg-black/20 backdrop-blur-md text-black dark:text-white font-semibold py-3 px-8 rounded-full shadow-lg hover:bg-white/20 dark:hover:bg-black/30 transition-transform transform hover:scale-105 duration-300">
                See Our Work
              </a>
            </div>
          </main>
        </div>
      </div>

      {/* --- ALL OTHER SECTIONS --- */}
      <LogoCloud />
      <ServicesSection />
      <PortfolioSection />
      <SpecialSection id="about" />
      <StatsSection />
      <TestimonialsSection />
      <BlogSection posts={posts} isLoading={isLoadingPosts} />
      <FAQSection />
      <ContactSection />
    </motion.div>
    </>
  );
}