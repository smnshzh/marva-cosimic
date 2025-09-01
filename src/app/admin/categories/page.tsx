"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { 
  FolderTree,
  Plus, 
  Search, 
  Edit, 
  Trash2, 
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
import { getCategories } from "@/lib/supabase"
import type { Database } from "@/lib/supabase"

export default function AdminCategoriesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [categories, setCategories] = useState<Database['public']['Tables']['categories']['Row'][]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let ignore = false
    async function load() {
      try {
        setLoading(true)
        setError(null)
        const cats = await getCategories()
        if (!ignore) setCategories(cats || [])
      } catch (e: unknown) {
        if (!ignore) setError(e instanceof Error ? e.message : 'خطای نامشخص')
      } finally {
        if (!ignore) setLoading(false)
      }
    }
    load()
    return () => { ignore = true }
  }, [])

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.description?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getParentName = (parentId: string | null) => {
    if (!parentId) return null
    const parent = categories.find(cat => cat.id === parentId)
    return parent?.name || null
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">مدیریت دسته‌بندی‌ها</h1>
          <p className="text-gray-600 dark:text-gray-400">مدیریت و ویرایش دسته‌بندی محصولات</p>
        </div>
        <Button asChild className="bg-gradient-to-r from-pink-600 to-purple-600">
          <Link href="/admin/categories/new">
            <Plus className="mr-2 h-4 w-4" />
            افزودن دسته‌بندی جدید
          </Link>
        </Button>
      </div>

      {/* Search */}
      <Card>
        <CardHeader>
          <CardTitle>جستجو</CardTitle>
          <CardDescription>جستجو در دسته‌بندی‌ها</CardDescription>
        </CardHeader>
        <CardContent>
          {error && <div className="text-red-600 mb-4">{error}</div>}
          <div className="relative">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="جستجو در دسته‌بندی‌ها..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pr-10"
              disabled={loading}
            />
          </div>
        </CardContent>
      </Card>

      {/* Categories Grid */}
      {loading && (
        <div className="text-center py-8">در حال بارگذاری...</div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCategories.map((category) => (
          <Card key={category.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3 space-x-reverse">
                  <div className="w-10 h-10 bg-gradient-to-br from-pink-100 to-purple-100 rounded-lg flex items-center justify-center">
                    <FolderTree className="h-5 w-5 text-pink-600" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{category.name}</CardTitle>
                    <p className="text-sm text-gray-500">دسته‌بندی</p>
                  </div>
                </div>
                <Badge 
                  variant={category.is_active ? "default" : "secondary"}
                  className="text-xs"
                >
                  {category.is_active ? 'فعال' : 'غیرفعال'}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                {category.description || 'بدون توضیحات'}
              </p>
              
              {/* Parent Category */}
              {category.parent_id && (
                <div className="mb-4">
                  <p className="text-sm text-gray-500">دسته‌بندی والد:</p>
                  <Badge variant="outline" className="text-xs">
                    {getParentName(category.parent_id) || 'نامشخص'}
                  </Badge>
                </div>
              )}
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 space-x-reverse">
                  <div className="w-16 h-16 bg-gradient-to-br from-pink-100 to-purple-100 rounded-lg flex-shrink-0" />
                </div>
                
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
                      <Link href={`/admin/categories/${category.id}`} className="flex items-center">
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
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredCategories.length === 0 && !loading && (
        <Card>
          <CardContent className="text-center py-12">
            <FolderTree className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              دسته‌بندی‌ای یافت نشد
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              هیچ دسته‌بندی‌ای با این جستجو پیدا نشد.
            </p>
            <Button asChild>
              <Link href="/admin/categories/new">
                <Plus className="mr-2 h-4 w-4" />
                افزودن دسته‌بندی جدید
              </Link>
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
