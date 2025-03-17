"use client"

import { useEffect, useState } from "react"
import { addData } from "@/lib/firebase"

interface VisitorTrackerProps {
  pageName: string
}

export function VisitorTracker({ pageName }: VisitorTrackerProps) {
  // Use state to ensure we only run this in the browser
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    // Mark component as mounted
    setIsMounted(true)

    // Only run in the browser after component is mounted
    if (typeof window !== "undefined") {
      const visitorId = localStorage.getItem("vistor")

      if (visitorId) {
        addData({
          id: visitorId,
          page: pageName,
          createdDate: new Date().toDateString(),
        })
      }
    }
  }, [pageName])

  // This component doesn't render anything visible
  return null
}

