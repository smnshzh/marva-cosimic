"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ImageUpload } from "@/components/ui/image-upload"
import { getCategories, getProductById, updateProduct } from "@/lib/supabase"
import type { Database } from "@/lib/supabase"

export default function AdminProductEditPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const productId = searchParams.get('id')

  const [categories, setCategories] = useState<Database['public']['Tables']['categories']['Row'][]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [product, setProduct] = useState<Database['public']['Tables']['products']['Row'] | null>(null)

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    brand: "",
    category_id: "",
    images: [] as string[],
    is_active: true,
  })
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    if (!productId) {
      setError('شناسه محصول مشخص نشده است')
      setLoading(false)
      return
    }

    let ignore = false
    async function load() {
      try {
        setLoading(true)
        setError(null)
        
        // Load categories
        const cats = await getCategories()
        if (!ignore) setCategories(cats || [])
        
        // Load product
        const prod = await getProductById(productId)
        if (!ignore && prod) {
          setProduct(prod)
          setForm({
            name: prod.name || "",
            description: prod.description || "",
            price: prod.price?.toString() || "",
            stock: prod.stock?.toString() || "",
            brand: prod.brand || "",
            category_id: prod.category_id || "",
            images: prod.images || [],
            is_active: prod.is_active ?? true,
          })
        }
      } catch (e: unknown) {
        if (!ignore) setError(e instanceof Error ? e.message : 'خطا در بارگذاری اطلاعات')
      } finally {
        if (!ignore) setLoading(false)
      }
    }
    load()
    return () => { ignore = true }
  }, [productId])

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!productId) return
    
    setSubmitting(true)
    setError(null)
    try {
      await updateProduct(productId, {
        name: form.name,
        description: form.description || null,
        price: parseFloat(form.price) || 0,
        stock: parseInt(form.stock) || 0,
        brand: form.brand || null,
        category_id: form.category_id || undefined,
        images: form.images,
        is_active: form.is_active,
      })
      router.push('/admin/products')
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'خطای نامشخص')
    } finally {
      setSubmitting(false)
    }
  }

  if (!productId) {
    return (
      <div className="space-y-6">
        <div className="text-center py-8">
          <h2 className="text-xl font-semibold mb-2">شناسه محصول مشخص نشده</h2>
          <p className="text-gray-600 mb-4">لطفاً از طریق لیست محصولات، محصول مورد نظر را انتخاب کنید.</p>
          <Button asChild>
            <Link href="/admin/products">بازگشت به لیست محصولات</Link>
          </Button>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="text-center py-8">در حال بارگذاری...</div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="space-y-6">
        <div className="text-center py-8">
          <h2 className="text-xl font-semibold mb-2">محصول یافت نشد</h2>
          <p className="text-gray-600 mb-4">محصول مورد نظر وجود ندارد یا حذف شده است.</p>
          <Button asChild>
            <Link href="/admin/products">بازگشت به لیست محصولات</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">ویرایش محصول</h1>
          <p className="text-gray-600 dark:text-gray-400">ویرایش اطلاعات محصول</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>فرم ویرایش محصول</CardTitle>
          <CardDescription>اطلاعات محصول را ویرایش کنید</CardDescription>
        </CardHeader>
        <CardContent>
          {error && <div className="text-red-600 mb-4">{error}</div>}
          <form onSubmit={onSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>نام محصول</Label>
              <Input 
                value={form.name} 
                onChange={(e) => setForm({ ...form, name: e.target.value })} 
                required 
                placeholder="مثال: کرم مرطوب کننده"
              />
            </div>
            <div>
              <Label>برند</Label>
              <Input 
                value={form.brand} 
                onChange={(e) => setForm({ ...form, brand: e.target.value })} 
                placeholder="مثال: لورال"
              />
            </div>
            <div>
              <Label>قیمت (تومان)</Label>
              <Input 
                type="number"
                value={form.price} 
                onChange={(e) => setForm({ ...form, price: e.target.value })} 
                required
                min="0"
                step="1000"
                placeholder="50000"
              />
            </div>
            <div>
              <Label>موجودی</Label>
              <Input 
                type="number"
                value={form.stock} 
                onChange={(e) => setForm({ ...form, stock: e.target.value })} 
                required
                min="0"
                placeholder="10"
              />
            </div>
            <div>
              <Label>دسته‌بندی</Label>
              <Select value={form.category_id} onValueChange={(value) => setForm({ ...form, category_id: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="انتخاب دسته‌بندی" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">بدون دسته‌بندی</SelectItem>
                  {categories.map(category => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>وضعیت</Label>
              <Select value={form.is_active.toString()} onValueChange={(value) => setForm({ ...form, is_active: value === 'true' })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="true">فعال</SelectItem>
                  <SelectItem value="false">غیرفعال</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="md:col-span-2">
              <Label>توضیحات</Label>
              <Textarea 
                value={form.description} 
                onChange={(e) => setForm({ ...form, description: e.target.value })} 
                rows={4}
                placeholder="توضیحات محصول..."
              />
            </div>
            <div className="md:col-span-2">
              <Label>تصاویر محصول</Label>
              <ImageUpload
                value={form.images}
                onChange={(urls) => setForm({ ...form, images: urls })}
              />
            </div>
            <div className="md:col-span-2 flex items-center justify-end gap-3 mt-4">
              <Button type="button" variant="outline" asChild>
                <Link href="/admin/products">انصراف</Link>
              </Button>
              <Button type="submit" disabled={submitting}>
                {submitting ? 'در حال ذخیره...' : 'ذخیره تغییرات'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
