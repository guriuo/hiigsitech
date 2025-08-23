import { Suspense } from 'react';
import SignInComponent from './SignInComponent';

// A simple loading component to show while the main component loads
function LoadingFallback() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-black">
      <div>Loading...</div>
    </div>
  );
}

export default function SignInPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <SignInComponent />
    </Suspense>
  );
}