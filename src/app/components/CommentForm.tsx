'use client';

import { useState } from 'react';
import { User, Mail, Loader, Send } from 'lucide-react';

// A type to define the data our form collects
export type CommentFormData = {
  name: string;
  email: string;
  comment: string;
  isAdmin: boolean;
};

interface CommentFormProps {
  // A function passed from the parent to handle the actual submission
  onSubmit: (data: CommentFormData) => Promise<void>;
  isReplyForm?: boolean;
}

export default function CommentForm({ onSubmit, isReplyForm = false }: CommentFormProps) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [comment, setComment] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);
    const [status, setStatus] = useState<'idle' | 'submitting'>('idle');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('submitting');
        await onSubmit({ name, email, comment, isAdmin });

        // Reset the form after submission is handled by the parent
        setName('');
        setEmail('');
        setComment('');
        setIsAdmin(false);
        setStatus('idle');
    };

    return (
        <form onSubmit={handleSubmit} className={`space-y-4 ${isReplyForm ? 'mt-4' : 'mt-6'}`}>
            <textarea value={comment} onChange={(e) => setComment(e.target.value)} rows={3} required className="w-full px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 transition" placeholder={isReplyForm ? "Write your reply..." : "What are your thoughts?"} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><User className="text-gray-400 w-5 h-5" /></div>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} required className="w-full pl-10 pr-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 transition" placeholder="Name" />
                </div>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><Mail className="text-gray-400 w-5 h-5" /></div>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full pl-10 pr-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 transition" placeholder="Email" />
                </div>
            </div>
            <div className="flex items-center justify-between">
                 <div className="flex items-center gap-2">
                    <input type="checkbox" id={`isAdmin-${isReplyForm ? 'reply' : 'main'}`} checked={isAdmin} onChange={(e) => setIsAdmin(e.target.checked)} className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"/>
                    <label htmlFor={`isAdmin-${isReplyForm ? 'reply' : 'main'}`} className="text-sm text-gray-600 dark:text-gray-300">Post as Admin</label>
                 </div>
                <button type="submit" disabled={status === 'submitting'} className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center gap-2 transition">
                    {status === 'submitting' ? <Loader className="animate-spin w-5 h-5" /> : <Send className="w-5 h-5" />}
                    {isReplyForm ? 'Post Reply' : 'Post Comment'}
                </button>
            </div>
        </form>
    );
}