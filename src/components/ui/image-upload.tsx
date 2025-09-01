"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Plus, X, Image as ImageIcon, Link } from "lucide-react"
import Image from "next/image"

interface ImageUploadProps {
  value: string[]
  onChange: (urls: string[]) => void
  maxImages?: number
  disabled?: boolean
}

export function ImageUpload({ 
  value = [], 
  onChange, 
  maxImages = 5, 
  disabled = false 
}: ImageUploadProps) {
  const [newImageUrl, setNewImageUrl] = useState("")

  const addImageUrl = () => {
    if (!newImageUrl.trim()) return
    
    if (value.length >= maxImages) {
      alert(`حداکثر ${maxImages} تصویر مجاز است`)
      return
    }

    // Simple URL validation
    try {
      new URL(newImageUrl)
    } catch {
      alert('لطفاً یک URL معتبر وارد کنید')
      return
    }

    onChange([...value, newImageUrl])
    setNewImageUrl("")
  }

  const removeImage = (indexToRemove: number) => {
    const newImages = value.filter((_, index) => index !== indexToRemove)
    onChange(newImages)
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <div className="flex gap-2">
          <Input
            type="url"
            placeholder="آدرس تصویر را وارد کنید (مثل: https://example.com/image.jpg)"
            value={newImageUrl}
            onChange={(e) => setNewImageUrl(e.target.value)}
            disabled={disabled || value.length >= maxImages}
          />
          <Button
            type="button"
            onClick={addImageUrl}
            disabled={disabled || !newImageUrl.trim() || value.length >= maxImages}
            className="flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            افزودن
          </Button>
        </div>
        <span className="text-sm text-gray-500">
          {value.length} از {maxImages} تصویر
        </span>
      </div>

      {value.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {value.map((imageUrl, index) => (
            <Card key={index} className="relative group">
              <CardContent className="p-2">
                <div className="aspect-square relative bg-gray-100 rounded-lg overflow-hidden">
                  <Image
                    src={imageUrl}
                    alt={`تصویر ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      target.style.display = 'none'
                    }}
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    className="absolute top-1 right-1 h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => removeImage(index)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {value.length === 0 && (
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Link className="h-12 w-12 text-gray-400 mb-4" />
            <p className="text-gray-500 text-center">
              لینک تصاویر محصول را اضافه کنید
              <br />
              <span className="text-sm">حداکثر {maxImages} تصویر</span>
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}


