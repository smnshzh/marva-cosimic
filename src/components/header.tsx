"use client"

import Link from "next/link"
import { ShoppingCart, Search, Menu, X, Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

export function Header() {
  const { theme, setTheme } = useTheme()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const navigation = [
    { name: "خانه", href: "/" },
    { name: "محصولات", href: "/products" },
    { name: "درباره ما", href: "/about" },
    { name: "تماس", href: "/contact" },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 dark:bg-gray-900/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-gray-900/60 shadow-sm">
      <div className="container flex h-20 items-center">
        <div className="mr-6 hidden md:flex">
          <Link href="/" className="mr-8 flex items-center space-x-2 group">
            <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-purple-500 rounded-lg flex items-center justify-center text-white font-bold text-lg group-hover:scale-110 transition-transform">
              م
            </div>
            <span className="hidden font-bold text-xl sm:inline-block bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
              ماروا کاسمیک
            </span>
          </Link>
          <nav className="flex items-center space-x-8 text-sm font-medium">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="relative transition-colors hover:text-pink-600 font-semibold group"
              >
                {item.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-pink-500 to-purple-500 group-hover:w-full transition-all duration-300"></span>
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-between space-x-4 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            <div className="relative">
              <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <input
                type="search"
                placeholder="جستجو در محصولات..."
                className="w-full rounded-full border-2 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-4 py-3 pr-12 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-500 focus-visible:ring-offset-2 focus-visible:border-pink-500 disabled:cursor-not-allowed disabled:opacity-50 md:w-[350px] transition-all duration-300"
              />
            </div>
          </div>
          <nav className="flex items-center space-x-2">
            {mounted && (
              <button
                onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                className="relative rounded-full p-3 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200 group"
              >
                <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-yellow-500" />
                <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-blue-500" />
                <span className="sr-only">تغییر تم</span>
              </button>
            )}
            <Link
              href="/cart"
              className="relative rounded-full p-3 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200 group"
            >
              <ShoppingCart className="h-5 w-5 text-gray-700 dark:text-gray-300 group-hover:text-pink-600 transition-colors" />
              <span className="absolute -top-1 -right-1 bg-pink-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">۳</span>
              <span className="sr-only">سبد خرید</span>
            </Link>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="rounded-full p-3 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200 md:hidden"
            >
              {isMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </nav>
        </div>
      </div>
      {isMenuOpen && (
        <div className="border-t md:hidden">
          <nav className="flex flex-col space-y-2 p-4 text-sm">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="transition-colors hover:text-foreground/80"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}
