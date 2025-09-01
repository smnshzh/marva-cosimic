"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, Eye } from "lucide-react"

const mockOrders = [
  { id: "#1001", customer: "زهرا محمدی", total: 450000, status: "pending", date: "1403/06/10" },
  { id: "#1002", customer: "علی رضایی", total: 780000, status: "confirmed", date: "1403/06/10" },
  { id: "#1003", customer: "نگین امامی", total: 320000, status: "shipped", date: "1403/06/09" },
  { id: "#1004", customer: "شادی قربانی", total: 210000, status: "delivered", date: "1403/06/08" },
]

export default function AdminOrdersPage() {
  const [search, setSearch] = useState("")

  const filtered = mockOrders.filter((o) =>
    o.id.includes(search) || o.customer.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">مدیریت سفارشات</h1>
          <p className="text-gray-600 dark:text-gray-400">بررسی و پیگیری سفارش‌ها</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>جستجو و فیلتر</CardTitle>
          <CardDescription>سفارش موردنظر را پیدا کنید</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input placeholder="شماره یا نام مشتری" value={search} onChange={(e) => setSearch(e.target.value)} className="pr-10" />
            </div>
            <Button variant="outline" className="justify-center"><Filter className="h-4 w-4 ml-2" />فیلترها</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>سفارشات</CardTitle>
          <CardDescription>لیست آخرین سفارش‌ها</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {filtered.map((o) => (
              <div key={o.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="flex items-center space-x-4 space-x-reverse">
                  <div>
                    <p className="font-medium">{o.id}</p>
                    <p className="text-sm text-gray-500">{o.customer} • {o.date}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 space-x-reverse">
                  <p className="font-medium">{o.total.toLocaleString()} تومان</p>
                  <Badge variant={o.status === 'delivered' ? 'default' : 'secondary'} className="text-xs">
                    {o.status === 'pending' && 'در انتظار'}
                    {o.status === 'confirmed' && 'تایید شده'}
                    {o.status === 'shipped' && 'ارسال شده'}
                    {o.status === 'delivered' && 'تحویل داده شده'}
                  </Badge>
                  <Button asChild size="sm" variant="outline"><Link href={`/admin/orders/${o.id}`}><Eye className="h-4 w-4 ml-2" />جزئیات</Link></Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}


