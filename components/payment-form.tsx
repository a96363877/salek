"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CreditCard, Calendar, ShieldCheck } from "lucide-react"
import FullPageLoader from "./full-page-loader"

export function PaymentForm() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    cardHolder: "",
    cardNumber: "",
    expiryMonth: "",
    expiryYear: "",
    cvv: "",
  })
  const [loading, setLoading] = useState(false) 

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
    router.push("/success")
      
    }, 3000);
  }

  return (
    <div className="space-y-8"> <div className="flex items-center gap-3">
    <CreditCard className="h-8 w-8" />
    <span className="text-xl font-medium">البطاقة الائتمانية</span>
  </div>
      <div className="bg-gradient-to-r from-salik-primary to-salik-dark p-6 rounded-lg text-white flex items-center justify-between">
       
        <div className="grid grid-cols-4  gap-5 ">
          <Image
            src="/vv.png"
            alt="Visa"
            height={60}
            width={60}
            className="opacity-90 hover:opacity-100 transition-opacity"
          />
          <Image
            src="/mm.png"
            alt="Mastercard"
            height={60}
            width={60}
            className="opacity-90 hover:opacity-100 transition-opacity"
          />
          <Image
            src="/ay.png"
            alt="Apple Pay"
            height={60}
            width={60}
            className="opacity-90 hover:opacity-100 transition-opacity"
          />
          <Image
            src="/md.png"
            alt="Mada"
            height={60}
            width={60}
            className="opacity-90 hover:opacity-100 transition-opacity mt-2"
          />
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <div className="relative">
            <Input
              className="salik-input pr-12"
              placeholder="اسم صاحب البطاقة"
              value={formData.cardHolder}
              onChange={(e) => setFormData({ ...formData, cardHolder: e.target.value })}
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <CreditCard className="h-5 w-5 text-salik-secondary" />
            </div>
          </div>

          <div className="relative">
            <Input
              className="salik-input pr-12"
              placeholder="رقم البطاقة الائتمانية"
              value={formData.cardNumber}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, "")
                if (value.length <= 16) {
                  setFormData({ ...formData, cardNumber: value })
                }
              }}
              maxLength={16}
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <CreditCard className="h-5 w-5 text-salik-secondary" />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="relative col-span-1">
              <Input
                className="salik-input pr-10 text-center"
                placeholder="MM"
                value={formData.expiryMonth}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, "")
                  if (value.length <= 2 && Number.parseInt(value || "0") <= 12) {
                    setFormData({ ...formData, expiryMonth: value })
                  }
                }}
                maxLength={2}
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <Calendar className="h-4 w-4 text-salik-secondary" />
              </div>
            </div>

            <div className="relative col-span-1">
              <Input
                className="salik-input pr-10 text-center"
                placeholder="YY"
                value={formData.expiryYear}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, "")
                  if (value.length <= 2) {
                    setFormData({ ...formData, expiryYear: value })
                  }
                }}
                maxLength={2}
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <Calendar className="h-4 w-4 text-salik-secondary" />
              </div>
            </div>

            <div className="relative col-span-1">
              <Input
                className="salik-input pr-10 text-center"
                placeholder="CVV"
                value={formData.cvv}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, "")
                  if (value.length <= 3) {
                    setFormData({ ...formData, cvv: value })
                  }
                }}
                maxLength={3}
                type="password"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <ShieldCheck className="h-4 w-4 text-salik-secondary" />
              </div>
            </div>
          </div>
        </div>

        <div className="pt-4">
          <Button
            type="submit"
            className="w-full salik-button-secondary py-4"
            disabled={
              !formData.cardHolder ||
              formData.cardNumber.length < 16 ||
              !formData.expiryMonth ||
              !formData.expiryYear ||
              formData.cvv.length < 3
            }
          >
            تأكيد
          </Button>
        </div>
      {loading&& <FullPageLoader/>}

      </form>
    </div>
  )
}

