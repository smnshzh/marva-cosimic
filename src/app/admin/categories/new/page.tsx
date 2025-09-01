"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { getCategories } from "@/lib/supabase"
import type { Database } from "@/lib/supabase"

export default function AdminCategoryNewPage() {
  const router = useRouter()
  const [categories, setCategories] = useState<Database['public']['Tables']['categories']['Row'][]>([])
  const [loadingCats, setLoadingCats] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [form, setForm] = useState({
    name: "",
    description: "",
    image_url: "",
    parent_id: "",
    is_active: true,
  })
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    let ignore = false
    async function load() {
      try {
        setLoadingCats(true)
        const cats = await getCategories()
        if (!ignore) setCategories(cats || [])
      } catch (e: unknown) {
        if (!ignore) setError(e instanceof Error ? e.message : 'خطا در دریافت دسته‌بندی‌ها')
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
      const res = await fetch('/api/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          description: form.description || null,
          image_url: form.image_url || null,
          parent_id: form.parent_id || null,
          is_active: form.is_active,
        }),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data?.error || 'خطا در ثبت دسته‌بندی')
      }
      await res.json()
      router.push('/admin/categories')
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'خطای نامشخص')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">افزودن دسته‌بندی</h1>
          <p className="text-gray-600 dark:text-gray-400">ثبت دسته‌بندی جدید</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>فرم دسته‌بندی</CardTitle>
          <CardDescription>اطلاعات دسته‌بندی را وارد کنید</CardDescription>
        </CardHeader>
        <CardContent>
          {error && <div className="text-red-600 mb-4">{error}</div>}
          <form onSubmit={onSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>نام دسته‌بندی</Label>
              <Input 
                value={form.name} 
                onChange={(e) => setForm({ ...form, name: e.target.value })} 
                required 
                placeholder="مثال: لوازم آرایش"
              />
            </div>
            <div>
              <Label>URL تصویر (اختیاری)</Label>
              <Input 
                type="url"
                value={form.image_url} 
                onChange={(e) => setForm({ ...form, image_url: e.target.value })} 
                placeholder="https://example.com/image.jpg"
              />
            </div>
            <div className="md:col-span-2">
              <Label>توضیحات</Label>
              <Textarea 
                value={form.description} 
                onChange={(e) => setForm({ ...form, description: e.target.value })} 
                rows={4}
                placeholder="توضیحات دسته‌بندی..."
              />
            </div>
            <div className="md:col-span-2">
              <Label>دسته‌بندی والد (اختیاری)</Label>
              <select
                value={form.parent_id}
                onChange={(e) => setForm({ ...form, parent_id: e.target.value })}
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
              >
                <option value="">{loadingCats ? 'در حال بارگذاری...' : 'بدون والد (دسته‌بندی اصلی)'}</option>
                {categories.map(c => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>
            <div className="md:col-span-2">
              <div className="flex items-center space-x-2 space-x-reverse">
                <input
                  type="checkbox"
                  id="is_active"
                  checked={form.is_active}
                  onChange={(e) => setForm({ ...form, is_active: e.target.checked })}
                  className="rounded border-gray-300 text-pink-600 focus:ring-pink-500"
                />
                <Label htmlFor="is_active">فعال</Label>
              </div>
            </div>
            <div className="md:col-span-2 flex items-center justify-end gap-3 mt-4">
              <Button type="button" variant="outline" asChild>
                <Link href="/admin/categories">انصراف</Link>
              </Button>
              <Button type="submit" disabled={submitting}>
                {submitting ? 'در حال ثبت...' : 'ثبت دسته‌بندی'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
