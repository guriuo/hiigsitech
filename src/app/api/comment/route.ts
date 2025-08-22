// nextjs-project/app/api/comment/route.ts
import { createClient } from '@sanity/client';
import { NextResponse } from 'next/server';

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_WRITE_TOKEN,
});

export async function POST(request: Request) {
  try {
    // ✅ UPDATE: Destructure parentId and isAdmin from the request
    const { name, email, comment, postId, parentId, isAdmin } = await request.json();

    if (!name || !email || !comment || !postId) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    const commentDoc: any = {
      _type: 'comment',
      name,
      email,
      comment,
      isAdmin: isAdmin || false, // Default to false if not provided
      createdAt: new Date().toISOString(),
      post: {
        _type: 'reference',
        _ref: postId,
      },
    };

    // If it's a reply, add the parent reference
    if (parentId) {
      commentDoc.parent = {
        _type: 'reference',
        _ref: parentId,
      };
    }

    await client.create(commentDoc);

    return NextResponse.json({ message: 'Comment submitted!' }, { status: 200 });
  } catch (error) {
    console.error('Comment Error:', error);
    return NextResponse.json({ message: 'Error submitting comment' }, { status: 500 });
  }
}