import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { createClient } from '@/lib/supabase/server';

export async function GET(request: NextRequest) {
  try {
    // Check if environment variables are set
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      return NextResponse.json(
        { error: 'Supabase environment variables not configured' },
        { status: 500 }
      );
    }

    const supabase = createClient(cookies());

    // Simple query first to test connection
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .limit(10);

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      categories: data || [],
      pagination: {
        page: 1,
        limit: 10,
        total: data?.length || 0,
        totalPages: 1,
      },
    });
  } catch (error) {
    console.error('Error fetching categories:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, description, image_url, parent_id, is_active = true } = body;

    if (!name) {
      return NextResponse.json({ error: 'نام دسته‌بندی الزامی است' }, { status: 400 });
    }

    const supabase = createClient(cookies());
    const { data, error } = await supabase
      .from('categories')
      .insert([
        {
          name,
          description: description || null,
          image_url: image_url || null,
          parent_id: parent_id || null,
          is_active,
        },
      ])
      .select()
      .single();

    if (error) throw error;
    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error('Error creating category:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
