"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Upload, Video, ImageIcon, Volume2, FileText } from "lucide-react"
import { useRouter } from "next/navigation"

export default function PublishPage() {
  const router = useRouter()
  const [isPublishing, setIsPublishing] = useState(false)

  const [publication, setPublication] = useState({
    type: "",
    title: "",
    content: "",
    mediaFile: null as File | null,
  })

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setPublication({ ...publication, mediaFile: file })
    }
  }

  const handlePublish = async () => {
    if (!publication.title || !publication.content || !publication.type) {
      alert("Veuillez remplir tous les champs obligatoires")
      return
    }

    setIsPublishing(true)

    // Simulation de publication
    setTimeout(() => {
      setIsPublishing(false)
      alert("Publication créée avec succès !")
      router.push("/")
    }, 2000)
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "video":
        return <Video className="w-4 h-4" />
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

  const getAcceptedFiles = (type: string) => {
    switch (type) {
      case "video":
        return "video/*"
      case "audio":
        return "audio/*"
      case "image":
        return "image/*"
      default:
        return ""
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center space-x-3">
          <Button variant="ghost" size="sm" onClick={() => router.back()}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-xl font-bold text-orange-600">Publier du contenu</h1>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-6">
        <Card>
          <CardHeader>
            <CardTitle>Nouvelle publication</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="type">Type de contenu *</Label>
              <Select
                value={publication.type}
                onValueChange={(value) => setPublication({ ...publication, type: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionnez le type de contenu" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="video">
                    <div className="flex items-center space-x-2">
                      <Video className="w-4 h-4" />
                      <span>Vidéo</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="audio">
                    <div className="flex items-center space-x-2">
                      <Volume2 className="w-4 h-4" />
                      <span>Audio</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="image">
                    <div className="flex items-center space-x-2">
                      <ImageIcon className="w-4 h-4" />
                      <span>Image</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="text">
                    <div className="flex items-center space-x-2">
                      <FileText className="w-4 h-4" />
                      <span>Texte uniquement</span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="title">Titre de la publication *</Label>
              <Input
                id="title"
                placeholder="Entrez le titre de votre publication"
                value={publication.title}
                onChange={(e) => setPublication({ ...publication, title: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="content">Contenu *</Label>
              <Textarea
                id="content"
                placeholder="Décrivez votre publication..."
                rows={4}
                value={publication.content}
                onChange={(e) => setPublication({ ...publication, content: e.target.value })}
              />
            </div>

            {publication.type && publication.type !== "text" && (
              <div className="space-y-2">
                <Label htmlFor="media">Fichier média</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <input
                    id="media"
                    type="file"
                    accept={getAcceptedFiles(publication.type)}
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  <label htmlFor="media" className="cursor-pointer">
                    <div className="flex flex-col items-center space-y-2">
                      <Upload className="w-8 h-8 text-gray-400" />
                      <p className="text-sm text-gray-600">Cliquez pour sélectionner un fichier {publication.type}</p>
                      {publication.mediaFile && (
                        <p className="text-sm text-green-600 font-medium">
                          Fichier sélectionné: {publication.mediaFile.name}
                        </p>
                      )}
                    </div>
                  </label>
                </div>
              </div>
            )}

            {/* Aperçu */}
            {publication.title && publication.content && (
              <div className="space-y-2">
                <Label>Aperçu de la publication</Label>
                <Card className="border-blue-200 bg-blue-50">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      {publication.type && getTypeIcon(publication.type)}
                      <span className="text-sm font-medium capitalize">{publication.type}</span>
                    </div>
                    <h3 className="font-semibold mb-2">{publication.title}</h3>
                    <p className="text-sm text-gray-700">{publication.content}</p>
                    {publication.mediaFile && (
                      <div className="mt-2 text-xs text-gray-500">Fichier: {publication.mediaFile.name}</div>
                    )}
                  </CardContent>
                </Card>
              </div>
            )}

            <div className="flex space-x-3 pt-4">
              <Button
                onClick={handlePublish}
                disabled={isPublishing || !publication.title || !publication.content || !publication.type}
                className="flex-1"
              >
                {isPublishing ? "Publication en cours..." : "Publier"}
              </Button>
              <Button variant="outline" onClick={() => router.back()} className="flex-1">
                Annuler
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
