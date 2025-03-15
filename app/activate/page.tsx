import { ActivationForm } from "@/components/activation-form"
import { Card } from "@/components/ui/card"

export default function ActivatePage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-2 text-salik-dark">تفعيل بطاقة سالك</h1>
        <p className="text-center text-salik-secondary mb-8">أكمل البيانات التالية لتفعيل بطاقة سالك الخاصة بك</p>
        <Card className="salik-card p-8">
          <ActivationForm />
        </Card>
      </div>
    </div>
  )
}

