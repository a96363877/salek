"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Circle } from "lucide-react"
import FullPageLoader from "./full-page-loader"

export function ActivationForm() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    cardNumber: "",
    phoneNumber: "",
    trafficFileNumber: "",
    acceptTerms: false,
  })

  const [loading, setLoading] = useState(false) 

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    router.push("/activate/verify")
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-salik-dark flex items-center gap-2">
          <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-salik-accent text-white text-sm">
            ١
          </span>
          قبل البدء بتفعيل بطاقة سالك
        </h2>
        <p className="text-salik-secondary text-lg pr-10">تحتاج الى مايلي لتفعيل بطاقة سالك عن طريق الانترنت</p>
      </div>

      <div className="space-y-6">
        <div className="flex items-start gap-4 p-4 rounded-lg border border-gray-100 hover:border-salik-accent transition-colors bg-gray-50 hover:bg-white">
          <div className="mt-1">
            <Circle className="h-6 w-6 text-salik-accent fill-salik-accent" />
          </div>
          <div className="flex-1">
            <label className="block text-lg font-medium text-salik-dark mb-2">رقم بطاقة سالك ورمز التفعيل</label>
            <p className="text-sm text-gray-500 mb-3">مطبوع على الجهة الخلفية من بطاقة سالك الخاصة بك</p>
            <Input
              className="salik-input"
              placeholder="أدخل رقم البطاقة ورمز التفعيل"
              value={formData.cardNumber}
            type="tel"
            required
              maxLength={12}
              onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
            />
          </div>
        </div>

        <div className="flex items-start gap-4 p-4 rounded-lg border border-gray-100 hover:border-salik-accent transition-colors bg-gray-50 hover:bg-white">
          <div className="mt-1">
            <Circle className="h-6 w-6 text-salik-accent fill-salik-accent" />
          </div>
          <div className="flex-1">
            <label className="block text-lg font-medium text-salik-dark mb-2">رقم هاتفك المتحرك</label>
            <p className="text-sm text-gray-500 mb-3">هذا الرقم سيستخدم لجميع عمليات التواصل مع سالك</p>
            <Input
            type="tel"
              className="salik-input"
              placeholder="أدخل رقم هاتفك المتحرك"
              maxLength={12}
              value={formData.phoneNumber}
              onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
            />
          </div>
        </div>

        <div className="flex items-start gap-4 p-4 rounded-lg border border-gray-100 hover:border-salik-accent transition-colors bg-gray-50 hover:bg-white">
          <div className="mt-1">
            <Circle className="h-6 w-6 text-salik-accent fill-salik-accent" />
          </div>
          <div className="flex-1">
            <label className="block text-lg font-medium text-salik-dark mb-2">
              رقم ملف المرور للمركبات المسجلة في دولة الإمارات العربية المتحدة
            </label>
            <p className="text-sm text-gray-500 mb-3">وهو الرقم موجود على بطاقة تسجيل المركبة الخاصة بك</p>
            <Input
              className="salik-input"
              placeholder="أدخل رقم ملف المرور"
              value={formData.trafficFileNumber}
              onChange={(e) => setFormData({ ...formData, trafficFileNumber: e.target.value })}
            />
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-2 rtl:space-x-reverse p-4 rounded-lg border border-gray-100 bg-gray-50">
        <Checkbox
          id="terms"
          checked={formData.acceptTerms}
          onCheckedChange={(checked) => setFormData({ ...formData, acceptTerms: checked as boolean })}
          className="h-5 w-5 border-gray-300 text-salik-accent"
        />
        <label htmlFor="terms" className="text-salik-secondary">
          لدي كافة البيانات اللازمة لبدء التسجيل
        </label>
      </div>

      <div className="flex items-center space-x-2 rtl:space-x-reverse p-4 rounded-lg border border-gray-100 bg-gray-50">
        <Checkbox id="privacy" className="h-5 w-5 border-gray-300 text-salik-accent" />
        <label htmlFor="privacy" className="text-salik-secondary">
          أوافق علي الشروط والأحكام وسياسة الخصوصية بالنقر على مربع الاختيار
        </label>
      </div>

      <Button type="submit" className="w-full salik-button-secondary" disabled={!formData.acceptTerms}>
        استمرار
      </Button>
      {loading&& <FullPageLoader/>}
    </form>
  )
}

