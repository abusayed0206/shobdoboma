// src/app/api/boma/random/route.ts
import { NextResponse } from 'next/server';
import { supabase } from '@/utils/supabase'; // Adjust the import path based on your project structure

export async function GET() {
  try {
    const { data, error, count } = await supabase
      .from('shobdo')
      .select('*', { count: 'exact' })
      .order('id', { ascending: false }); // Random selection can be achieved with proper ordering and offset

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const randomIndex = Math.floor(Math.random() * count);
    const randomRow = data[randomIndex];

    return NextResponse.json(randomRow);
  } catch (error) {
    return NextResponse.json({ error: 'An unexpected error occurred.' }, { status: 500 });
  }
}
