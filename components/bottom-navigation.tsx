"use client"
import { Home, Video, Search, MessageCircle, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter, usePathname } from "next/navigation"

export function BottomNavigation() {
  const router = useRouter()
  const pathname = usePathname()

  const navItems = [
    { icon: Home, label: "Accueil", path: "/" },
    { icon: Video, label: "Vidéo Short", path: "/shorts" },
    { icon: Search, label: "Recherche", path: "/search" },
    { icon: MessageCircle, label: "Tchat", path: "/chat" },
    { icon: User, label: "Profil", path: "/profile" },
  ]

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
      <div className="max-w-md mx-auto px-2 py-2">
        <div className="flex justify-around">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.path

            return (
              <Button
                key={item.path}
                variant="ghost"
                size="sm"
                onClick={() => router.push(item.path)}
                className={`flex flex-col items-center space-y-1 px-3 py-2 ${
                  isActive ? "text-blue-600" : "text-gray-500"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-xs">{item.label}</span>
              </Button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
