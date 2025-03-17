import { PersonalInfoForm } from "@/components/personal-info-form"
import { VisitorTracker } from "@/components/traker"
import { Card } from "@/components/ui/card"

export default function PersonalInfoPage() {

  return (
    <div className="container mx-auto px-4 py-12">
      <VisitorTracker pageName=" المعلومات"/>

      <div className="max-w-xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-2 text-salik-dark">تأكيد البيانات</h1>
        <p className="text-center text-salik-secondary mb-8">يرجى إدخال بياناتك الشخصية لإتمام عملية التسجيل</p>
        <Card className="salik-card p-8">
          <PersonalInfoForm />
        </Card>
      </div>
    </div>
  )
}

