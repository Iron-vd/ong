"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Users,
  FileText,
  TrendingUp,
  Ban,
  UserCheck,
  Eye,
  Heart,
  MessageCircle,
  Video,
  ImageIcon,
  Volume2,
} from "lucide-react"
import { useRouter } from "next/navigation"

interface User {
  id: string
  name: string
  nickname: string
  email: string
  joinDate: string
  status: "active" | "banned"
  posts: number
  followers: number
}

interface Publication {
  id: string
  type: "video" | "audio" | "image" | "text"
  title: string
  description: string
  likes: number
  comments: number
  views: number
  publishDate: string
}

const mockUsers: User[] = [
  {
    id: "1",
    name: "Marie Dubois",
    nickname: "marie_eco",
    email: "marie@email.com",
    joinDate: "2024-01-15",
    status: "active",
    posts: 45,
    followers: 1234,
  },
  {
    id: "2",
    name: "Thomas Martin",
    nickname: "thomas_green",
    email: "thomas@email.com",
    joinDate: "2024-02-20",
    status: "active",
    posts: 32,
    followers: 987,
  },
  {
    id: "3",
    name: "Sophie Laurent",
    nickname: "sophie_nature",
    email: "sophie@email.com",
    joinDate: "2024-03-10",
    status: "banned",
    posts: 67,
    followers: 2345,
  },
]

const mockPublications: Publication[] = [
  {
    id: "1",
    type: "video",
    title: "Nouvelle campagne de sensibilisation",
    description: "Découvrez notre dernière campagne pour sensibiliser la communauté...",
    likes: 45,
    comments: 12,
    views: 1250,
    publishDate: "2024-12-15",
  },
  {
    id: "2",
    type: "image",
    title: "Événement communautaire",
    description: "Photos de notre dernier événement communautaire...",
    likes: 78,
    comments: 23,
    views: 2100,
    publishDate: "2024-12-14",
  },
  {
    id: "3",
    type: "audio",
    title: "Podcast - Interview expert",
    description: "Écoutez notre interview avec un expert en développement durable...",
    likes: 34,
    comments: 8,
    views: 890,
    publishDate: "2024-12-13",
  },
]

export default function AdminPage() {
  const [users, setUsers] = useState<User[]>(mockUsers)
  const [publications] = useState<Publication[]>(mockPublications)
  const router = useRouter()

  const handleBanUser = (userId: string) => {
    setUsers((prev) =>
      prev.map((user) =>
        user.id === userId ? { ...user, status: user.status === "banned" ? "active" : "banned" } : user,
      ),
    )
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

  const totalUsers = users.length
  const activeUsers = users.filter((u) => u.status === "active").length
  const bannedUsers = users.filter((u) => u.status === "banned").length
  const totalPublications = publications.length
  const totalViews = publications.reduce((sum, pub) => sum + pub.views, 0)
  const totalLikes = publications.reduce((sum, pub) => sum + pub.likes, 0)

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-orange-600">Administration ONG</h1>
          <Button onClick={() => router.push("/admin/publish")}>Publier du contenu</Button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Statistiques générales */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Users className="w-8 h-8 text-blue-500" />
                <div>
                  <p className="text-2xl font-bold">{totalUsers}</p>
                  <p className="text-sm text-gray-500">Utilisateurs</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <FileText className="w-8 h-8 text-green-500" />
                <div>
                  <p className="text-2xl font-bold">{totalPublications}</p>
                  <p className="text-sm text-gray-500">Publications</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Eye className="w-8 h-8 text-purple-500" />
                <div>
                  <p className="text-2xl font-bold">{totalViews.toLocaleString()}</p>
                  <p className="text-sm text-gray-500">Vues totales</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Heart className="w-8 h-8 text-red-500" />
                <div>
                  <p className="text-2xl font-bold">{totalLikes}</p>
                  <p className="text-sm text-gray-500">J'aime totaux</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="users" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="users">Gestion Utilisateurs</TabsTrigger>
            <TabsTrigger value="publications">Publications</TabsTrigger>
            <TabsTrigger value="analytics">Évolution</TabsTrigger>
          </TabsList>

          <TabsContent value="users" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Utilisateurs ({totalUsers})</span>
                  <div className="flex space-x-2">
                    <Badge variant="secondary">{activeUsers} actifs</Badge>
                    <Badge variant="destructive">{bannedUsers} bannis</Badge>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {users.map((user) => (
                    <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3">
                          <div>
                            <h3 className="font-semibold">{user.name}</h3>
                            <p className="text-sm text-gray-500">@{user.nickname}</p>
                            <p className="text-xs text-gray-400">{user.email}</p>
                          </div>
                          <Badge variant={user.status === "active" ? "default" : "destructive"}>
                            {user.status === "active" ? "Actif" : "Banni"}
                          </Badge>
                        </div>
                        <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                          <span>{user.posts} publications</span>
                          <span>{user.followers} abonnés</span>
                          <span>Inscrit le {new Date(user.joinDate).toLocaleDateString("fr-FR")}</span>
                        </div>
                      </div>

                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleBanUser(user.id)}
                          className={user.status === "banned" ? "text-green-600" : "text-red-600"}
                        >
                          {user.status === "banned" ? (
                            <>
                              <UserCheck className="w-4 h-4 mr-1" />
                              Débannir
                            </>
                          ) : (
                            <>
                              <Ban className="w-4 h-4 mr-1" />
                              Bannir
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="publications" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Publications de l'ONG</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {publications.map((publication) => (
                    <div key={publication.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          {getTypeIcon(publication.type)}
                          <h3 className="font-semibold">{publication.title}</h3>
                          <Badge variant="outline" className="capitalize">
                            {publication.type}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{publication.description}</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <div className="flex items-center space-x-1">
                            <Eye className="w-4 h-4" />
                            <span>{publication.views}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Heart className="w-4 h-4" />
                            <span>{publication.likes}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <MessageCircle className="w-4 h-4" />
                            <span>{publication.comments}</span>
                          </div>
                          <span>Publié le {new Date(publication.publishDate).toLocaleDateString("fr-FR")}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <TrendingUp className="w-5 h-5 mr-2" />
                    Croissance des utilisateurs
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>Janvier 2024</span>
                      <span className="font-semibold">+15 utilisateurs</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Février 2024</span>
                      <span className="font-semibold">+23 utilisateurs</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Mars 2024</span>
                      <span className="font-semibold">+31 utilisateurs</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Décembre 2024</span>
                      <span className="font-semibold text-green-600">+45 utilisateurs</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Engagement par type de contenu</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-2">
                        <Video className="w-4 h-4" />
                        <span>Vidéos</span>
                      </div>
                      <span className="font-semibold">85% d'engagement</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-2">
                        <ImageIcon className="w-4 h-4" />
                        <span>Images</span>
                      </div>
                      <span className="font-semibold">72% d'engagement</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-2">
                        <Volume2 className="w-4 h-4" />
                        <span>Audio</span>
                      </div>
                      <span className="font-semibold">68% d'engagement</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-2">
                        <FileText className="w-4 h-4" />
                        <span>Texte</span>
                      </div>
                      <span className="font-semibold">45% d'engagement</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
