'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { ArrowRight, Briefcase, MapPin, Clock, DollarSign, BrainCircuit, Coffee, X, UploadCloud, User, Mail, Phone, Loader, Check } from 'lucide-react';

// --- Type Definitions ---
type Job = {
  title: string;
  location: string;
  type: string;
};

type Benefit = {
  icon: React.ElementType;
  title: string;
  description: string;
};

// --- Animation Variants (to match your main page) ---
const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut", staggerChildren: 0.15 }
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

// --- Sub-Components ---

const JobCard = ({ title, location, type, onApply }: { title: string, location: string, type: string, onApply: (job: Job) => void }) => (
    <motion.div
      variants={itemVariants}
      whileHover={{ scale: 1.05, z: 20 }}
      // This creates the 3D tilt effect on hover
      style={{ transformStyle: "preserve-3d", perspective: "1000px" }}
      className="group bg-white dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 rounded-xl p-6 transition-all duration-300 hover:shadow-2xl hover:border-blue-500 h-full flex flex-col"
    >
      <div 
        className="flex-grow"
        style={{ transform: "translateZ(20px)" }} // Lifts content towards the user
      >
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">{title}</h3>
        <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-gray-500 dark:text-gray-400">
          <div className="flex items-center space-x-1.5">
            <MapPin size={16} />
            <span>{location}</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <Briefcase size={16} />
            <span>{type}</span>
          </div>
        </div>
        <p className="mt-4 text-gray-600 dark:text-gray-300">
          We're looking for a passionate individual to join our team and help us build the future of digital experiences.
        </p>
      </div>
      <div 
        className="mt-6"
        style={{ transform: "translateZ(40px)" }} // Lifts the button even more
      >
        <button onClick={() => onApply({ title, location, type })} className="connect-button w-full">
          <span>Apply Now</span>
          <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
        </button>
      </div>
    </motion.div>
);

const BenefitCard = ({ icon: Icon, title, description }: { icon: React.ElementType, title: string, description: string }) => (
    <motion.div variants={itemVariants} className="bg-gray-50 dark:bg-gray-900/50 p-6 rounded-lg text-center border border-gray-200 dark:border-gray-800 h-full">
        <div className="inline-block p-3 bg-blue-100 dark:bg-blue-900/50 text-blue-600 rounded-full">
            <Icon size={28} />
        </div>
        <h4 className="mt-4 text-lg font-semibold text-gray-900 dark:text-white">{title}</h4>
        <p className="mt-1 text-gray-600 dark:text-gray-300">{description}</p>
    </motion.div>
);

const ApplicationModal = ({ job, onClose }: { job: Job | null; onClose: () => void }) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        // Simulate an API call
        setTimeout(() => {
            setIsSubmitting(false);
            setIsSubmitted(true);
        }, 1500);
    };

    const handleClose = () => {
        // Reset state before closing
        setIsSubmitted(false);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col"
            >
              <header className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-800">
                  <div>
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Apply for {job?.title}</h2>
                      <p className="text-gray-500 dark:text-gray-400">{job?.location} &middot; {job?.type}</p>
                  </div>
                  <button onClick={handleClose} className="p-2 rounded-full text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800">
                      <X size={24} />
                  </button>
              </header>

              <div className="overflow-y-auto p-8 flex-grow">
                  <AnimatePresence mode="wait">
                      {isSubmitted ? (
                          <motion.div key="success" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
                              <div className="inline-block p-4 bg-green-100 text-green-600 rounded-full">
                                  <Check className="h-12 w-12" />
                              </div>
                              <h3 className="mt-6 text-2xl font-bold text-gray-900 dark:text-white">Application Submitted!</h3>
                              <p className="mt-2 text-gray-600 dark:text-gray-300">Thank you for your interest. We'll be in touch soon.</p>
                              <button onClick={handleClose} className="connect-button mt-8">Close</button>
                          </motion.div>
                      ) : (
                          <motion.form key="form" exit={{ opacity: 0 }} onSubmit={handleSubmit} className="space-y-6">
                              {/* Form fields are styled to match your other forms */}
                          </motion.form>
                      )}
                  </AnimatePresence>
              </div>
            </motion.div>
        </div>
    );
};

