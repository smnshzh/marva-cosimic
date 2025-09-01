# ماروا کاسمیک - فروشگاه لوازم آرایشی و زیبایی

یک فروشگاه آنلاین زیبا و مدرن برای لوازم آرایشی و زیبایی که با Next.js 15، Cloudflare D1، و S3 ساخته شده است.

## ویژگی‌ها

- 🛍️ **فروشگاه کامل**: محصولات، سبد خرید، و سیستم سفارش
- 🎨 **طراحی زیبا**: رابط کاربری مدرن و ریسپانسیو
- 🌙 **تم تاریک/روشن**: پشتیبانی از تم تاریک و روشن
- 🔍 **جستجو پیشرفته**: فیلتر بر اساس دسته‌بندی و جستجو
- 📱 **موبایل فرست**: طراحی بهینه برای موبایل
- ⚡ **عملکرد بالا**: بهینه‌سازی شده برای سرعت
- 🗄️ **پایگاه داده**: استفاده از Cloudflare D1
- ☁️ **ذخیره‌سازی**: استفاده از S3 برای تصاویر

## تکنولوژی‌های استفاده شده

- **Frontend**: Next.js 15, React 18, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui
- **Database**: Cloudflare D1 (SQLite)
- **Storage**: AWS S3 (Liara)
- **Deployment**: Cloudflare Pages
- **State Management**: React Hooks
- **Icons**: Lucide React
- **Forms**: React Hook Form, Zod

## نصب و راه‌اندازی

### پیش‌نیازها

- Node.js 18+ 
- npm یا yarn
- حساب Cloudflare
- حساب Liara (برای S3)

### ۱. کلون کردن پروژه

```bash
git clone <repository-url>
cd marva-cosmic
```

### ۲. نصب وابستگی‌ها

```bash
npm install
```

### ۳. تنظیم متغیرهای محیطی

فایل `.env.local` را ایجاد کنید:

```env
# Liara S3 Configuration
LIARA_ENDPOINT=your-liara-endpoint
LIARA_ACCESS_KEY=your-access-key
LIARA_SECRET_KEY=your-secret-key
LIARA_BUCKET_NAME=your-bucket-name

# Database
DATABASE_URL=your-database-url

# Next.js
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### ۴. راه‌اندازی پایگاه داده

```bash
# ایجاد جداول
npm run db:generate

# اجرای مایگریشن‌ها
npm run db:migrate

# مشاهده پایگاه داده (اختیاری)
npm run db:studio
```

### ۵. اجرای پروژه

```bash
# حالت توسعه
npm run dev

# ساخت برای تولید
npm run build

# اجرای نسخه تولید
npm start
```

## ساختار پروژه

```
marva-cosmic/
├── src/
│   ├── app/                 # App Router
│   │   ├── api/             # API Routes
│   │   ├── products/        # صفحات محصولات
│   │   └── globals.css      # استایل‌های全局
│   ├── components/          # کامپوننت‌های React
│   │   ├── ui/              # کامپوننت‌های UI
│   │   ├── header.tsx       # هدر سایت
│   │   └── footer.tsx       # فوتر سایت
│   └── lib/                 # توابع کمکی
│       ├── db.ts            # تنظیمات پایگاه داده
│       ├── s3.ts            # تنظیمات S3
│       └── utils.ts         # توابع کمکی
├── drizzle/                 # مایگریشن‌های پایگاه داده
├── public/                  # فایل‌های استاتیک
└── wrangler.toml            # تنظیمات Cloudflare
```

## استقرار روی Cloudflare

### ۱. نصب Wrangler CLI

```bash
npm install -g wrangler
```

### ۲. ورود به Cloudflare

```bash
wrangler login
```

### ۳. ایجاد پایگاه داده D1

```bash
wrangler d1 create marva-cosmic-db
```

### ۴. به‌روزرسانی wrangler.toml

شناسه پایگاه داده را در فایل `wrangler.toml` قرار دهید.

### ۵. استقرار

```bash
wrangler deploy
```

## API Endpoints

### محصولات

- `GET /api/products` - دریافت لیست محصولات
- `POST /api/products` - ایجاد محصول جدید
- `GET /api/products/[id]` - دریافت محصول خاص

### سفارشات

- `GET /api/orders` - دریافت لیست سفارشات
- `POST /api/orders` - ایجاد سفارش جدید
- `GET /api/orders/[id]` - دریافت سفارش خاص

### سبد خرید

- `GET /api/cart` - دریافت سبد خرید
- `POST /api/cart` - افزودن به سبد خرید
- `DELETE /api/cart/[id]` - حذف از سبد خرید

## ویژگی‌های آینده

- [ ] سیستم احراز هویت
- [ ] سیستم پرداخت
- [ ] سیستم نظرات و امتیازدهی
- [ ] سیستم تخفیف و کوپن
- [ ] پنل مدیریت
- [ ] سیستم اطلاع‌رسانی
- [ ] بهینه‌سازی SEO

## مشارکت

برای مشارکت در پروژه:

1. پروژه را Fork کنید
2. یک شاخه جدید ایجاد کنید (`git checkout -b feature/amazing-feature`)
3. تغییرات را Commit کنید (`git commit -m 'Add some amazing feature'`)
4. به شاخه Push کنید (`git push origin feature/amazing-feature`)
5. یک Pull Request ایجاد کنید

## لایسنس

این پروژه تحت لایسنس MIT منتشر شده است.

## پشتیبانی

برای سوالات و مشکلات، لطفاً یک Issue ایجاد کنید یا با ما تماس بگیرید.

---

**ماروا کاسمیک** - زیبایی شما، اولویت ما ✨
