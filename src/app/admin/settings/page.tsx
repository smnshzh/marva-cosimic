"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function AdminSettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">تنظیمات</h1>
        <p className="text-gray-600 dark:text-gray-400">پیکربندی فروشگاه</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>اطلاعات فروشگاه</CardTitle>
          <CardDescription>نام و برند</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm">نام فروشگاه</label>
            <Input placeholder="ماروا کازمیک" />
          </div>
          <div>
            <label className="text-sm">دامنه</label>
            <Input placeholder="https://example.com" />
          </div>
          <Button>ذخیره</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>پرداخت (Placeholder)</CardTitle>
          <CardDescription>اتصال درگاه در آینده</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-24 bg-gray-100 dark:bg-gray-800 rounded" />
        </CardContent>
      </Card>
    </div>
  )
}


