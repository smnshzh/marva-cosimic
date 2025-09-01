"use client"

import React, { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Upload, X, Image as ImageIcon } from "lucide-react"
import Image from "next/image"

interface ImageUploadProps {
  value: string[]
  onChange: (urls: string[]) => void
  maxImages?: number
  disabled?: boolean
}

interface UploadedImage {
  url: string
  key: string
  uploading?: boolean
}

export function ImageUpload({ 
  value = [], 
  onChange, 
  maxImages = 5, 
  disabled = false 
}: ImageUploadProps) {
  const [images, setImages] = useState<UploadedImage[]>(
    value.map(url => ({ url, key: url.split('/').pop() || '' }))
  )
  const [uploading, setUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    if (!files.length) return

    if (images.length + files.length > maxImages) {
      alert(`حداکثر ${maxImages} تصویر مجاز است`)
      return
    }

    setUploading(true)

    for (const file of files) {
      try {
        // Add temporary image with uploading state
        const tempId = Date.now() + Math.random()
        const tempImage: UploadedImage = {
          url: URL.createObjectURL(file),
          key: `temp-${tempId}`,
          uploading: true
        }
        
        setImages(prev => [...prev, tempImage])

        const formData = new FormData()
        formData.append('file', file)

        const response = await fetch('/api/storage/upload', {
          method: 'POST',
          body: formData,
        })

        const result = await response.json()

        if (!response.ok) {
          throw new Error(result.error || 'خطا در آپلود')
        }

        // Replace temp image with actual uploaded image
        setImages(prev => prev.map(img => 
          img.key === `temp-${tempId}` 
            ? { url: result.url, key: result.key, uploading: false }
            : img
        ))

      } catch (error) {
        console.error('Upload error:', error)
        alert('خطا در آپلود تصویر')
        
        // Remove failed upload
        setImages(prev => prev.filter(img => !img.key.startsWith(`temp-${tempId}`)))
      }
    }

    setUploading(false)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const removeImage = async (imageToRemove: UploadedImage) => {
    try {
      // Don't try to delete temp images
      if (!imageToRemove.key.startsWith('temp-') && imageToRemove.key !== imageToRemove.url.split('/').pop()) {
        await fetch('/api/storage/delete', {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ key: imageToRemove.key }),
        })
      }

      const newImages = images.filter(img => img.key !== imageToRemove.key)
      setImages(newImages)
      onChange(newImages.filter(img => !img.uploading).map(img => img.url))
    } catch (error) {
      console.error('Delete error:', error)
      alert('خطا در حذف تصویر')
    }
  }

  // Update parent component when images change
  useEffect(() => {
    const validImages = images.filter(img => !img.uploading)
    onChange(validImages.map(img => img.url))
  }, [images, onChange])

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => fileInputRef.current?.click()}
          disabled={disabled || uploading || images.length >= maxImages}
          className="flex items-center gap-2"
        >
          <Upload className="h-4 w-4" />
          {uploading ? 'در حال آپلود...' : 'انتخاب تصویر'}
        </Button>
        <span className="text-sm text-gray-500">
          {images.length} از {maxImages} تصویر
        </span>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        onChange={handleFileSelect}
        className="hidden"
      />

      {images.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((image, index) => (
            <Card key={image.key} className="relative group">
              <CardContent className="p-2">
                <div className="aspect-square relative bg-gray-100 rounded-lg overflow-hidden">
                  {image.uploading ? (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-pink-600"></div>
                    </div>
                  ) : (
                    <>
                      <Image
                        src={image.url}
                        alt={`تصویر ${index + 1}`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        className="absolute top-1 right-1 h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => removeImage(image)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {images.length === 0 && !uploading && (
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <ImageIcon className="h-12 w-12 text-gray-400 mb-4" />
            <p className="text-gray-500 text-center">
              هنوز تصویری انتخاب نشده
              <br />
              <span className="text-sm">حداکثر {maxImages} تصویر</span>
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}


