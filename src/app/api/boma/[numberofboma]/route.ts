// src/app/api/boma/[numberofboma]/route.ts
import { NextResponse } from 'next/server';
import { createServerClient } from '@/utils/supabase';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const numberOfBoma = parseInt(url.pathname.split('/').pop() || '0', 10);
  const supabase = createServerClient(cookies());

  try {
    if (isNaN(numberOfBoma) || numberOfBoma <= 0) {
      return NextResponse.json({ error: 'Invalid number of entries.' }, { status: 400 });
    }

    // Fetch total count of rows
    const { data: countData, error: countError, count } = await supabase
      .from('shobdo')
      .select('*', { count: 'exact' });

    if (countError) {
      return NextResponse.json({ error: countError.message }, { status: 500 });
    }

    if (numberOfBoma > count) {
      return NextResponse.json({ error: 'এখানে এই পরিমান শব্দবোমা নাই।' }, { status: 404 });
    }

    // Fetch the specified number of rows
    const { data, error } = await supabase
      .from('shobdo')
      .select('*')
      .limit(numberOfBoma)
      .order('id', { ascending: false });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'An unexpected error occurred.' }, { status: 500 });
  }
}
