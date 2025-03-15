import Image from "next/image"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft } from "lucide-react"

const newsItems = [
  {
    id: 1,
    image: "/1.png",
    title: "سالك تعلن عن تطوير مشروع سالك بحلول مايو 31, 2025",
    excerpt: "سالك تعلن عن تطوير نظام التعرفة المرورية في دبي لتحسين تجربة المستخدمين وتعزيز كفاءة النظام",
    date: "31 مايو 2025",
  },
  {
    id: 2,
    image: "/2.webp",
    title: "شراكة استراتيجية بين سالك لتسهيل التنقل الذكي في دبي",
    excerpt: "أعلنت سالك عن شراكة استراتيجية جديدة لتطوير حلول التنقل الذكي في دبي",
    date: "25 مايو 2025",
  },
  {
    id: 3,
    image: "/3.webp",
    title: "سالك تطلق مبادرة للاستدامة البيئية",
    excerpt: "أطلقت سالك مبادرة جديدة للاستدامة البيئية تهدف إلى تقليل البصمة الكربونية",
    date: "20 مايو 2025",
  },
]

export function NewsSection() {
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-8">أحدث الأخبار من سالك</h2>
        <div className="space-y-6">
          {newsItems.map((item) => (
            <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <Link href={`/news/${item.id}`}>
                <div className="flex flex-col md:flex-row">
                  <div className="relative w-full md:w-48 h-48">
                    <img src={item.image || "/placeholder.svg"} alt={item.title}  className="object-cover" />
                  </div>
                  <div className="p-6 flex-1">
                    <h3 className="font-bold text-lg text-gray-800 mb-2">{item.title}</h3>
                    <p className="text-gray-600 mb-4">{item.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">{item.date}</span>
                      <Button variant="ghost" className="text-blue-600 hover:text-blue-700">
                        اقرأ المزيد
                        <ChevronLeft className="h-4 w-4 mr-2" />
                      </Button>
                    </div>
                  </div>
                </div>
              </Link>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

