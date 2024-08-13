// src/app/api/boma/[numberofboma]/route.ts
import { NextResponse } from 'next/server';
import { supabase } from '@/utils/supabase'; // Adjust the import path based on your project structure

export async function GET(request: Request) {
  const url = new URL(request.url);
  const numberOfBoma = parseInt(url.pathname.split('/').pop() || '0', 10);

  try {
    if (isNaN(numberOfBoma) || numberOfBoma <= 0) {
      return NextResponse.json({ error: 'Invalid number of entries.' }, { status: 400 });
    }

    const { data, error, count } = await supabase
      .from('shobdo')
      .select('*', { count: 'exact' });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    if (numberOfBoma > count) {
      return NextResponse.json({ error: 'এখানে এই পরিমান শব্দবোমা নাই।' }, { status: 404 });
    }

    const entries = await supabase
      .from('shobdo')
      .select('*')
      .limit(numberOfBoma)
      .order('id', { ascending: false }); // Adjust ordering as needed

    return NextResponse.json(entries.data);
  } catch (error) {
    return NextResponse.json({ error: 'An unexpected error occurred.' }, { status: 500 });
  }
}
