import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { createClient } from '@/lib/supabase/server';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const categoryId = searchParams.get('categoryId');
    const search = searchParams.get('search');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '12');
    const from = (page - 1) * limit;
    const to = from + limit - 1;

    const supabase = createClient(cookies());

    let query = supabase
      .from('products')
      .select(
        `
          *,
          categories:categories!products_category_id_fkey ( id, name )
        `,
        { count: 'exact' }
      )
      .eq('is_active', true)
      .order('created_at', { ascending: false });

    if (categoryId) {
      query = query.eq('category_id', categoryId);
    }
    if (search) {
      query = query.or(
        `name.ilike.%${search}%,description.ilike.%${search}%,brand.ilike.%${search}%`
      );
    }

    const { data, error, count } = await query.range(from, to);
    if (error) throw error;

    return NextResponse.json({
      products: data,
      pagination: {
        page,
        limit,
        total: count ?? 0,
        totalPages: Math.ceil((count ?? 0) / limit),
      },
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log('Received product data:', body);

    const {
      name,
      description,
      price,
      original_price,
      discount_percentage,
      category_id,
      brand,
      images,
      stock,
      is_active = true,
    } = body;

    if (!name || !price || !category_id) {
      return NextResponse.json({ error: 'فیلدهای الزامی: نام، قیمت، دسته‌بندی' }, { status: 400 });
    }

    // Check environment variables
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      return NextResponse.json({ error: 'متغیرهای محیطی Supabase تنظیم نشده' }, { status: 500 });
    }

    const supabase = createClient(cookies());
    
    // Test connection first
    const { data: testData, error: testError } = await supabase
      .from('categories')
      .select('id, name')
      .eq('id', category_id)
      .single();

    if (testError) {
      console.error('Category test error:', testError);
      return NextResponse.json({ 
        error: 'خطا در اتصال به دیتابیس یا دسته‌بندی یافت نشد: ' + testError.message 
      }, { status: 500 });
    }

    const { data, error } = await supabase
      .from('products')
      .insert([
        {
          name,
          description: description || null,
          price: Number(price),
          original_price: original_price ? Number(original_price) : null,
          discount_percentage: discount_percentage ? Number(discount_percentage) : null,
          category_id,
          brand: brand || null,
          images: Array.isArray(images) && images.length > 0 ? images : null,
          stock: stock ? Number(stock) : 0,
          is_active,
        },
      ])
      .select()
      .single();

    if (error) {
      console.error('Product insert error:', error);
      return NextResponse.json({ 
        error: 'خطا در ثبت محصول: ' + error.message 
      }, { status: 500 });
    }

    return NextResponse.json(data, { status: 201 });
  } catch (error: any) {
    console.error('Error creating product:', error);
    return NextResponse.json(
      { error: 'خطای سرور: ' + (error.message || 'نامشخص') },
      { status: 500 }
    );
  }
}
