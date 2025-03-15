import Image from "next/image"
import { Card } from "@/components/ui/card"

export function AppDownload() {
  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4 text-center">
        <Card className="max-w-xl mx-auto p-8">
          <h2 className="text-xl font-bold text-gray-800 mb-6">حمل تطبيق سالك الآن</h2>
          <div className="flex justify-center gap-4">
            <a
              href="https://play.google.com/store"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-transform hover:scale-105"
            >
              <Image
                src="/google-play.webp"
                alt="Get it on Google Play"
                width={135}
                height={40}
                className="h-10 w-auto"
              />
            </a>
            <a
              href="https://apps.apple.com"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-transform hover:scale-105"
            >
              <Image
                src="/app-store.webp"
                alt="Download on the App Store"
                width={135}
                height={40}
                className="h-10 w-auto"
              />
            </a>
          </div>
        </Card>
      </div>
    </section>
  )
}

