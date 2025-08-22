'use client'; // This component runs only on the client

import { useEffect } from 'react';
import { client } from '../../../../sanity/lib/client';

export default function PostViewTracker({ postId }: { postId: string }) {
    useEffect(() => {
        // This effect runs only on the client, after the page loads, to increment the view count
        client.patch(postId).inc({ views: 1 }).setIfMissing({ views: 0 }).commit().catch(console.error);
    }, [postId]);

    return null; // This component renders nothing to the page
}