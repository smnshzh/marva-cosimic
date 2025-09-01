import { createClient } from './client'
import type { Database } from './types'

// Helper functions
export const getProducts = async () => {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('products')
    .select(`
      *,
      categories (
        name
      )
    `)
    .eq('is_active', true)
    .order('created_at', { ascending: false })

  if (error) throw error
  return data
}

export const getProductById = async (id: string) => {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('products')
    .select(`
      *,
      categories (
        name
      )
    `)
    .eq('id', id)
    .single()

  if (error) throw error
  return data
}

export const getCategories = async () => {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .order('name')

  if (error) {
    console.error('Supabase error:', error)
    throw new Error(`خطا در دریافت دسته‌بندی‌ها: ${error.message}`)
  }
  return data
}

export const createCategory = async (category: Database['public']['Tables']['categories']['Insert']) => {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('categories')
    .insert(category)
    .select()
    .single()

  if (error) {
    console.error('Supabase error:', error)
    throw new Error(`خطا در ایجاد دسته‌بندی: ${error.message}`)
  }
  return data
}

export const createProduct = async (product: Database['public']['Tables']['products']['Insert']) => {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('products')
    .insert(product)
    .select()
    .single()

  if (error) throw error
  return data
}

export const updateProduct = async (id: string, updates: Database['public']['Tables']['products']['Update']) => {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('products')
    .update(updates)
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return data
}

export const deleteProduct = async (id: string) => {
  const supabase = createClient()
  const { error } = await supabase
    .from('products')
    .delete()
    .eq('id', id)

  if (error) throw error
  return true
}

// User functions
export const getUserById = async (id: string) => {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', id)
    .single()

  if (error) throw error
  return data
}

export const updateUser = async (id: string, updates: Database['public']['Tables']['users']['Update']) => {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('users')
    .update(updates)
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return data
}

// Order functions
export const getOrders = async () => {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('orders')
    .select(`
      *,
      users (
        full_name,
        email
      )
    `)
    .order('created_at', { ascending: false })

  if (error) throw error
  return data
}

export const getOrderById = async (id: string) => {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('orders')
    .select(`
      *,
      users (
        full_name,
        email
      ),
      order_items (
        *,
        products (
          name,
          price
        )
      )
    `)
    .eq('id', id)
    .single()

  if (error) throw error
  return data
}

export const updateOrderStatus = async (id: string, status: Database['public']['Tables']['orders']['Row']['status']) => {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('orders')
    .update({ status })
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return data
}
