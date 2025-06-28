"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, Users, Video, Heart } from "lucide-react"
import { BottomNavigation } from "@/components/bottom-navigation"

interface UserProfile {
  id: string
  nickname: string
  fullName: string
  followers: number
  videos: number
  likes: number
  avatar: string
  isFollowing: boolean
}

const mockUsers: UserProfile[] = [
  {
    id: "1",
    nickname: "marie_eco",
    fullName: "Marie Dubois",
    followers: 1234,
    videos: 45,
    likes: 5678,
    avatar: "/placeholder.svg?height=60&width=60",
    isFollowing: false,
  },
  {
    id: "2",
    nickname: "thomas_green",
    fullName: "Thomas Martin",
    followers: 987,
    videos: 32,
    likes: 3456,
    avatar: "/placeholder.svg?height=60&width=60",
    isFollowing: true,
  },
  {
    id: "3",
    nickname: "sophie_nature",
    fullName: "Sophie Laurent",
    followers: 2345,
    videos: 67,
    likes: 8901,
    avatar: "/placeholder.svg?height=60&width=60",
    isFollowing: false,
  },
  {
    id: "4",
    nickname: "alex_bio",
    fullName: "Alexandre Petit",
    followers: 567,
    videos: 23,
    likes: 1234,
    avatar: "/placeholder.svg?height=60&width=60",
    isFollowing: false,
  },
  {
    id: "5",
    nickname: "emma_zero",
    fullName: "Emma Moreau",
    followers: 3456,
    videos: 89,
    likes: 12345,
    avatar: "/placeholder.svg?height=60&width=60",
    isFollowing: true,
  },
]

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [users, setUsers] = useState<UserProfile[]>(mockUsers)
  const [filteredUsers, setFilteredUsers] = useState<UserProfile[]>([])

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    if (query.trim() === "") {
      setFilteredUsers([])
    } else {
      const filtered = users.filter(
        (user) =>
          user.nickname.toLowerCase().includes(query.toLowerCase()) ||
          user.fullName.toLowerCase().includes(query.toLowerCase()),
      )
      setFilteredUsers(filtered)
    }
  }

  const handleFollow = (userId: string) => {
    setUsers((prev) =>
      prev.map((user) => {
        if (user.id === userId) {
          return {
            ...user,
            isFollowing: !user.isFollowing,
            followers: user.isFollowing ? user.followers - 1 : user.followers + 1,
          }
        }
        return user
      }),
    )

    setFilteredUsers((prev) =>
      prev.map((user) => {
        if (user.id === userId) {
          return {
            ...user,
            isFollowing: !user.isFollowing,
            followers: user.isFollowing ? user.followers - 1 : user.followers + 1,
          }
        }
        return user
      }),
    )
  }

  const displayUsers = searchQuery.trim() === "" ? users : filteredUsers

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-md mx-auto px-4 py-4">
          <h1 className="text-xl font-bold text-center text-blue-600 mb-4">Recherche</h1>

          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Rechercher un profil..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 py-4">
        {searchQuery.trim() === "" ? (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-800">Profils populaires</h2>
            <div className="space-y-3">
              {displayUsers.map((user) => (
                <Card key={user.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-4">
                      <Avatar className="w-12 h-12">
                        <AvatarImage src={user.avatar || "/placeholder.svg"} />
                        <AvatarFallback>
                          {user.fullName
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>

                      <div className="flex-1">
                        <h3 className="font-semibold">{user.fullName}</h3>
                        <p className="text-sm text-gray-500">@{user.nickname}</p>

                        <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                          <div className="flex items-center space-x-1">
                            <Users className="w-3 h-3" />
                            <span>{user.followers}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Video className="w-3 h-3" />
                            <span>{user.videos}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Heart className="w-3 h-3" />
                            <span>{user.likes}</span>
                          </div>
                        </div>
                      </div>

                      <Button
                        size="sm"
                        variant={user.isFollowing ? "outline" : "default"}
                        onClick={() => handleFollow(user.id)}
                        className="min-w-[80px]"
                      >
                        {user.isFollowing ? "Suivi" : "Suivre"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-800">
              Résultats pour "{searchQuery}" ({filteredUsers.length})
            </h2>

            {filteredUsers.length === 0 ? (
              <div className="text-center py-8">
                <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">Aucun profil trouvé</p>
                <p className="text-sm text-gray-400 mt-1">Essayez avec un autre nom ou surnom</p>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredUsers.map((user) => (
                  <Card key={user.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-4">
                        <Avatar className="w-12 h-12">
                          <AvatarImage src={user.avatar || "/placeholder.svg"} />
                          <AvatarFallback>
                            {user.fullName
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>

                        <div className="flex-1">
                          <h3 className="font-semibold">{user.fullName}</h3>
                          <p className="text-sm text-gray-500">@{user.nickname}</p>

                          <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                            <div className="flex items-center space-x-1">
                              <Users className="w-3 h-3" />
                              <span>{user.followers}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Video className="w-3 h-3" />
                              <span>{user.videos}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Heart className="w-3 h-3" />
                              <span>{user.likes}</span>
                            </div>
                          </div>
                        </div>

                        <Button
                          size="sm"
                          variant={user.isFollowing ? "outline" : "default"}
                          onClick={() => handleFollow(user.id)}
                          className="min-w-[80px]"
                        >
                          {user.isFollowing ? "Suivi" : "Suivre"}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      <BottomNavigation />
    </div>
  )
}
