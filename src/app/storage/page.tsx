'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';

export default function FileManager() {
  const [files, setFiles] = useState<Array<{Key: string, Size?: number, LastModified?: string}>>([]);
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const fetchFiles = async () => {
    try {
      const res = await fetch('/api/storage/list-files');
      const data = await res.json();
      setFiles(data.files || []);
    } catch (error) {
      console.error('Error fetching files:', error);
      setMessage('خطا در دریافت فایل‌ها');
    }
  };

  const uploadFile = async () => {
    if (!file) return;
    setLoading(true);
    setMessage('');
    
    try {
      const formData = new FormData();
      formData.append('file', file);
      const res = await fetch('/api/storage/upload', {
        method: 'POST',
        body: formData,
      });
      
      const result = await res.json();
      
      if (res.ok) {
        setMessage('آپلود موفقیت‌آمیز بود');
        fetchFiles();
        setFile(null);
        // Reset file input
        const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
        if (fileInput) fileInput.value = '';
      } else {
        setMessage(result.error || 'خطا در آپلود فایل');
      }
    } catch (error) {
      console.error('Upload error:', error);
      setMessage('خطا در آپلود فایل');
    } finally {
      setLoading(false);
    }
  };

  const deleteFile = async (key: string) => {
    try {
      const res = await fetch('/api/storage/delete', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key }),
      });
      
      if (res.ok) {
        setMessage('فایل با موفقیت حذف شد');
        fetchFiles();
      } else {
        setMessage('خطا در حذف فایل');
      }
    } catch (error) {
      console.error('Delete error:', error);
      setMessage('خطا در حذف فایل');
    }
  };

  const downloadFile = async (key: string) => {
    try {
      const res = await fetch('/api/storage/presigned', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key }),
      });
      const data = await res.json();
      if (res.ok) {
        window.open(data.url, '_blank');
      } else {
        setMessage('خطا در دریافت لینک دانلود');
      }
    } catch (error) {
      console.error('Download error:', error);
      setMessage('خطا در دریافت لینک دانلود');
    }
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">مدیریت فایل‌ها - تست S3</h1>

      {message && (
        <div className={`p-3 mb-4 rounded ${message.includes('خطا') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
          {message}
        </div>
      )}

      <div className="flex gap-2 mb-6">
        <Input 
          type="file" 
          onChange={(e) => setFile(e.target.files?.[0] || null)} 
          accept="image/*"
          className="flex-1"
        />
        <Button onClick={uploadFile} disabled={loading || !file}>
          {loading ? 'در حال آپلود...' : 'آپلود فایل'}
        </Button>
      </div>

      <div className="grid gap-3">
        {files.length === 0 ? (
          <p className="text-gray-500 text-center py-8">هیچ فایلی یافت نشد</p>
        ) : (
          files.map((file) => (
            <Card key={file.Key} className="p-3">
              <CardContent className="flex items-center justify-between p-0">
                <div className="flex-1">
                  <p className="font-medium">{file.Key}</p>
                  <p className="text-sm text-gray-500">
                    {file.Size ? `${Math.round(file.Size / 1024)} KB` : ''} • 
                    {file.LastModified ? new Date(file.LastModified).toLocaleDateString('fa-IR') : ''}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => downloadFile(file.Key)}>
                    دانلود
                  </Button>
                  <Button variant="destructive" size="sm" onClick={() => deleteFile(file.Key)}>
                    حذف
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
