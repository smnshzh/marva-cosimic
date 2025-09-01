import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Star, ShoppingCart, Heart } from "lucide-react"
import Link from "next/link"

const featuredProducts = [
  {
    id: "1",
    name: "رژ لب مات",
    description: "رژ لب مات با کیفیت بالا و رنگ‌های متنوع",
    price: 850000,
    originalPrice: 1200000,
    image: "/api/placeholder/300/300",
    category: "makeup",
    brand: "MAC",
    rating: 4.8,
  },
  {
    id: "2",
    name: "کرم مرطوب کننده",
    description: "کرم مرطوب کننده برای پوست‌های خشک",
    price: 650000,
    originalPrice: 850000,
    image: "/api/placeholder/300/300",
    category: "skincare",
    brand: "Neutrogena",
    rating: 4.6,
  },
  {
    id: "3",
    name: "عطر زنانه",
    description: "عطر زنانه با رایحه گل‌های بهاری",
    price: 2500000,
    originalPrice: 3200000,
    image: "/api/placeholder/300/300",
    category: "perfume",
    brand: "Chanel",
    rating: 4.9,
  },
  {
    id: "4",
    name: "سشوار حرفه‌ای",
    description: "سشوار حرفه‌ای با قدرت بالا",
    price: 1800000,
    originalPrice: 2200000,
    image: "/api/placeholder/300/300",
    category: "hair",
    brand: "Dyson",
    rating: 4.7,
  },
]

const categories = [
  { name: "لوازم آرایش", href: "/products?category=makeup", image: "/api/placeholder/200/200" },
  { name: "مراقبت پوست", href: "/products?category=skincare", image: "/api/placeholder/200/200" },
  { name: "عطر و ادکلن", href: "/products?category=perfume", image: "/api/placeholder/200/200" },
  { name: "لوازم مو", href: "/products?category=hair", image: "/api/placeholder/200/200" },
]

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative min-h-[80vh] bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 dark:from-pink-950/20 dark:via-purple-950/20 dark:to-blue-950/20 overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-pink-300/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-300/20 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-blue-300/10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative container mx-auto px-4 py-32">
          <div className="text-center space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl md:text-7xl font-bold text-foreground leading-tight">
                زیبایی شما، <span className="bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">اولویت ما</span>
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                بهترین لوازم آرایشی و زیبایی با کیفیت بالا و قیمت مناسب
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button size="lg" className="bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105" asChild>
                <Link href="/products">
                  مشاهده محصولات
                  <ArrowLeft className="mr-2 h-5 w-5" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="border-2 border-pink-300 text-pink-600 hover:bg-pink-50 px-8 py-4 text-lg font-semibold rounded-full transition-all duration-300" asChild>
                <Link href="/about">درباره ما</Link>
              </Button>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
              <div className="text-center">
                <div className="text-3xl font-bold text-pink-600">۱۰۰۰+</div>
                <div className="text-muted-foreground">محصول متنوع</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600">۵۰,۰۰۰+</div>
                <div className="text-muted-foreground">مشتری راضی</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">۹۸%</div>
                <div className="text-muted-foreground">رضایت مشتریان</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              دسته‌بندی محصولات
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              محصولات متنوع و با کیفیت در دسته‌بندی‌های مختلف
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {categories.map((category, index) => (
              <Card key={category.name} className="group cursor-pointer hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
                <CardContent className="p-6 text-center">
                  <div className="relative mb-6">
                    <div className="aspect-square bg-gradient-to-br from-pink-100 to-purple-100 dark:from-pink-900/20 dark:to-purple-900/20 rounded-2xl mb-4 group-hover:scale-110 transition-transform duration-300 flex items-center justify-center">
                      <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-purple-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                        {index + 1}
                      </div>
                    </div>
                  </div>
                  <h3 className="font-bold text-lg text-foreground group-hover:text-pink-600 transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-2">
                    محصولات متنوع و با کیفیت
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 dark:from-pink-950/10 dark:via-purple-950/10 dark:to-blue-950/10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              محصولات ویژه
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              بهترین محصولات با تخفیف ویژه
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <Card key={product.id} className="group hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border-0 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm overflow-hidden">
                <CardHeader className="p-0">
                  <div className="relative">
                    <div className="aspect-square bg-gradient-to-br from-pink-100 to-purple-100 dark:from-pink-900/20 dark:to-purple-900/20 group-hover:scale-110 transition-transform duration-300" />
                    {product.originalPrice && (
                      <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                        {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% تخفیف
                      </div>
                    )}
                    <div className="absolute top-4 left-4">
                      <Button variant="ghost" size="sm" className="h-10 w-10 p-0 bg-white/80 hover:bg-white rounded-full">
                        <Heart className="h-5 w-5 text-red-500" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <Badge variant="secondary" className="text-xs bg-gradient-to-r from-pink-500 to-purple-500 text-white">
                      {product.brand}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg mb-3 line-clamp-2">{product.name}</CardTitle>
                  <CardDescription className="text-sm mb-4 line-clamp-2 text-muted-foreground">
                    {product.description}
                  </CardDescription>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
                      ))}
                    </div>
                    <span className="text-sm font-medium">{product.rating}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-xl font-bold text-green-600">{product.price.toLocaleString()} تومان</p>
                      {product.originalPrice && (
                        <p className="text-sm text-muted-foreground line-through">
                          {product.originalPrice.toLocaleString()} تومان
                        </p>
                      )}
                    </div>
                    <Button size="sm" className="bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white rounded-full px-6">
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      افزودن
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-12">
            <Button variant="outline" size="lg" className="border-2 border-pink-300 text-pink-600 hover:bg-pink-50 px-8 py-4 text-lg font-semibold rounded-full transition-all duration-300" asChild>
              <Link href="/products">مشاهده همه محصولات</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              چرا ماروا کاسمیک؟
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              ما متعهد به ارائه بهترین خدمات به مشتریان خود هستیم
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center group">
              <div className="relative mb-8">
                <div className="w-24 h-24 bg-gradient-to-br from-pink-500 to-purple-500 rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <Star className="h-12 w-12 text-white" />
                </div>
                <div className="absolute inset-0 w-24 h-24 bg-gradient-to-br from-pink-500 to-purple-500 rounded-full blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-300"></div>
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4 group-hover:text-pink-600 transition-colors">
                کیفیت بالا
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                تمام محصولات ما از برندهای معتبر و با کیفیت بالا تهیه می‌شوند
              </p>
            </div>
            
            <div className="text-center group">
              <div className="relative mb-8">
                <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <ShoppingCart className="h-12 w-12 text-white" />
                </div>
                <div className="absolute inset-0 w-24 h-24 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-300"></div>
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4 group-hover:text-purple-600 transition-colors">
                ارسال سریع
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                ارسال در کمترین زمان ممکن به سراسر کشور
              </p>
            </div>
            
            <div className="text-center group">
              <div className="relative mb-8">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-green-500 rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <Heart className="h-12 w-12 text-white" />
                </div>
                <div className="absolute inset-0 w-24 h-24 bg-gradient-to-br from-blue-500 to-green-500 rounded-full blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-300"></div>
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4 group-hover:text-blue-600 transition-colors">
                پشتیبانی ۲۴/۷
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                پشتیبانی شبانه‌روزی برای پاسخگویی به سوالات شما
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
