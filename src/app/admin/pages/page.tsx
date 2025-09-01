"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Edit, Trash2, MoreHorizontal, FileText } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const mockPages = [
  { id: "about", title: "درباره ما", slug: "about", updatedAt: "1403/06/08" },
  { id: "contact", title: "تماس با ما", slug: "contact", updatedAt: "1403/06/07" },
  { id: "privacy", title: "حریم خصوصی", slug: "privacy", updatedAt: "1403/06/05" },
]

export default function AdminCmsPages() {
  const [search, setSearch] = useState("")
  const filtered = mockPages.filter(p => p.title.includes(search) || p.slug.includes(search))

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">مدیریت صفحات</h1>
          <p className="text-gray-600 dark:text-gray-400">ایجاد و ویرایش صفحات استاتیک</p>
        </div>
        <Button asChild className="bg-gradient-to-r from-pink-600 to-purple-600"><Link href="#"><Plus className="ml-2 h-4 w-4" />ایجاد صفحه</Link></Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>صفحات</CardTitle>
          <CardDescription>لیست صفحات موجود</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <Input placeholder="جستجو..." value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
          <div className="space-y-3">
            {filtered.map(p => (
              <div key={p.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="flex items-center space-x-3 space-x-reverse">
                  <FileText className="h-4 w-4" />
                  <div>
                    <p className="font-medium">{p.title}</p>
                    <p className="text-sm text-gray-500">/{p.slug} • آخرین بروزرسانی {p.updatedAt}</p>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild><Button size="sm" variant="outline"><MoreHorizontal className="h-4 w-4" /></Button></DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>عملیات</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem><Edit className="ml-2 h-4 w-4" />ویرایش</DropdownMenuItem>
                    <DropdownMenuItem className="text-red-600"><Trash2 className="ml-2 h-4 w-4" />حذف</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}


