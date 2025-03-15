import Image from "next/image"
import Link from "next/link"
import { Search, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur-sm shadow-sm">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center space-x-2">
            <div className="relative h-10 w-28">
              <Image
                src="/logo.svg"
                alt="Salik Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="rounded-full hover:bg-gray-100">
            <Search className="h-5 w-5 text-salik-primary" />
          </Button>
         
          <Link href="/login">
            <Button
              variant="outline"
              className="flex items-center gap-2 border-salik-accent text-salik-primary hover:bg-salik-light hover:text-salik-dark"
            >
              <Lock className="h-4 w-4" />
              <span>تسجيل الدخول</span>
            </Button>
          </Link>
        </div>
      </div>
    </header>
  )
}

