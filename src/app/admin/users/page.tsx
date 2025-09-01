"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, UserPlus, MoreHorizontal } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const mockUsers = [
  { id: "u1", name: "حسین کریمی", email: "hossein@example.com", role: "admin", active: true },
  { id: "u2", name: "مینا احمدی", email: "mina@example.com", role: "user", active: true },
  { id: "u3", name: "رضا جلالی", email: "reza@example.com", role: "moderator", active: false },
]

export default function AdminUsersPage() {
  const [search, setSearch] = useState("")
  const filtered = mockUsers.filter(u => u.name.includes(search) || u.email.includes(search))

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">مدیریت کاربران</h1>
          <p className="text-gray-600 dark:text-gray-400">لیست کاربران و نقش‌ها</p>
        </div>
        <Button asChild className="bg-gradient-to-r from-pink-600 to-purple-600"><Link href="#"><UserPlus className="ml-2 h-4 w-4" />افزودن کاربر</Link></Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>جستجو</CardTitle>
          <CardDescription>یافتن کاربر</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input placeholder="نام یا ایمیل" value={search} onChange={(e) => setSearch(e.target.value)} className="pr-10" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>کاربران</CardTitle>
          <CardDescription>مدیریت نقش و وضعیت</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {filtered.map(u => (
              <div key={u.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div>
                  <p className="font-medium">{u.name}</p>
                  <p className="text-sm text-gray-500">{u.email}</p>
                </div>
                <div className="flex items-center space-x-3 space-x-reverse">
                  <Badge variant={u.active ? 'default' : 'secondary'} className="text-xs">{u.active ? 'فعال' : 'غیرفعال'}</Badge>
                  <Badge className="text-xs" variant="outline">{u.role}</Badge>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild><Button size="sm" variant="outline"><MoreHorizontal className="h-4 w-4" /></Button></DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>عملیات</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>تغییر نقش</DropdownMenuItem>
                      <DropdownMenuItem>فعال/غیرفعال</DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600">حذف</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}


