# راهنمای راه‌اندازی پروژه

## ۱. تنظیم متغیرهای محیطی
فایل `.env.local` را در پوشه اصلی پروژه ایجاد کنید و متغیرهای زیر را تنظیم کنید:

```env
# Supabase PostgreSQL Database
DATABASE_URL=postgresql://postgres:[YOUR-PASSWORD]@db.nrzrxzdtbujblkgkyohv.supabase.co:5432/postgres

# Liara S3 Configuration
LIARA_ENDPOINT=https://your-liara-endpoint.liara.ir
LIARA_ACCESS_KEY=your-access-key-here
LIARA_SECRET_KEY=your-secret-key-here
LIARA_BUCKET_NAME=your-bucket-name

# Next.js
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

**نکته مهم:** `[YOUR-PASSWORD]` را با رمز عبور واقعی Supabase خود جایگزین کنید.

## ۲. راه‌اندازی پایگاه داده
پس از تنظیم متغیرهای محیطی، دستورات زیر را اجرا کنید:

```bash
# تولید migration files
npm run db:generate

# اجرای migration روی دیتابیس
npm run db:migrate

# مشاهده دیتابیس (اختیاری)
npm run db:studio
```

## ۳. اجرای پروژه
```bash
npm run dev
```

سایت روی `http://localhost:3000` در دسترس خواهد بود.

## ۴. استقرار روی Cloudflare
```bash
# Build پروژه
npm run build

# استقرار با Wrangler
wrangler pages deploy out
```

## ۵. ویژگی‌های پروژه
- ✅ Next.js 15 با App Router
- ✅ PostgreSQL (Supabase) برای دیتابیس
- ✅ Drizzle ORM برای مدیریت دیتابیس
- ✅ Tailwind CSS برای طراحی
- ✅ shadcn/ui برای کامپوننت‌ها
- ✅ S3 (Liara) برای ذخیره فایل‌ها
- ✅ تم تاریک/روشن
- ✅ پشتیبانی از RTL (فارسی)
- ✅ صفحه محصولات با فیلتر و جستجو
- ✅ سبد خرید کامل
- ✅ API endpoints
- ✅ Responsive design

## ۶. ساختار دیتابیس
- **products**: محصولات
- **categories**: دسته‌بندی‌ها
- **users**: کاربران
- **orders**: سفارشات
- **order_items**: آیتم‌های سفارش
- **cart_items**: آیتم‌های سبد خرید
