import Link from "next/link"
import { Linkedin, Youtube, Instagram, Twitter, Facebook, MessageCircle } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-gray-100 border-t">
      <div className="container mx-auto py-6 px-4">
        <div className="flex justify-center space-x-6 rtl:space-x-reverse mb-4">
          <Link href="#" className="text-salik-primary hover:text-salik-accent transition-colors">
            <Linkedin className="h-6 w-6" />
            <span className="sr-only">LinkedIn</span>
          </Link>
          <Link href="#" className="text-salik-primary hover:text-salik-accent transition-colors">
            <Youtube className="h-6 w-6" />
            <span className="sr-only">YouTube</span>
          </Link>
          <Link href="#" className="text-salik-primary hover:text-salik-accent transition-colors">
            <Instagram className="h-6 w-6" />
            <span className="sr-only">Instagram</span>
          </Link>
          <Link href="#" className="text-salik-primary hover:text-salik-accent transition-colors">
            <Twitter className="h-6 w-6" />
            <span className="sr-only">Twitter</span>
          </Link>
          <Link href="#" className="text-salik-primary hover:text-salik-accent transition-colors">
            <Facebook className="h-6 w-6" />
            <span className="sr-only">Facebook</span>
          </Link>
        </div>
        <div className="text-center text-sm text-gray-500">
          <p>© 2025 جميع الحقوق محفوظة لسالك (ش.ذ.م.م)</p>
        </div>
      </div>
      <div className="fixed bottom-6 left-6 z-50">
        <button className="bg-salik-accent hover:bg-blue-500 text-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300">
          <MessageCircle className="h-6 w-6" />
        </button>
      </div>
    </footer>
  )
}

