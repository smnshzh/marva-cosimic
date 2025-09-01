import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  Package, 
  ShoppingCart, 
  Users, 
  TrendingUp, 
  Eye,
  DollarSign,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react"
import Link from "next/link"

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">داشبورد</h1>
          <p className="text-gray-600 dark:text-gray-400">خلاصه‌ای از وضعیت فروشگاه</p>
        </div>
        <Button asChild className="bg-gradient-to-r from-pink-600 to-purple-600">
          <Link href="/admin/products/new">افزودن محصول جدید</Link>
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">کل محصولات</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">۲,۴۵۶</div>
            <p className="text-xs text-muted-foreground flex items-center mt-1">
              <ArrowUpRight className="h-3 w-3 text-green-600 mr-1" />
              +۱۲% از ماه گذشته
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">سفارشات امروز</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">۸۹</div>
            <p className="text-xs text-muted-foreground flex items-center mt-1">
              <ArrowUpRight className="h-3 w-3 text-green-600 mr-1" />
              +۸% از دیروز
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">کاربران فعال</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">۱,۲۳۴</div>
            <p className="text-xs text-muted-foreground flex items-center mt-1">
              <ArrowDownRight className="h-3 w-3 text-red-600 mr-1" />
              -۳% از هفته گذشته
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">درآمد ماهانه</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">۱۲,۵۴۰,۰۰۰</div>
            <p className="text-xs text-muted-foreground flex items-center mt-1">
              <ArrowUpRight className="h-3 w-3 text-green-600 mr-1" />
              +۲۳% از ماه گذشته
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <Card>
          <CardHeader>
            <CardTitle>سفارشات اخیر</CardTitle>
            <CardDescription>آخرین سفارشات ثبت شده</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { id: "#1234", customer: "فاطمه احمدی", amount: "۲۵۰,۰۰۰", status: "pending" },
                { id: "#1235", customer: "مریم محمدی", amount: "۱۸۰,۰۰۰", status: "confirmed" },
                { id: "#1236", customer: "زهرا کریمی", amount: "۳۲۰,۰۰۰", status: "shipped" },
                { id: "#1237", customer: "علی رضایی", amount: "۴۵۰,۰۰۰", status: "delivered" },
              ].map((order) => (
                <div key={order.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="flex items-center space-x-3 space-x-reverse">
                    <div className="w-8 h-8 bg-gradient-to-br from-pink-500 to-purple-500 rounded-full flex items-center justify-center">
                      <ShoppingCart className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <p className="font-medium">{order.id}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{order.customer}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{order.amount} تومان</p>
                    <Badge 
                      variant={order.status === 'delivered' ? 'default' : 'secondary'}
                      className="text-xs"
                    >
                      {order.status === 'pending' && 'در انتظار'}
                      {order.status === 'confirmed' && 'تایید شده'}
                      {order.status === 'shipped' && 'ارسال شده'}
                      {order.status === 'delivered' && 'تحویل داده شده'}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 text-center">
              <Button variant="outline" asChild>
                <Link href="/admin/orders">مشاهده همه سفارشات</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Top Products */}
        <Card>
          <CardHeader>
            <CardTitle>محصولات پرفروش</CardTitle>
            <CardDescription>محصولات با بیشترین فروش</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: "رژ لب مات MAC", sales: 156, views: 1234, trend: "up" },
                { name: "کرم مرطوب کننده", sales: 89, views: 987, trend: "up" },
                { name: "عطر Chanel", sales: 67, views: 756, trend: "down" },
                { name: "سایه چشم", sales: 45, views: 543, trend: "up" },
              ].map((product, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="flex items-center space-x-3 space-x-reverse">
                    <div className="w-8 h-8 bg-gradient-to-br from-pink-500 to-purple-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-medium">{product.name}</p>
                      <div className="flex items-center space-x-2 space-x-reverse text-sm text-gray-600 dark:text-gray-400">
                        <Eye className="h-3 w-3" />
                        <span>{product.views}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{product.sales} فروش</p>
                    <div className="flex items-center text-xs">
                      {product.trend === 'up' ? (
                        <ArrowUpRight className="h-3 w-3 text-green-600 mr-1" />
                      ) : (
                        <ArrowDownRight className="h-3 w-3 text-red-600 mr-1" />
                      )}
                      <span className={product.trend === 'up' ? 'text-green-600' : 'text-red-600'}>
                        {product.trend === 'up' ? '+۱۲%' : '-۵%'}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 text-center">
              <Button variant="outline" asChild>
                <Link href="/admin/products">مشاهده همه محصولات</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
