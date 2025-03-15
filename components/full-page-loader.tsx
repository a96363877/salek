"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion } from "framer-motion"

interface FullPageLoaderProps {
  message?: string
  subMessage?: string
}

export default function FullPageLoader({ message = "جاري التحميل...", subMessage = "يرجى الانتظار" }: FullPageLoaderProps) {
  const [progress, setProgress] = useState(0)
  const [loadingPhase, setLoadingPhase] = useState(0)
  const [dots, setDots] = useState("")

  // Progress animation
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + Math.random() * 3 + 0.5

        // Update loading phase based on progress
        if (newProgress > 30 && loadingPhase === 0) {
          setLoadingPhase(1)
        } else if (newProgress > 60 && loadingPhase === 1) {
          setLoadingPhase(2)
        } else if (newProgress > 85 && loadingPhase === 2) {
          setLoadingPhase(3)
        }

        if (newProgress >= 100) {
          clearInterval(timer)
          return 100
        }
        return newProgress
      })
    }, 150)

    return () => clearInterval(timer)
  }, [loadingPhase])

  // Animated dots
  useEffect(() => {
    const dotTimer = setInterval(() => {
      setDots((prev) => {
        if (prev.length >= 3) return ""
        return prev + "."
      })
    }, 500)

    return () => clearInterval(dotTimer)
  }, [])

  // Loading phase messages
  const getPhaseMessage = () => {
    switch (loadingPhase) {
     
      case 0:
        return "تحميل البيانات"
      case 1:
        return "اكتمال التحميل"
      default:
        return "جاري التحميل"
    }
  }

  return (
    <div className="fixed inset-0 bg-gradient-to-b from-slate-50 to-slate-100 z-50 flex flex-col items-center justify-center overflow-hidden">
      {/* Background city silhouette */}
      <div
        className="absolute bottom-0 w-full h-32 bg-slate-800/10 opacity-20"
        style={{
          maskImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 1000 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0,100 L50,100 L50,50 L100,50 L100,80 L150,80 L150,30 L200,30 L200,100 L250,100 L250,70 L300,70 L300,100 L350,100 L350,40 L400,40 L400,90 L450,90 L450,60 L500,60 L500,100 L550,100 L550,50 L600,50 L600,80 L650,80 L650,20 L700,20 L700,100 L750,100 L750,60 L800,60 L800,90 L850,90 L850,40 L900,40 L900,70 L950,70 L950,100 L1000,100 L1000,200 L0,200 Z' fill='black'/%3E%3C/svg%3E\")",
          maskSize: "cover",
          maskRepeat: "no-repeat",
        }}
      />

      <div className="w-full max-w-md mx-auto flex flex-col items-center p-8 relative z-10">
        {/* Logo with 3D effect */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-48 h-24 relative mb-12"
        >
          <div className="absolute inset-0 bg-blue-500/10 rounded-lg transform -rotate-3 scale-105" />
          <div className="absolute inset-0 bg-white rounded-lg shadow-lg flex items-center justify-center">
            <Image
              src="/logo.svg"
              alt="Salik Logo"
              width={160}
              height={80}
              className="object-contain"
            />
          </div>
        </motion.div>

        {/* Loading animation */}
        <div className="relative w-full h-2 bg-slate-200 rounded-full overflow-hidden mb-8">
          <motion.div
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"
            style={{ width: `${progress}%` }}
            initial={{ width: "0%" }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>

        {/* Road animation */}
        <div className="w-full h-8 mb-8 relative overflow-hidden rounded-md">
          <div className="absolute inset-0 bg-slate-700" />
          <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-center">
            <div className="w-full flex justify-around">
              {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
                <motion.div
                  key={i}
                  className="h-1 w-8 bg-yellow-400 rounded-full"
                  initial={{ x: -100, opacity: 0 }}
                  animate={{ x: 100, opacity: [0, 1, 0] }}
                  transition={{
                    repeat: Number.POSITIVE_INFINITY,
                    duration: 2,
                    delay: i * 0.25,
                    ease: "linear",
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Loading phase indicator */}
        <motion.div
          key={loadingPhase}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="mb-6 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-lg shadow-sm"
        >
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            <h3 className="text-lg font-medium text-slate-800 text-right">
              {getPhaseMessage()}
              {dots}
            </h3>
          </div>
        </motion.div>

        {/* Loading message */}
        <h3 className="text-xl font-bold text-slate-800 mb-2 text-center">{message}</h3>
        <p className="text-sm text-slate-500 text-center">{subMessage}</p>

        {/* Percentage indicator */}
        <motion.div
          className="mt-6 text-sm font-medium text-blue-600 bg-blue-50 px-4 py-1 rounded-full shadow-inner"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
        >
          {Math.round(progress)}%
        </motion.div>
      </div>
    </div>
  )
}

