"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"

export default function TestDBPage() {
  const [status, setStatus] = useState<string>("در حال تست...")
  const [error, setError] = useState<string | null>(null)
  const [data, setData] = useState<{categories: unknown[], products: unknown[], insertTest?: unknown} | null>(null)

  useEffect(() => {
    async function testDB() {
      try {
        setStatus("تست اتصال به Supabase...")
        const supabase = createClient()
        
        // Test 1: Check if we can connect
        setStatus("بررسی جدول categories...")
        const { data: categories, error: catError } = await supabase
          .from('categories')
          .select('*')
          .limit(5)
        
        if (catError) {
          console.error('Categories error:', catError)
          throw new Error(`خطا در جدول categories: ${catError.message} (Code: ${catError.code})`)
        }
        
        setStatus("بررسی جدول products...")
        const { data: products, error: prodError } = await supabase
          .from('products')
          .select('*')
          .limit(5)
        
        if (prodError) {
          console.error('Products error:', prodError)
          throw new Error(`خطا در جدول products: ${prodError.message} (Code: ${prodError.code})`)
        }
        
        setStatus("تست insert دسته‌بندی...")
        
        // Test insert
        const testCategory = {
          name: 'تست دسته‌بندی',
          description: 'این یک دسته‌بندی تست است',
          is_active: true
        }
        
        const { data: insertData, error: insertError } = await supabase
          .from('categories')
          .insert(testCategory)
          .select()
          .single()
        
        if (insertError) {
          console.error('Insert error:', insertError)
          throw new Error(`خطا در insert: ${insertError.message} (Code: ${insertError.code})`)
        }
        
        setStatus("تست موفق!")
        setData({
          categories: categories || [],
          products: products || [],
          insertTest: insertData
        })
        
      } catch (e) {
        setError(e instanceof Error ? e.message : 'خطای نامشخص')
        setStatus("تست ناموفق!")
      }
    }
    
    testDB()
  }, [])

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">تست اتصال به Database</h1>
      
      <div className="mb-4">
        <p className="font-medium">وضعیت: {status}</p>
        {error && (
          <div className="mt-2 p-3 bg-red-100 text-red-700 rounded">
            <strong>خطا:</strong> {error}
          </div>
        )}
      </div>
      
      {data && (
        <div className="space-y-4">
          <div>
            <h2 className="text-lg font-semibold mb-2">دسته‌بندی‌ها ({data.categories.length})</h2>
            <pre className="bg-gray-100 p-3 rounded text-sm overflow-auto">
              {JSON.stringify(data.categories, null, 2)}
            </pre>
          </div>
          
                     <div>
             <h2 className="text-lg font-semibold mb-2">محصولات ({data.products.length})</h2>
             <pre className="bg-gray-100 p-3 rounded text-sm overflow-auto">
               {JSON.stringify(data.products, null, 2)}
             </pre>
           </div>
           
                       {data.insertTest !== undefined && (
             <div>
               <h2 className="text-lg font-semibold mb-2">تست Insert موفق</h2>
               <pre className="bg-green-100 p-3 rounded text-sm overflow-auto">
                 {JSON.stringify(data.insertTest, null, 2)}
               </pre>
             </div>
           )}
        </div>
      )}
    </div>
  )
}
