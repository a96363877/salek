import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { CheckCircle, Home } from "lucide-react"

export default function SuccessPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-md mx-auto">
        <Card className="salik-card p-8 text-center">
          <div className="flex justify-center mb-6">
            <div className="rounded-full bg-green-100 p-3">
              <CheckCircle className="h-16 w-16 text-green-500" />
            </div>
          </div>

          <h1 className="text-2xl font-bold text-salik-dark mb-4">تمت العملية بنجاح</h1>

          <p className="text-salik-secondary mb-8">
            تم تفعيل بطاقة سالك الخاصة بك بنجاح. يمكنك الآن استخدام البطاقة للتنقل في دبي.
          </p>

          <Link href="/">
            <Button className="salik-button-secondary">
              <Home className="ml-2 h-4 w-4" />
              العودة للصفحة الرئيسية
            </Button>
          </Link>
        </Card>
      </div>
    </div>
  )
}

