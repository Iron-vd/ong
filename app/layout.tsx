import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "ONG Acanude - Application Communautaire",
  description: "Application mobile pour la communauté ONG Acanude",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={inter.className}>
        <div className="w-full px-2 sm:px-4 md:px-8 max-w-md md:max-w-2xl lg:max-w-3xl mx-auto">
          {children}
        </div>
      </body>
    </html>
  )
}
