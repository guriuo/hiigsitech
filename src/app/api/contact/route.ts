// nextjs-project/app/api/contact/route.ts
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
    // ✅ UPDATE: Destructure the new phone field
    const { name, email, project, message, phone } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    await client.create({
      _type: 'contactSubmission',
      name,
      email,
      phone, // ✅ UPDATE: Save the phone field
      project,
      message,
      createdAt: new Date().toISOString(),
    });

    return NextResponse.json({ message: 'Submission received!' }, { status: 200 });
  } catch (error) {
    console.error('Submission Error:', error);
    return NextResponse.json({ message: 'Error processing submission' }, { status: 500 });
  }
}