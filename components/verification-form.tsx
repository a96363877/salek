"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function VerificationForm() {
  const router = useRouter()
  const [code, setCode] = useState("")
  const [timeLeft, setTimeLeft] = useState(59)

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [timeLeft])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    router.push("/payment")
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex justify-center mb-6">
        <div className="relative w-32 h-32 animate-pulse-light">
          <Image
            src="/otp.png"
            alt="Verification"
            fill
            className="object-contain"
          />
        </div>
      </div>
      <div className="text-center space-y-4">
        <p className="text-salik-secondary">
          تم ارسال رمز التحقق الى جوالك قم بادخال الرمز المستلم بواسطة رسالة نصية قصيرة واضغط على زر التحقق
        </p>

        <div className="relative">
          <Input
            placeholder="رمز التحقق"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="text-center text-2xl tracking-wider py-6 salik-input"
            maxLength={6}
          />
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <div className="w-2 h-2 rounded-full bg-salik-accent animate-pulse"></div>
          </div>
        </div>

        <div className="text-center text-2xl font-mono text-salik-dark font-bold">
          00:{timeLeft.toString().padStart(2, "0")}
        </div>

        <Button type="submit" className="w-full salik-button-secondary" disabled={code.length !== 6}>
          تحقق
        </Button>

        <button
          type="button"
          className="text-salik-accent hover:text-blue-600 text-sm font-medium"
          onClick={() => setTimeLeft(59)}
          disabled={timeLeft > 0}
        >
          إعادة إرسال الرمز {timeLeft > 0 ? `(${timeLeft})` : ""}
        </button>
      </div>
    </form>
  )
}

