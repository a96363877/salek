import type React from "react"
import { Tajawal } from "next/font/google"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import "@/styles/globals.css"

const tajawal = Tajawal({
  subsets: ["arabic"],
  weight: ["400", "500", "700", "800", "900"],
})

export const metadata = {
  title: "Salik - Dubai Toll Gate System",
  description: "The easiest way to move around Dubai",}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ar" dir="rtl">
      <body className={tajawal.className}>
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  )
}



import './globals.css'