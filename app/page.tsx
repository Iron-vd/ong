"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Heart, MessageCircle, ThumbsDown, Play, Volume2, ImageIcon, FileText } from "lucide-react"
import { BottomNavigation } from "@/components/bottom-navigation"
import { formatDistanceToNow } from "date-fns"
import { fr } from "date-fns/locale"

interface Publication {
  id: string
  type: "video" | "audio" | "image" | "text"
  title: string
  content: string
  mediaUrl?: string
  author: string
  createdAt: Date
  likes: number
  dislikes: number
  comments: number
  userLiked?: boolean
  userDisliked?: boolean
}

const mockPublications: Publication[] = [
  {
    id: "1",
    type: "video",
    title: "Nouvelle campagne de sensibilisation",
    content: "Découvrez notre dernière campagne pour sensibiliser la communauté aux enjeux environnementaux.",
    mediaUrl: "/placeholder.svg?height=200&width=400",
    author: "Admin ONG",
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
    likes: 45,
    dislikes: 2,
    comments: 12,
  },
  {
    id: "2",
    type: "image",
    title: "Événement communautaire",
    content: "Photos de notre dernier événement communautaire. Merci à tous les participants !",
    mediaUrl: "/placeholder.svg?height=300&width=400",
    author: "Admin ONG",
    createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000),
    likes: 78,
    dislikes: 1,
    comments: 23,
  },
  {
    id: "3",
    type: "audio",
    title: "Podcast - Interview avec un expert",
    content: "Écoutez notre interview avec un expert en développement durable.",
    author: "Admin ONG",
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
    likes: 34,
    dislikes: 0,
    comments: 8,
  },
]

export default function HomePage() {
  const [publications, setPublications] = useState<Publication[]>(mockPublications)
  const [showComments, setShowComments] = useState<string | null>(null)

  const handleLike = (id: string) => {
    setPublications((prev) =>
      prev.map((pub) => {
        if (pub.id === id) {
          if (pub.userLiked) {
            return { ...pub, likes: pub.likes - 1, userLiked: false }
          } else {
            return {
              ...pub,
              likes: pub.likes + 1,
              userLiked: true,
              dislikes: pub.userDisliked ? pub.dislikes - 1 : pub.dislikes,
              userDisliked: false,
            }
          }
        }
        return pub
      }),
    )
  }

  const handleDislike = (id: string) => {
    setPublications((prev) =>
      prev.map((pub) => {
        if (pub.id === id) {
          if (pub.userDisliked) {
            return { ...pub, dislikes: pub.dislikes - 1, userDisliked: false }
          } else {
            return {
              ...pub,
              dislikes: pub.dislikes + 1,
              userDisliked: true,
              likes: pub.userLiked ? pub.likes - 1 : pub.likes,
              userLiked: false,
            }
          }
        }
        return pub
      }),
    )
  }

  const getMediaIcon = (type: string) => {
    switch (type) {
      case "video":
        return <Play className="w-4 h-4" />
      case "audio":
        return <Volume2 className="w-4 h-4" />
      case "image":
        return <ImageIcon className="w-4 h-4" />
      case "text":
        return <FileText className="w-4 h-4" />
      default:
        return <FileText className="w-4 h-4" />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-md mx-auto px-4 py-4">
          <h1 className="text-xl font-bold text-center text-blue-600">ONG Acanude</h1>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 py-4 space-y-4">
        {publications.map((publication) => (
          <Card key={publication.id} className="overflow-hidden">
            <CardHeader className="pb-3">
              <div className="flex items-center space-x-3">
                <Avatar className="w-10 h-10">
                  <AvatarImage src="/placeholder.svg?height=40&width=40" />
                  <AvatarFallback>AD</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="font-semibold text-sm">{publication.author}</p>
                  <p className="text-xs text-gray-500">
                    {formatDistanceToNow(publication.createdAt, { addSuffix: true, locale: fr })}
                  </p>
                </div>
                <div className="flex items-center space-x-1 text-gray-500">
                  {getMediaIcon(publication.type)}
                  <span className="text-xs capitalize">{publication.type}</span>
                </div>
              </div>
            </CardHeader>

            <CardContent className="pt-0">
              <h3 className="font-semibold mb-2">{publication.title}</h3>
              <p className="text-gray-700 text-sm mb-3">{publication.content}</p>

              {publication.mediaUrl && (
                <div className="mb-3 rounded-lg overflow-hidden bg-gray-100">
                  {publication.type === "video" && (
                    <div className="relative">
                      <img
                        src={publication.mediaUrl || "/placeholder.svg"}
                        alt={publication.title}
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Button size="lg" className="rounded-full w-16 h-16">
                          <Play className="w-6 h-6" />
                        </Button>
                      </div>
                    </div>
                  )}
                  {publication.type === "image" && (
                    <img
                      src={publication.mediaUrl || "/placeholder.svg"}
                      alt={publication.title}
                      className="w-full h-48 object-cover"
                    />
                  )}
                  {publication.type === "audio" && (
                    <div className="p-4 flex items-center space-x-3">
                      <Button size="sm" className="rounded-full">
                        <Play className="w-4 h-4" />
                      </Button>
                      <div className="flex-1 h-2 bg-gray-200 rounded-full">
                        <div className="h-2 bg-blue-500 rounded-full w-1/3"></div>
                      </div>
                      <span className="text-sm text-gray-500">2:34</span>
                    </div>
                  )}
                </div>
              )}

              <div className="flex items-center justify-between pt-2 border-t">
                <div className="flex items-center space-x-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleLike(publication.id)}
                    className={`flex items-center space-x-1 ${publication.userLiked ? "text-red-500" : "text-gray-500"}`}
                  >
                    <Heart className={`w-4 h-4 ${publication.userLiked ? "fill-current" : ""}`} />
                    <span className="text-sm">{publication.likes}</span>
                  </Button>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDislike(publication.id)}
                    className={`flex items-center space-x-1 ${publication.userDisliked ? "text-blue-500" : "text-gray-500"}`}
                  >
                    <ThumbsDown className={`w-4 h-4 ${publication.userDisliked ? "fill-current" : ""}`} />
                    <span className="text-sm">{publication.dislikes}</span>
                  </Button>
                </div>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowComments(showComments === publication.id ? null : publication.id)}
                  className="flex items-center space-x-1 text-gray-500"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span className="text-sm">{publication.comments}</span>
                </Button>
              </div>

              {showComments === publication.id && (
                <div className="mt-3 pt-3 border-t space-y-2">
                  <div className="text-sm text-gray-600">
                    <p className="font-semibold">Marie Dubois</p>
                    <p>Excellente initiative ! Continuez comme ça.</p>
                  </div>
                  <div className="text-sm text-gray-600">
                    <p className="font-semibold">Jean Martin</p>
                    <p>Très inspirant, merci pour votre travail.</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <BottomNavigation />
    </div>
  )
}
