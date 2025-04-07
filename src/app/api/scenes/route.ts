import { NextResponse } from 'next/server';
import { scenes } from '@/data/scenes';

export async function GET() {
  try {
    return NextResponse.json(scenes);
  } catch (error) {
    console.error('Error fetching scenes:', error);
    return NextResponse.json(
      { error: 'Failed to fetch scenes' },
      { status: 500 }
    );
  }
} 