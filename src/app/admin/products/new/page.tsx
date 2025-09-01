"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { getCategories } from "@/lib/supabase"
import type { Database } from "@/lib/supabase"
import { ImageUpload } from "@/components/ui/image-upload"

export default function AdminProductNewPage() {
  const router = useRouter()
  const [categories, setCategories] = useState<Database['public']['Tables']['categories']['Row'][]>([])
  const [loadingCats, setLoadingCats] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    original_price: "",
    discount_percentage: "",
    category_id: "",
    brand: "",
    stock: "0",
    is_active: true,
  })
  const [images, setImages] = useState<string[]>([])
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    let ignore = false
    async function load() {
      try {
        setLoadingCats(true)
        const cats = await getCategories()
        if (!ignore) setCategories(cats || [])
      } catch (e: any) {
        if (!ignore) setError(e?.message || 'خطا در دریافت دسته‌بندی‌ها')
      } finally {
        if (!ignore) setLoadingCats(false)
      }
    }
    load()
    return () => { ignore = true }
  }, [])

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitting(true)
    setError(null)
    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          description: form.description || null,
          price: Number(form.price),
          original_price: form.original_price ? Number(form.original_price) : null,
          discount_percentage: form.discount_percentage ? Number(form.discount_percentage) : null,
          category_id: form.category_id,
          brand: form.brand || null,
          images: images,
          stock: Number(form.stock || '0'),
          is_active: form.is_active,
        }),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data?.error || 'خطا در ثبت محصول')
      }
      await res.json()
      router.push('/admin/products')
    } catch (e: any) {
      setError(e?.message || 'خطای نامشخص')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">افزودن محصول</h1>
          <p className="text-gray-600 dark:text-gray-400">ثبت محصول جدید در فروشگاه</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>فرم محصول</CardTitle>
          <CardDescription>اطلاعات لازم را وارد کنید</CardDescription>
        </CardHeader>
        <CardContent>
          {error && <div className="text-red-600 mb-4">{error}</div>}
          <form onSubmit={onSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>نام محصول</Label>
              <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
            </div>
            <div>
              <Label>قیمت (تومان)</Label>
              <Input type="number" min={0} value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} required />
            </div>
            <div>
              <Label>قیمت اصلی (اختیاری)</Label>
              <Input type="number" min={0} value={form.original_price} onChange={(e) => setForm({ ...form, original_price: e.target.value })} />
            </div>
            <div>
              <Label>درصد تخفیف (اختیاری)</Label>
              <Input type="number" min={0} max={100} value={form.discount_percentage} onChange={(e) => setForm({ ...form, discount_percentage: e.target.value })} />
            </div>
            <div>
              <Label>برند (اختیاری)</Label>
              <Input value={form.brand} onChange={(e) => setForm({ ...form, brand: e.target.value })} />
            </div>
            <div>
              <Label>موجودی</Label>
              <Input type="number" min={0} value={form.stock} onChange={(e) => setForm({ ...form, stock: e.target.value })} />
            </div>
            <div className="md:col-span-2">
              <Label>توضیحات</Label>
              <Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={4} />
            </div>
            <div className="md:col-span-2">
              <Label>دسته‌بندی</Label>
              <select
                value={form.category_id}
                onChange={(e) => setForm({ ...form, category_id: e.target.value })}
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                required
              >
                <option value="">{loadingCats ? 'در حال بارگذاری...' : 'انتخاب دسته‌بندی'}</option>
                {categories.map(c => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>
            <div className="md:col-span-2">
              <Label>تصاویر محصول</Label>
              <ImageUpload
                value={images}
                onChange={setImages}
                maxImages={5}
                disabled={submitting}
              />
            </div>
            <div className="md:col-span-2 flex items-center justify-end gap-3 mt-2">
              <Button type="button" variant="outline" asChild><Link href="/admin/products">انصراف</Link></Button>
              <Button type="submit" disabled={submitting}>{submitting ? 'در حال ثبت...' : 'ثبت محصول'}</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}


