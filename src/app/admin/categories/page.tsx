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
  MoreHorizontal,
  ChevronRight,
  ChevronDown
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

type CategoryWithChildren = Database['public']['Tables']['categories']['Row'] & {
  children?: CategoryWithChildren[]
}

export default function AdminCategoriesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [categories, setCategories] = useState<CategoryWithChildren[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set())

  useEffect(() => {
    let ignore = false
    async function load() {
      try {
        setLoading(true)
        setError(null)
        const cats = await getCategories()
        if (!ignore) {
          const hierarchicalCats = buildCategoryTree(cats || [])
          setCategories(hierarchicalCats)
        }
      } catch (e: unknown) {
        if (!ignore) setError(e instanceof Error ? e.message : 'خطای نامشخص')
      } finally {
        if (!ignore) setLoading(false)
      }
    }
    load()
    return () => { ignore = true }
  }, [])

  // Build hierarchical tree structure
  const buildCategoryTree = (flatCategories: Database['public']['Tables']['categories']['Row'][]): CategoryWithChildren[] => {
    const categoryMap = new Map<string, CategoryWithChildren>()
    const rootCategories: CategoryWithChildren[] = []

    // First pass: create map of all categories
    flatCategories.forEach(cat => {
      categoryMap.set(cat.id, { ...cat, children: [] })
    })

    // Second pass: build tree structure
    flatCategories.forEach(cat => {
      const categoryWithChildren = categoryMap.get(cat.id)!
      
      if (cat.parent_id) {
        const parent = categoryMap.get(cat.parent_id)
        if (parent) {
          parent.children!.push(categoryWithChildren)
        }
      } else {
        rootCategories.push(categoryWithChildren)
      }
    })

    return rootCategories
  }

  // Filter categories recursively
  const filterCategoriesRecursively = (cats: CategoryWithChildren[], search: string): CategoryWithChildren[] => {
    return cats.filter(cat => {
      const matchesSearch = cat.name.toLowerCase().includes(search.toLowerCase()) ||
        cat.description?.toLowerCase().includes(search.toLowerCase())
      
      const children = filterCategoriesRecursively(cat.children || [], search)
      
      if (children.length > 0) {
        cat.children = children
        return true
      }
      
      return matchesSearch
    })
  }

  const filteredCategories = searchTerm 
    ? filterCategoriesRecursively([...categories], searchTerm)
    : categories

  const toggleExpanded = (categoryId: string) => {
    const newExpanded = new Set(expandedCategories)
    if (newExpanded.has(categoryId)) {
      newExpanded.delete(categoryId)
    } else {
      newExpanded.add(categoryId)
    }
    setExpandedCategories(newExpanded)
  }

  const renderCategoryTree = (cats: CategoryWithChildren[], level: number = 0) => {
    return cats.map((category) => {
      const hasChildren = category.children && category.children.length > 0
      const isExpanded = expandedCategories.has(category.id)
      
      return (
        <div key={category.id} className="space-y-2">
          <Card className={`hover:shadow-lg transition-shadow ${level > 0 ? 'mr-6' : ''}`}>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3 space-x-reverse">
                  <div className="flex items-center space-x-2 space-x-reverse">
                    {hasChildren && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleExpanded(category.id)}
                        className="p-1 h-6 w-6"
                      >
                        {isExpanded ? (
                          <ChevronDown className="h-4 w-4" />
                        ) : (
                          <ChevronRight className="h-4 w-4" />
                        )}
                      </Button>
                    )}
                    {!hasChildren && <div className="w-6" />}
                    <div className="w-10 h-10 bg-gradient-to-br from-pink-100 to-purple-100 rounded-lg flex items-center justify-center">
                      <FolderTree className="h-5 w-5 text-pink-600" />
                    </div>
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
          
          {/* Render children if expanded */}
          {hasChildren && isExpanded && (
            <div className="mt-2">
              {renderCategoryTree(category.children!, level + 1)}
            </div>
          )}
        </div>
      )
    })
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

      {/* Categories Tree */}
      {loading && (
        <div className="text-center py-8">در حال بارگذاری...</div>
      )}
      
      <div className="space-y-4">
        {renderCategoryTree(filteredCategories)}
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
