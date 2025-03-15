"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { User, CreditCard, Phone, Flag, StampIcon as Passport, Calendar, Mail } from "lucide-react"

export function PersonalInfoForm() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    fullName: "",
    idNumber: "",
    phoneNumber: "",
    nationality: "",
    passportNumber: "",
    birthDate: "",
    email: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    router.push("/payment")
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div className="relative">
          <Input
            className="salik-input pr-12"
            placeholder="الاسم الكامل"
            value={formData.fullName}
            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <User className="h-5 w-5 text-salik-secondary" />
          </div>
        </div>

        <div className="relative">
          <Input
            className="salik-input pr-12"
            placeholder="رقم الهوية \ الاقامة"
            value={formData.idNumber}
            onChange={(e) => setFormData({ ...formData, idNumber: e.target.value })}
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <CreditCard className="h-5 w-5 text-salik-secondary" />
          </div>
        </div>

        <div className="relative">
          <Input
            className="salik-input pr-12"
            placeholder="رقم الهاتف"
            value={formData.phoneNumber}
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, "")
              setFormData({ ...formData, phoneNumber: value })
            }}
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <Phone className="h-5 w-5 text-salik-secondary" />
          </div>
        </div>

        <div className="relative">
          <Select onValueChange={(value) => setFormData({ ...formData, nationality: value })}>
            <SelectTrigger className="salik-input pr-12">
              <SelectValue placeholder="الجنسية" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="uae">الإمارات العربية المتحدة</SelectItem>
              <SelectItem value="ksa">المملكة العربية السعودية</SelectItem>
              <SelectItem value="kuwait">الكويت</SelectItem>
              <SelectItem value="bahrain">البحرين</SelectItem>
              <SelectItem value="oman">عمان</SelectItem>
              <SelectItem value="qatar">قطر</SelectItem>
              <SelectItem value="other">أخرى</SelectItem>
            </SelectContent>
          </Select>
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <Flag className="h-5 w-5 text-salik-secondary" />
          </div>
        </div>

        <div className="relative">
          <Input
            className="salik-input pr-12"
            placeholder="رقم جواز السفر"
            value={formData.passportNumber}
            onChange={(e) => setFormData({ ...formData, passportNumber: e.target.value })}
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <Passport className="h-5 w-5 text-salik-secondary" />
          </div>
        </div>

        <div className="relative">
          <Input
            className="salik-input pr-12"
            placeholder="تاريخ الميلاد"
            type="date"
            value={formData.birthDate}
            onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <Calendar className="h-5 w-5 text-salik-secondary" />
          </div>
        </div>

        <div className="relative">
          <Input
            className="salik-input pr-12"
            placeholder="البريد الالكتروني"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <Mail className="h-5 w-5 text-salik-secondary" />
          </div>
        </div>
      </div>

      <Button type="submit" className="w-full salik-button-secondary py-4">
        أستمرار
      </Button>
    </form>
  )
}

