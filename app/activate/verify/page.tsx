import { VerificationForm } from "@/components/verification-form"
import { Card } from "@/components/ui/card"

export default function VerifyPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-md mx-auto">
        <h1 className="text-3xl font-bold text-center mb-2 text-salik-dark">رمز التفعيل</h1>
        <p className="text-center text-salik-secondary mb-8">تم إرسال رمز التحقق إلى رقم هاتفك المسجل</p>
        <Card className="salik-card p-8">
          <VerificationForm />
        </Card>
      </div>
    </div>
  )
}

