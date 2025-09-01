"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { 
  Package, 
  Plus, 
  Search, 
  Filter, 
  Edit, 
  Trash2, 
  Eye,
  MoreHorizontal
} from "lucide-react"
import Link from "next/link"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { getProducts, getCategories } from "@/lib/supabase"
import type { Database } from "@/lib/supabase"

export default function AdminProductsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")
  const [products, setProducts] = useState<Database['public']['Tables']['products']['Row'][]>([])
  const [categories, setCategories] = useState<Database['public']['Tables']['categories']['Row'][]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let ignore = false
    async function load() {
      try {
        setLoading(true)
        setError(null)
        const [prods, cats] = await Promise.all([
          getProducts(),
          getCategories(),
        ])
        if (!ignore) {
          setProducts(prods || [])
          setCategories(cats || [])
        }
      } catch (e: unknown) {
        if (!ignore) setError(e instanceof Error ? e.message : 'خطا در دریافت داده')
      } finally {
        if (!ignore) setLoading(false)
      }
    }
    load()
    return () => { ignore = true }
  }, [])

  const filteredProducts = products.filter((product) => {
    const brand = product.brand || ""
    const nameMatch = (product.name || "").toLowerCase().includes(searchTerm.toLowerCase())
    const brandMatch = brand.toLowerCase().includes(searchTerm.toLowerCase())
    const categoryMatch = !selectedCategory || true // Simplified for now
    return (nameMatch || brandMatch) && categoryMatch
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">مدیریت محصولات</h1>
          <p className="text-gray-600 dark:text-gray-400">مدیریت و ویرایش محصولات فروشگاه</p>
        </div>
        <Button asChild className="bg-gradient-to-r from-pink-600 to-purple-600">
          <Link href="/admin/products/new">
            <Plus className="mr-2 h-4 w-4" />
            افزودن محصول جدید
          </Link>
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>فیلترها</CardTitle>
          <CardDescription>جستجو و فیلتر محصولات</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="جستجو در محصولات..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pr-10"
                />
              </div>
            </div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
            >
              <option value="">همه دسته‌ها</option>
              <option value="لوازم آرایش">لوازم آرایش</option>
              <option value="مراقبت پوست">مراقبت پوست</option>
              <option value="عطر و ادکلن">عطر و ادکلن</option>
              <option value="لوازم مو">لوازم مو</option>
            </select>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              فیلتر پیشرفته
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Products Table */}
      <Card>
        <CardHeader>
          <CardTitle>لیست محصولات</CardTitle>
          <CardDescription>
            {loading ? 'در حال بارگذاری...' : `${filteredProducts.length} محصول یافت شد`}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <div className="text-red-600 mb-4">{error}</div>
          )}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="text-right py-3 px-4 font-medium">محصول</th>
                  <th className="text-right py-3 px-4 font-medium">دسته‌بندی</th>
                  <th className="text-right py-3 px-4 font-medium">برند</th>
                  <th className="text-right py-3 px-4 font-medium">قیمت</th>
                  <th className="text-right py-3 px-4 font-medium">موجودی</th>
                  <th className="text-right py-3 px-4 font-medium">وضعیت</th>
                  <th className="text-right py-3 px-4 font-medium">عملیات</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product) => (
                  <tr key={product.id} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800">
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-3 space-x-reverse">
                        <div className="w-12 h-12 bg-gradient-to-br from-pink-100 to-purple-100 rounded-lg flex-shrink-0" />
                        <div>
                          <p className="font-medium">{product.name}</p>
                          <p className="text-sm text-gray-500">ID: {product.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <Badge variant="outline">-</Badge>
                    </td>
                    <td className="py-4 px-4 font-medium">{product.brand || '-'}</td>
                    <td className="py-4 px-4 font-medium">{Number(product.price).toLocaleString()} تومان</td>
                    <td className="py-4 px-4">
                      <Badge 
                        variant={Number(product.stock) > 0 ? "default" : "destructive"}
                      >
                        {Number(product.stock)}
                      </Badge>
                    </td>
                    <td className="py-4 px-4">
                      <Badge 
                        variant={product.is_active ? "default" : "secondary"}
                      >
                        {product.is_active ? 'فعال' : 'غیرفعال'}
                      </Badge>
                    </td>
                    <td className="py-4 px-4">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>عملیات</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem asChild>
                            <Link href={`/admin/products/${product.id}`} className="flex items-center">
                              <Eye className="mr-2 h-4 w-4" />
                              مشاهده
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link href={`/admin/products/${product.id}/edit`} className="flex items-center">
                              <Edit className="mr-2 h-4 w-4" />
                              ویرایش
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600">
                            <Trash2 className="mr-2 h-4 w-4" />
                            حذف
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
