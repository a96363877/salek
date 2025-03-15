import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Share2, Download, Bike, HelpCircle, Bot, MessageSquare } from "lucide-react"
import { NewsSection } from "@/components/news-section"
import { AppDownload } from "@/components/app-download"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative w-full h-[300px]">
        <Image
          src="/login_background_small.webp"
          alt="Dubai Highway"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 -mt-10 relative z-10 flex-1 pb-20">
        <div className="max-w-lg mx-auto space-y-4">
          {/* Primary Actions */}
          <Button className="w-full py-4 bg-[#7FB3D5] hover:bg-blue-500 text-white text-lg font-medium rounded-md">
            التسجيل السريع
          </Button>

          {/* Secondary Actions */}
     
            <Button
              variant="secondary"
              className="w-full py-4 bg-gray-700 hover:bg-gray-800 text-white text-lg font-medium rounded-md"
            >
            شراء بطاقة سالك
      </Button>
      <Button
              variant="secondary"
              className="w-full py-4 bg-gray-700 hover:bg-gray-800 text-white text-lg font-medium rounded-md"
            >
          تفعيل بطاقة سالك
      </Button>

          {/* Description */}
          <div className="text-center mt-8 space-y-2">
            <h1 className="text-xl font-bold text-gray-800">الطريقة الأسهل للتجوّل في دبي</h1>
            <p className="text-gray-600 text-sm">
              سالك نظام إلكتروني للتعرفة المرورية في دبي يعمل من دون أكشاك تحصيل أو نقاط توقف
            </p>
          </div>

          {/* Start Here Section */}
          <div className="mt-8 space-y-4">
            <div className="flex items-center justify-between p-4 bg-white rounded-md shadow-sm">
              <span className="text-gray-700">إبدأ من هنا</span>
              <div className="flex gap-4">
                <Share2 className="h-5 w-5 text-gray-500" />
                <Download className="h-5 w-5 text-gray-500" />
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-2">
              <Link href="/personal-info" className="block p-4 bg-white rounded-md shadow-sm hover:bg-gray-50">
                <span className="text-gray-700">طريقة التسجيل</span>
              </Link>
              <Link href="/personal-info" className="block p-4 bg-white rounded-md shadow-sm hover:bg-gray-50">
                <span className="text-gray-700">تعبئة رصيد سالك</span>
              </Link>
            </div>

            {/* Quick Services */}
            <div className="pt-4">
              <div className="flex items-center gap-2 mb-4">
                <Bike className="h-5 w-5 text-gray-500" />
                <h2 className="text-lg font-medium text-gray-700">خدمات سريعة</h2>
              </div>
              <div className="space-y-2">
                {[
                  "تفعيل بطاقة سالك",
                  "تعبئة رصيد سالك",
                  "شراء بطاقة سالك",
                ].map((service) => (
                  <Link key={service} href="/personal-info" className="block p-4 bg-white rounded-md shadow-sm hover:bg-gray-50">
                    <span className="text-gray-700">{service}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Help Section */}
            <div className="pt-4">
              <div className="flex items-center gap-2 mb-4">
                <HelpCircle className="h-5 w-5 text-gray-500" />
                <h2 className="text-lg font-medium text-gray-700">هل تحتاج للمساعدة</h2>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 p-4 bg-white rounded-md shadow-sm">
                  <Bot className="h-5 w-5 text-gray-500" />
                  <span className="text-gray-700">BOT SALIK (22545)</span>
                </div>
                <Link
                  href="/personal-info"
                  className="flex items-center gap-2 p-4 bg-white rounded-md shadow-sm hover:bg-gray-50"
                >
                  <MessageSquare className="h-5 w-5 text-gray-500" />
                  <span className="text-gray-700">أسئلة شائعة</span>
                </Link>
                <Link
                  href="/contact"
                  className="flex items-center gap-2 p-4 bg-white rounded-md shadow-sm hover:bg-gray-50"
                >
                  <MessageSquare className="h-5 w-5 text-gray-500" />
                  <span className="text-gray-700">أرسل لنا رسالة</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Add the new sections */}
      <NewsSection />
      <AppDownload />
    </div>
  )
}

