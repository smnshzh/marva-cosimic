# Environment Variables for Cloudflare Pages

وقتی که پروژه رو در Cloudflare Pages deploy می‌کنی، این متغیرها رو در تنظیمات environment variables اضافه کن:

## ضروری (Required):

```
NEXT_PUBLIC_SUPABASE_URL=https://nirjvdokgcydugicmyyk.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5pcmp2ZG9rZ2N5ZHVnaWNteXlrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY3MDc0NzksImV4cCI6MjA3MjI4MzQ3OX0.v9VIBxkBRnc5688ik-KQrzAyonbTU-vqiLZgu0zkETk
NODE_ENV=production
```

## اختیاری (Optional):

```
NEXT_PUBLIC_APP_NAME=Marva Cosmic
NEXT_PUBLIC_APP_DESCRIPTION=فروشگاه لوازم آرایشی و بهداشتی
DEBUG=false
```

## نحوه اضافه کردن در Cloudflare Pages:

1. برو به Cloudflare Dashboard
2. انتخاب پروژه‌ات
3. تب "Settings" 
4. قسمت "Environment variables"
5. "Add variable" رو بزن
6. هر کدوم از متغیرهای بالا رو اضافه کن

## نکته مهم:
- حتماً `NEXT_PUBLIC_SUPABASE_URL` و `NEXT_PUBLIC_SUPABASE_ANON_KEY` رو اضافه کن
- اگر Supabase URL یا Key متفاوتی داری، اون رو استفاده کن
- بعد از اضافه کردن، "Redeploy" رو بزن
