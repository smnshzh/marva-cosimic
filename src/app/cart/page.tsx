"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft, CreditCard, Truck, Shield } from "lucide-react"
import Link from "next/link"
import { formatPrice } from "@/lib/utils"

// Mock cart data
const mockCartItems = [
  {
    id: "1",
    product: {
      id: "1",
      name: "رژ لب مات برند MAC",
      description: "رژ لب مات با رنگ زیبا و ماندگاری بالا",
      price: 450000,
      originalPrice: 550000,
      imageUrl: "/placeholder.jpg",
      brand: "MAC",
      category: "لوازم آرایش"
    },
    quantity: 2
  },
  {
    id: "2",
    product: {
      id: "2",
      name: "کرم مرطوب کننده صورت",
      description: "کرم مرطوب کننده با ویتامین E",
      price: 320000,
      originalPrice: null,
      imageUrl: "/placeholder.jpg",
      brand: "Neutrogena",
      category: "مراقبت پوست"
    },
    quantity: 1
  },
  {
    id: "3",
    product: {
      id: "3",
      name: "عطر زنانه Chanel",
      description: "عطر لوکس با رایحه گل‌های بهاری",
      price: 2800000,
      originalPrice: 3200000,
      imageUrl: "/placeholder.jpg",
      brand: "Chanel",
      category: "عطر و ادکلن"
    },
    quantity: 1
  }
]

export default function CartPage() {
  const [cartItems, setCartItems] = useState(mockCartItems)
  const [couponCode, setCouponCode] = useState("")

  const updateQuantity = (itemId: string, newQuantity: number) => {
    if (newQuantity < 1) return
    setCartItems(items =>
      items.map(item =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    )
  }

  const removeItem = (itemId: string) => {
    setCartItems(items => items.filter(item => item.id !== itemId))
  }

  const subtotal = cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0)
  const discount = cartItems.reduce((sum, item) => {
    if (item.product.originalPrice) {
      return sum + ((item.product.originalPrice - item.product.price) * item.quantity)
    }
    return sum
  }, 0)
  const shipping = subtotal > 1000000 ? 0 : 50000
  const total = subtotal + shipping

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 space-x-reverse mb-8">
          <Link href="/" className="text-muted-foreground hover:text-foreground">
            خانه
          </Link>
          <span className="text-muted-foreground">/</span>
          <span className="text-foreground font-medium">سبد خرید</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center space-x-2 space-x-reverse mb-6">
              <ShoppingBag className="h-6 w-6 text-pink-600" />
              <h1 className="text-2xl font-bold">سبد خرید</h1>
              <Badge variant="secondary" className="text-sm">
                {cartItems.length} محصول
              </Badge>
            </div>

            {cartItems.length === 0 ? (
              <Card className="text-center py-12">
                <CardContent>
                  <ShoppingBag className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">سبد خرید شما خالی است</h3>
                  <p className="text-muted-foreground mb-6">
                    محصولات مورد نظر خود را به سبد خرید اضافه کنید
                  </p>
                  <Button asChild className="bg-gradient-to-r from-pink-600 to-purple-600">
                    <Link href="/products">
                      مشاهده محصولات
                      <ArrowLeft className="mr-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <Card key={item.id} className="overflow-hidden">
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-4 space-x-reverse">
                        {/* Product Image */}
                        <div className="w-20 h-20 bg-gradient-to-br from-pink-100 to-purple-100 rounded-lg flex-shrink-0" />
                        
                        {/* Product Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h3 className="font-semibold text-lg mb-1">{item.product.name}</h3>
                              <p className="text-sm text-muted-foreground mb-2">
                                {item.product.description}
                              </p>
                              <div className="flex items-center space-x-4 space-x-reverse">
                                <Badge variant="secondary" className="text-xs">
                                  {item.product.brand}
                                </Badge>
                                <Badge variant="outline" className="text-xs">
                                  {item.product.category}
                                </Badge>
                              </div>
                            </div>
                            
                            {/* Price */}
                            <div className="text-left ml-4">
                              <div className="text-lg font-bold text-green-600">
                                {formatPrice(item.product.price)}
                              </div>
                              {item.product.originalPrice && (
                                <div className="text-sm text-muted-foreground line-through">
                                  {formatPrice(item.product.originalPrice)}
                                </div>
                              )}
                            </div>
                          </div>
                          
                          {/* Quantity Controls */}
                          <div className="flex items-center justify-between mt-4">
                            <div className="flex items-center space-x-2 space-x-reverse">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="w-8 h-8 p-0"
                              >
                                <Minus className="h-4 w-4" />
                              </Button>
                              <span className="w-12 text-center font-medium">{item.quantity}</span>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="w-8 h-8 p-0"
                              >
                                <Plus className="h-4 w-4" />
                              </Button>
                            </div>
                            
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeItem(item.id)}
                              className="text-red-500 hover:text-red-700 hover:bg-red-50"
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              حذف
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="text-xl">خلاصه سفارش</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Coupon Code */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">کد تخفیف</label>
                  <div className="flex space-x-2 space-x-reverse">
                    <Input
                      placeholder="کد تخفیف خود را وارد کنید"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                    />
                    <Button variant="outline" size="sm">
                      اعمال
                    </Button>
                  </div>
                </div>

                {/* Price Breakdown */}
                <div className="space-y-3 pt-4 border-t">
                  <div className="flex justify-between">
                    <span>جمع کل</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>تخفیف</span>
                      <span>-{formatPrice(discount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>هزینه ارسال</span>
                    <span>{shipping === 0 ? "رایگان" : formatPrice(shipping)}</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold border-t pt-3">
                    <span>مبلغ قابل پرداخت</span>
                    <span className="text-green-600">{formatPrice(total)}</span>
                  </div>
                </div>

                {/* Checkout Button */}
                <Button 
                  className="w-full bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white py-3 text-lg font-semibold rounded-lg"
                  disabled={cartItems.length === 0}
                >
                  <CreditCard className="mr-2 h-5 w-5" />
                  تکمیل سفارش
                </Button>

                {/* Features */}
                <div className="space-y-3 pt-4 border-t">
                  <div className="flex items-center space-x-2 space-x-reverse text-sm text-muted-foreground">
                    <Truck className="h-4 w-4" />
                    <span>ارسال رایگان برای خرید بالای ۱ میلیون تومان</span>
                  </div>
                  <div className="flex items-center space-x-2 space-x-reverse text-sm text-muted-foreground">
                    <Shield className="h-4 w-4" />
                    <span>ضمانت اصالت کالا</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  )
}
