'use client';

import React, { useState, useEffect } from 'react';
import { motion, Variants, AnimatePresence } from "framer-motion";
import { Phone, Mail, MapPin, Send, CheckCircle, AlertTriangle, Loader } from "lucide-react";

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

type IconProps = { className?: string };
type IconComponent = React.ComponentType<IconProps>;

const ContactInfoItem = ({ icon: Icon, title, value, href }: { icon: IconComponent, title: string, value: string, href?: string }) => (
    <motion.div variants={itemVariants} className="flex items-start gap-4">
        <div className="bg-blue-100 dark:bg-blue-900/50 p-3 rounded-full text-blue-500">
            <Icon className="w-6 h-6" />
        </div>
        <div>
            <h3 className="font-semibold text-gray-800 dark:text-gray-200">{title}</h3>
            {href ? (
                <a href={href} className="text-gray-600 dark:text-gray-400 hover:text-blue-500 transition-colors">{value}</a>
            ) : (
                <p className="text-gray-600 dark:text-gray-400">{value}</p>
            )}
        </div>
    </motion.div>
);

// --- Main Contact Page Component ---
export default function ContactPage() {
    // --- State Management for the Form ---
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    // ✅ UPDATE: Added state for new fields
    const [phone, setPhone] = useState('');
    const [project, setProject] = useState('');
    const [message, setMessage] = useState('');
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

    // ✅ UPDATE: useEffect to handle the 10-second timer
    useEffect(() => {
        if (status === 'success') {
            const timer = setTimeout(() => {
                // Reset form fields and status
                setName('');
                setEmail('');
                setPhone('');
                setProject('');
                setMessage('');
                setStatus('idle');
            }, 10000); // 10 seconds

            // Cleanup the timer if the component unmounts
            return () => clearTimeout(timer);
        }
    }, [status]);


    // --- Async Function to Handle Form Submission ---
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('submitting');

        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                // ✅ UPDATE: Include new fields in the request body
                body: JSON.stringify({ name, email, phone, project, message }),
            });

            if (res.ok) {
                setStatus('success');
            } else {
                throw new Error('Failed to send message.');
            }
        } catch (error) {
            console.error(error);
            setStatus('error');
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-white dark:bg-black"
        >
            {/* --- Hero Section --- */}
            <motion.section
                variants={sectionVariants}
                initial="hidden"
                animate="visible"
                className="relative pt-40 pb-24 text-center bg-gray-50 dark:bg-black/50 overflow-hidden"
            >
                <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 dark:bg-blue-500/10 rounded-full blur-3xl animate-pulse-slow"></div>
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-pink-500/10 dark:bg-pink-500/10 rounded-full blur-3xl animate-pulse-slow animation-delay-4000"></div>
                <div className="relative z-10 max-w-4xl mx-auto px-4">
                    <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl font-extrabold text-gray-900 dark:text-white">
                        Let's Build Something Great Together
                    </motion.h1>
                    <motion.p variants={itemVariants} className="mt-6 text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                        Have a project in mind or just want to say hello? We'd love to hear from you.
                    </motion.p>
                </div>
            </motion.section>

            {/* --- Contact Form & Info Section --- */}
            <motion.section
                variants={sectionVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                className="py-24 px-4"
            >
                <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-start">
                    {/* Left Column: Contact Info */}
                    <motion.div variants={sectionVariants} className="space-y-8">
                        <ContactInfoItem icon={Mail} title="Email Us" value="contact@aleencreatives.com" href="mailto:contact@aleencreatives.com" />
                        <ContactInfoItem icon={Phone} title="Call Us" value="+252 63 322 7084" href="tel:+252633227084" />
                        <ContactInfoItem icon={MapPin} title="Our Office" value="Hargeisa, Somalia" />
                    </motion.div>

                    {/* Right Column: Form */}
                    <motion.div variants={itemVariants} className="bg-gray-50 dark:bg-gray-900/50 p-8 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-800">
                        <AnimatePresence mode="wait">
                            {status === 'success' ? (
                                <motion.div
                                    key="success"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    className="text-center py-12"
                                >
                                    <CheckCircle className="w-16 h-16 mx-auto text-green-500" />
                                    <h3 className="mt-4 text-2xl font-bold text-gray-900 dark:text-white">Thank You!</h3>
                                    <p className="mt-2 text-gray-600 dark:text-gray-300">Your message has been sent. We'll be in touch shortly.</p>
                                </motion.div>
                            ) : (
                                <motion.form
                                    key="form"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    onSubmit={handleSubmit}
                                    className="space-y-6"
                                >
                                    {/* ✅ UPDATE: Form now has 4 input sections */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                        <div>
                                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Name</label>
                                            <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required className="w-full px-4 py-2 rounded-md bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-shadow" />
                                        </div>
                                        <div>
                                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
                                            <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full px-4 py-2 rounded-md bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-shadow" />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                        <div>
                                            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Phone</label>
                                            <input type="tel" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full px-4 py-2 rounded-md bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-shadow" />
                                        </div>
                                        <div>
                                            <label htmlFor="project" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Company / Project</label>
                                            <input type="text" id="project" value={project} onChange={(e) => setProject(e.target.value)} className="w-full px-4 py-2 rounded-md bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-shadow" />
                                        </div>
                                    </div>
                                    <div>
                                        <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Message</label>
                                        <textarea id="message" value={message} onChange={(e) => setMessage(e.target.value)} rows={5} required className="w-full px-4 py-2 rounded-md bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-shadow"></textarea>
                                    </div>
                                    <button type="submit" disabled={status === 'submitting'} className="connect-button w-full inline-flex items-center justify-center text-lg disabled:opacity-50 disabled:cursor-not-allowed">
                                        {status === 'submitting' ? <Loader className="animate-spin w-5 h-5 mr-2" /> : <Send className="ml-2 w-5 h-5" />}
                                        {status === 'submitting' ? 'Sending...' : 'Send Message'}
                                    </button>
                                    {status === 'error' && (
                                        <p className="text-red-500 text-sm mt-2 flex items-center gap-2">
                                            <AlertTriangle className="w-4 h-4" />
                                            Something went wrong. Please try again.
                                        </p>
                                    )}
                                </motion.form>
                            )}
                        </AnimatePresence>
                    </motion.div>
                </div>
            </motion.section>
        </motion.div>
    );
}