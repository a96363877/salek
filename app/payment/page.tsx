import { PaymentForm } from "@/components/payment-form"
import { Card } from "@/components/ui/card"

export default function PaymentPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-2 text-salik-dark">بيانات تاكيد السداد والدفع</h1>
        <p className="text-center text-salik-secondary mb-8">يرجى إدخال بيانات بطاقتك الائتمانية لإتمام عملية الدفع</p>
        <Card className="salik-card p-8">
          <PaymentForm />
        </Card>
      </div>
    </div>
  )
}

