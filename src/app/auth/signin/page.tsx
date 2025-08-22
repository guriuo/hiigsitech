// app/auth/signin/page.tsx
'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Mail, Lock, UserPlus, LogIn, Github, Chrome } from 'lucide-react';

export default function SignInPage() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/';
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoginView, setIsLoginView] = useState(true);

  const handleSocialSignIn = (provider: 'google' | 'github') => {
    signIn(provider, { callbackUrl });
  };

  const handleCredentialsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (isLoginView) {
      // Sign in logic
      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
        callbackUrl,
      });

      if (result?.error) {
        setError('Invalid email or password. Please try again.');
      } else if (result?.url) {
        router.push(result.url);
      }
    } else {
      // Sign up logic (in a real app, this would be an API call to create a user)
      console.log('Signing up with:', { email, password });
      // For this demo, we'll just log them in after "signing up"
      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
        callbackUrl,
      });
       if (result?.url) {
        router.push(result.url);
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-black">
      <div className="w-full max-w-md p-8 space-y-8 bg-white dark:bg-gray-900/50 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-800">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            {isLoginView ? 'Welcome Back' : 'Create an Account'}
          </h1>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            {isLoginView ? "Sign in to continue to your courses" : "Get started with your learning journey"}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <button onClick={() => handleSocialSignIn('google')} className="flex items-center justify-center w-full px-4 py-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-700 transition-colors">
            <Chrome className="w-5 h-5 mr-2" />
            Google
          </button>
          <button onClick={() => handleSocialSignIn('github')} className="flex items-center justify-center w-full px-4 py-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-700 transition-colors">
            <Github className="w-5 h-5 mr-2" />
            GitHub
          </button>
        </div>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300 dark:border-gray-600" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 text-gray-500 bg-white dark:bg-gray-900/50 dark:text-gray-400">
              Or continue with email
            </span>
          </div>
        </div>

        <form className="space-y-6" onSubmit={handleCredentialsSubmit}>
          <div>
            <label htmlFor="email" className="sr-only">Email address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input id="email" name="email" type="email" value={email} onChange={e => setEmail(e.target.value)} required className="w-full pl-10 pr-3 py-3 text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" placeholder="Email address" />
            </div>
          </div>
          <div>
            <label htmlFor="password" className="sr-only">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input id="password" name="password" type="password" value={password} onChange={e => setPassword(e.target.value)} required className="w-full pl-10 pr-3 py-3 text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" placeholder="Password" />
            </div>
          </div>

          {error && <p className="text-sm text-red-500 text-center">{error}</p>}

          <div>
            <button type="submit" className="flex items-center justify-center w-full px-4 py-3 font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors">
              {isLoginView ? <><LogIn className="w-5 h-5 mr-2" /> Sign In</> : <><UserPlus className="w-5 h-5 mr-2" /> Sign Up</>}
            </button>
          </div>
        </form>

        <div className="text-sm text-center">
          <button onClick={() => setIsLoginView(!isLoginView)} className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300">
            {isLoginView ? "Don't have an account? Sign Up" : "Already have an account? Sign In"}
          </button>
        </div>
      </div>
    </div>
  );
}