// --- Main Careers Page Component ---
export default function CareersPage() {
    const [selectedJob, setSelectedJob] = useState<Job | null>(null);

    const handleApplyClick = (job: Job) => {
        setSelectedJob(job);
    };

    const handleCloseModal = () => {
        setSelectedJob(null);
    };

    const jobs: Job[] = [
        { title: 'Senior Frontend Developer (React)', location: 'Hargeisa / Remote', type: 'Full-time' },
        { title: 'Lead UI/UX Designer', location: 'Remote', type: 'Full-time' },
        { title: 'Flutter Developer', location: 'Hargeisa', type: 'Contract' },
        { title: 'Digital Marketing Specialist', location: 'Remote', type: 'Part-time' },
    ];

    const benefits: Benefit[] = [
        { icon: Clock, title: 'Flexible Hours', description: 'Work when you are most productive.' },
        { icon: DollarSign, title: 'Competitive Salary', description: 'We value your skills and experience.' },
        { icon: BrainCircuit, title: 'Growth & Learning', description: 'Access to courses and conferences.' },
        { icon: Coffee, title: 'Great Culture', description: 'A collaborative and supportive team.' },
    ];

    return (
        <div className="bg-white dark:bg-black font-sans">
            {/* Hero Section */}
            <div className="relative bg-gray-50 dark:bg-black/50 overflow-hidden">
                <div className="max-w-7xl mx-auto">
                    <div className="relative z-10 pt-24 pb-16 sm:pb-20 md:pb-24 lg:max-w-2xl lg:w-full lg:pb-32">
                        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                            <motion.div 
                              variants={sectionVariants}
                              initial="hidden"
                              animate="visible"
                              className="sm:text-center lg:text-left"
                            >
                                <motion.h1 variants={itemVariants} className="text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white sm:text-5xl md:text-6xl">
                                    <span className="block">Join Our Team of</span>
                                    <span className="block text-blue-600">Innovators</span>
                                </motion.h1>
                                <motion.p variants={itemVariants} className="mt-3 text-base text-gray-600 dark:text-gray-300 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                                    At Aleen Creatives, we are a collective of creators, thinkers, and builders passionate about crafting exceptional digital experiences. If you thrive on challenges and innovation, you've found your people.
                                </motion.p>
                            </motion.div>
                        </main>
                    </div>
                </div>
                <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
                    <img
                        className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full rounded-bl-[5px]" // ✅ Image rounded as requested
                        src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2850&q=80"
                        alt="Team working together"
                    />
                </div>
            </div>

            {/* Open Positions Section */}
            <motion.div 
              variants={sectionVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="py-20 sm:py-24 bg-white dark:bg-black"
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.h2 variants={itemVariants} className="text-3xl font-bold tracking-tight text-center text-gray-900 dark:text-white sm:text-4xl">
                        Open Positions
                    </motion.h2>
                    <motion.p variants={itemVariants} className="mt-4 max-w-2xl mx-auto text-center text-lg text-gray-600 dark:text-gray-300">
                        We're always looking for talented people to join us. Check out our current openings below.
                    </motion.p>
                    <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-2">
                        {jobs.map((job) => <JobCard key={job.title} {...job} onApply={handleApplyClick} />)}
                    </div>
                </div>
            </motion.div>

            {/* Benefits Section */}
            <motion.div 
              variants={sectionVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="py-20 sm:py-24 bg-gray-50 dark:bg-black/50"
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.h2 variants={itemVariants} className="text-3xl font-bold tracking-tight text-center text-gray-900 dark:text-white sm:text-4xl">
                        Perks & Benefits
                    </motion.h2>
                    <motion.p variants={itemVariants} className="mt-4 max-w-2xl mx-auto text-center text-lg text-gray-600 dark:text-gray-300">
                        We invest in our team's success and well-being. Here are some of the benefits we're proud to offer.
                    </motion.p>
                    <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                        {benefits.map((benefit) => <BenefitCard key={benefit.title} {...benefit} />)}
                    </div>
                </div>
            </motion.div>
            
            <AnimatePresence>
                {selectedJob && <ApplicationModal job={selectedJob} onClose={handleCloseModal} />}
            </AnimatePresence>
        </div>
    );
}