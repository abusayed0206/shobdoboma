// src/app/api/boma/random/route.ts
import { NextResponse } from 'next/server';
import { createServerClient } from '@/utils/supabase';
import { cookies } from 'next/headers'; // Import cookies from next/headers

export async function GET() {
  const cookieStore = cookies();
  const supabase = createServerClient(cookieStore);

  try {
    // Fetch total count of rows
    const { data: countData, error: countError, count } = await supabase
      .from('shobdo')
      .select('*', { count: 'exact' });

    if (countError) {
      return NextResponse.json({ error: countError.message }, { status: 500 });
    }

    if (count === null || count === 0) {
      return NextResponse.json({ error: 'No entries found.' }, { status: 404 });
    }

    // Select a random row
    const randomIndex = Math.floor(Math.random() * count);
    const { data, error } = await supabase
      .from('shobdo')
      .select('*')
      .range(randomIndex, randomIndex)
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'An unexpected error occurred.' }, { status: 500 });
  }
}
