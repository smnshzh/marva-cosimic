import Link from "next/link"
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="container py-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4">
          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-purple-500 rounded-lg flex items-center justify-center text-white font-bold text-lg">
                م
              </div>
              <h3 className="text-xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                ماروا کاسمیک
              </h3>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              بهترین لوازم آرایشی و زیبایی با کیفیت بالا و قیمت مناسب
            </p>
            <div className="flex space-x-4 space-x-reverse">
              <Link href="#" className="w-10 h-10 bg-gradient-to-br from-pink-500 to-purple-500 rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform duration-200">
                <Instagram className="h-5 w-5" />
              </Link>
              <Link href="#" className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform duration-200">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform duration-200">
                <Twitter className="h-5 w-5" />
              </Link>
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">محصولات</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/products?category=makeup" className="text-muted-foreground hover:text-foreground">
                  لوازم آرایش
                </Link>
              </li>
              <li>
                <Link href="/products?category=skincare" className="text-muted-foreground hover:text-foreground">
                  مراقبت پوست
                </Link>
              </li>
              <li>
                <Link href="/products?category=perfume" className="text-muted-foreground hover:text-foreground">
                  عطر و ادکلن
                </Link>
              </li>
              <li>
                <Link href="/products?category=hair" className="text-muted-foreground hover:text-foreground">
                  لوازم مو
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">خدمات</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-foreground">
                  درباره ما
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-foreground">
                  تماس با ما
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="text-muted-foreground hover:text-foreground">
                  نحوه ارسال
                </Link>
              </li>
              <li>
                <Link href="/returns" className="text-muted-foreground hover:text-foreground">
                  بازگشت کالا
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">تماس</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-2 space-x-reverse">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">۰۲۱-۱۲۳۴۵۶۷۸</span>
              </div>
              <div className="flex items-center space-x-2 space-x-reverse">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">info@marva-cosmic.ir</span>
              </div>
              <div className="flex items-center space-x-2 space-x-reverse">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">تهران، خیابان ولیعصر</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>© ۱۴۰۲ ماروا کاسمیک. تمامی حقوق محفوظ است.</p>
        </div>
      </div>
    </footer>
  )
}
