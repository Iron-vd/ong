"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Heart, MessageCircle, Share, Play, Volume2, VolumeX, Plus } from "lucide-react"
import { BottomNavigation } from "@/components/bottom-navigation"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

interface ShortVideo {
  id: string
  author: string
  nickname: string
  description: string
  videoUrl: string
  likes: number
  comments: number
  shares: number
  userLiked: boolean
}

const mockShorts: ShortVideo[] = [
  {
    id: "1",
    author: "Marie Dubois",
    nickname: "@marie_eco",
    description: "Mes 5 astuces pour réduire ses déchets au quotidien 🌱 #zerodechet #ecologie",
    videoUrl: "/placeholder.svg?height=600&width=400",
    likes: 234,
    comments: 45,
    shares: 12,
    userLiked: false,
  },
  {
    id: "2",
    author: "Thomas Martin",
    nickname: "@thomas_green",
    description: "DIY : Comment faire son compost maison facilement ! 🌿 #compost #jardinage",
    videoUrl: "/placeholder.svg?height=600&width=400",
    likes: 189,
    comments: 32,
    shares: 8,
    userLiked: true,
  },
  {
    id: "3",
    author: "Sophie Laurent",
    nickname: "@sophie_nature",
    description: "Découverte de la permaculture dans mon jardin 🌻 #permaculture #nature",
    videoUrl: "/placeholder.svg?height=600&width=400",
    likes: 156,
    comments: 28,
    shares: 15,
    userLiked: false,
  },
]

export default function ShortsPage() {
  const [shorts, setShorts] = useState<ShortVideo[]>(mockShorts)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [isMuted, setIsMuted] = useState(false)
  const [showUpload, setShowUpload] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  const [uploadForm, setUploadForm] = useState({
    description: "",
    video: null as File | null,
  })

  const handleLike = (id: string) => {
    setShorts((prev) =>
      prev.map((short) => {
        if (short.id === id) {
          return {
            ...short,
            likes: short.userLiked ? short.likes - 1 : short.likes + 1,
            userLiked: !short.userLiked,
          }
        }
        return short
      }),
    )
  }

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setUploadForm({ ...uploadForm, video: file })
    }
  }

  const handlePublishVideo = () => {
    if (uploadForm.video && uploadForm.description) {
      const newShort: ShortVideo = {
        id: Date.now().toString(),
        author: "Vous",
        nickname: "@vous",
        description: uploadForm.description,
        videoUrl: URL.createObjectURL(uploadForm.video),
        likes: 0,
        comments: 0,
        shares: 0,
        userLiked: false,
      }

      setShorts((prev) => [newShort, ...prev])
      setUploadForm({ description: "", video: null })
      setShowUpload(false)
    }
  }

  const currentShort = shorts[currentIndex]

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Vidéo principale */}
      <div className="h-screen w-full relative">
        <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
          <img
            src={currentShort?.videoUrl || "/placeholder.svg"}
            alt="Vidéo short"
            className="w-full h-full object-cover"
          />

          {/* Overlay de contrôle */}
          <div className="absolute inset-0 flex items-center justify-center" onClick={() => setIsPlaying(!isPlaying)}>
            {!isPlaying && (
              <div className="bg-black bg-opacity-50 rounded-full p-4">
                <Play className="w-12 h-12 text-white" />
              </div>
            )}
          </div>
        </div>

        {/* Contrôles audio */}
        <Button
          variant="ghost"
          size="sm"
          className="absolute top-4 right-4 text-white"
          onClick={() => setIsMuted(!isMuted)}
        >
          {isMuted ? <VolumeX className="w-6 h-6" /> : <Volume2 className="w-6 h-6" />}
        </Button>

        {/* Informations de la vidéo */}
        <div className="absolute bottom-20 left-4 right-20 text-white">
          <div className="flex items-center space-x-3 mb-3">
            <Avatar className="w-10 h-10 border-2 border-white">
              <AvatarImage src="/placeholder.svg?height=40&width=40" />
              <AvatarFallback>{currentShort?.author[0]}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold">{currentShort?.author}</p>
              <p className="text-sm text-gray-300">{currentShort?.nickname}</p>
            </div>
          </div>
          <p className="text-sm mb-2">{currentShort?.description}</p>
        </div>

        {/* Actions latérales */}
        <div className="absolute bottom-32 right-4 flex flex-col space-y-6">
          <Button
            variant="ghost"
            size="sm"
            className="flex flex-col items-center text-white p-2"
            onClick={() => handleLike(currentShort?.id)}
          >
            <Heart className={`w-8 h-8 ${currentShort?.userLiked ? "fill-red-500 text-red-500" : ""}`} />
            <span className="text-xs mt-1">{currentShort?.likes}</span>
          </Button>

          <Button variant="ghost" size="sm" className="flex flex-col items-center text-white p-2">
            <MessageCircle className="w-8 h-8" />
            <span className="text-xs mt-1">{currentShort?.comments}</span>
          </Button>

          <Button variant="ghost" size="sm" className="flex flex-col items-center text-white p-2">
            <Share className="w-8 h-8" />
            <span className="text-xs mt-1">{currentShort?.shares}</span>
          </Button>
        </div>

        {/* Navigation entre vidéos */}
        <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex flex-col space-y-2">
          {shorts.map((_, index) => (
            <div
              key={index}
              className={`w-1 h-8 rounded-full cursor-pointer ${index === currentIndex ? "bg-white" : "bg-gray-500"}`}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>
      </div>

      {/* Bouton d'upload */}
      <Button className="fixed top-4 left-4 z-50 rounded-full w-12 h-12" onClick={() => setShowUpload(true)}>
        <Plus className="w-6 h-6" />
      </Button>

      {/* Dialog d'upload */}
      <Dialog open={showUpload} onOpenChange={setShowUpload}>
        <DialogContent className="max-w-md mx-auto">
          <DialogHeader>
            <DialogTitle>Publier une vidéo courte</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="videoFile">Sélectionner une vidéo</Label>
              <Input id="videoFile" type="file" accept="video/*" onChange={handleVideoUpload} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Décrivez votre vidéo..."
                value={uploadForm.description}
                onChange={(e) => setUploadForm({ ...uploadForm, description: e.target.value })}
                rows={3}
              />
            </div>

            <div className="flex space-x-2">
              <Button
                onClick={handlePublishVideo}
                className="flex-1"
                disabled={!uploadForm.video || !uploadForm.description}
              >
                Publier
              </Button>
              <Button variant="outline" onClick={() => setShowUpload(false)} className="flex-1">
                Annuler
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <BottomNavigation />
    </div>
  )
}
