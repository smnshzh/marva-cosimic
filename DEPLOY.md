# 🚀 Cloudflare Deployment Guide

## روش‌های Deploy:

### 1. 🎯 Deploy ساده (توصیه شده):
```bash
npm run deploy:cloudflare
```

### 2. 🔄 Deploy خودکار (با اسکریپت):
```bash
npm run deploy:auto
```

### 3. 🌍 Deploy برای محیط‌های مختلف:
```bash
# Production
npm run deploy:cloudflare

# Staging  
npm run deploy:cloudflare:staging

# Development
npm run deploy:cloudflare:dev
```

## 📋 پیش‌نیازها:

1. **Cloudflare Account** - ثبت‌نام در https://dash.cloudflare.com/
2. **Wrangler CLI** - نصب شده (قبلاً نصب کردیم)
3. **Git Repository** - کد در GitHub موجود است

## ⚙️ تنظیمات Environment Variables:

قبل از deploy، این متغیرها رو در Cloudflare Pages اضافه کن:

```
NEXT_PUBLIC_SUPABASE_URL=https://nirjvdokgcydugicmyyk.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5pcmp2ZG9rZ2N5ZHVnaWNteXlrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY3MDc0NzksImV4cCI6MjA3MjI4MzQ3OX0.v9VIBxkBRnc5688ik-KQrzAyonbTU-vqiLZgu0zkETk
NODE_ENV=production
```

## 🔧 عیب‌یابی:

### اگر build fail شد:
```bash
# پاک کردن cache
rm -rf .next
rm -rf node_modules
npm install
npm run build:static
```

### اگر wrangler مشکل داشت:
```bash
# Login مجدد
wrangler login

# بررسی config
wrangler whoami
```

## 📱 بعد از Deploy:

- پروژه در Cloudflare Pages deploy می‌شه
- URL: `https://marva-cosmic.pages.dev`
- می‌تونی custom domain اضافه کنی
- هر بار `npm run deploy:cloudflare` بزنی، update می‌شه

## 🎉 مزایا:

✅ **سرعت بالا** - CDN جهانی Cloudflare  
✅ **امنیت** - DDoS protection و SSL  
✅ **رایگان** - 100,000 request در روز  
✅ **ساده** - یک کامند deploy  
✅ **اتوماتیک** - از GitHub sync می‌شه
