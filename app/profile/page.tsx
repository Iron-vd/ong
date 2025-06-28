"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Settings, Edit, Heart, ThumbsDown, Users, Video, Shield } from "lucide-react"
import { BottomNavigation } from "@/components/bottom-navigation"
import { useRouter } from "next/navigation"

function formatNumber(n: number) {
  if (n < 1000) return n.toString()
  if (n < 1_000_000) return (n / 1000).toFixed(1).replace(/\.0$/, '') + 'K'
  return (n / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'M'
}

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [showAdminLogin, setShowAdminLogin] = useState(false)
  const [adminCode, setAdminCode] = useState("")
  const [isAdmin, setIsAdmin] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false) // Ajouté
  const [loginId, setLoginId] = useState("") // Ajouté
  const [loginPassword, setLoginPassword] = useState("") // Ajouté
  const [loginError, setLoginError] = useState("") // Ajouté
  const router = useRouter()

  const [profile, setProfile] = useState({
    firstName: "Jean",
    lastName: "Dupont",
    nickname: "JeanD",
    email: "jean.dupont@email.com",
    phone: "+33 6 12 34 56 78",
    bio: "Passionné par les causes environnementales",
  })

  const [profileImage, setProfileImage] = useState<string | null>(null)
  const [coverImage, setCoverImage] = useState<string | null>(null)

  const [stats] = useState({
    totalLikes: 156,
    totalDislikes: 8,
    totalVideos: 12,
    followers: 89,
    following: 45,
  })

  // Fonction de connexion simple (à remplacer par une vraie logique)
  const handleLogin = () => {
    // Vérification admin
    if (
      (loginId === "admin" || loginId === "admin@email.com") &&
      loginPassword === "adminpass"
    ) {
      setLoginError("")
      router.push("/admin") // Redirection vers la page admin
      return
    }
    // Vérification client
    if (
      (loginId === "JeanD" || loginId === "jean.dupont@email.com") &&
      loginPassword === "motdepasse"
    ) {
      setIsLoggedIn(true)
      setLoginError("")
      return
    }
    setLoginError("Identifiants incorrects")
  }

  const handleAdminLogin = () => {
    if (adminCode === "20112005") {
      setIsAdmin(true)
      setShowAdminLogin(false)
      setAdminCode("")
    } else {
      alert("Code administrateur incorrect")
    }
  }

  const handleSaveProfile = () => {
    setIsEditing(false)
    // Ici on sauvegarderait les modifications
  }

  // Fonction pour gérer l'import d'image
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        setProfileImage(event.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        setCoverImage(event.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  if (!isLoggedIn) {
    // Affichage du formulaire de connexion
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100">
        <Card className="w-full max-w-sm rounded-2xl shadow-lg border-0">
          <CardHeader>
            <CardTitle className="text-center text-2xl font-bold text-blue-700 mb-2">
              Connexion au profil
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="space-y-3">
              <Label htmlFor="loginId" className="text-base font-medium">Nom ou Email</Label>
              <Input
                id="loginId"
                value={loginId}
                onChange={(e) => setLoginId(e.target.value)}
                placeholder="Nom ou Email"
                className="rounded-xl py-3 px-4 text-base"
              />
            </div>
            <div className="space-y-3">
              <Label htmlFor="loginPassword" className="text-base font-medium">Mot de passe</Label>
              <Input
                id="loginPassword"
                type="password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                placeholder="Mot de passe"
                className="rounded-xl py-3 px-4 text-base"
              />
            </div>
            {loginError && (
              <div className="text-red-500 text-sm text-center">{loginError}</div>
            )}
            <Button
              className="w-full bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold rounded-xl py-3 transition-colors"
              onClick={handleLogin}
            >
              Se connecter
            </Button>

            {/* Connexion avec services externes */}
            <div className="flex flex-col gap-3 mt-4">
              <Button
                variant="outline"
                className="w-full flex items-center justify-center gap-2 border-gray-300 rounded-xl py-3 text-base font-medium"
                onClick={() => alert("Connexion Google à implémenter")}
              >
                <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5" />
                Continuer avec Google
              </Button>
              <Button
                variant="outline"
                className="w-full flex items-center justify-center gap-2 border-gray-300 rounded-xl py-3 text-base font-medium"
                onClick={() => alert("Connexion iCloud à implémenter")}
              >
                <img src="https://www.svgrepo.com/show/452234/icloud.svg" alt="iCloud" className="w-5 h-5" />
                Continuer avec iCloud
              </Button>
            </div>

            {/* Section Créer un compte moderne */}
            <div className="mt-8 border-t pt-6">
              <div className="text-center text-gray-500 text-base mb-4">
                Pas encore de compte ? <span className="font-semibold text-blue-700">Créez un compte</span>
              </div>
              <div className="flex flex-col gap-4">
                <Button
                  variant="secondary"
                  className="w-full flex items-center justify-center gap-3 rounded-2xl py-3 text-base font-semibold"
                  onClick={() => alert("Formulaire d'inscription classique à implémenter")}
                >
                  Créer un nouveau compte
                </Button>
                <div className="text-center text-gray-400 text-sm my-2">ou continuer avec</div>
                <Button
                  variant="outline"
                  className="w-full flex items-center justify-center gap-3 border-gray-300 rounded-2xl py-3 text-base font-semibold hover:bg-blue-50 transition"
                  onClick={() => {
                    // TODO: Remplacer par la vraie redirection OAuth2 Google
                    window.location.href = "/api/auth/google"
                  }}
                >
                  <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-6 h-6" />
                  Google
                </Button>
                <Button
                  variant="outline"
                  className="w-full flex items-center justify-center gap-3 border-gray-300 rounded-2xl py-3 text-base font-semibold hover:bg-gray-100 transition"
                  onClick={() => {
                    // TODO: Remplacer par la vraie redirection OAuth2 Apple
                    window.location.href = "/api/auth/apple"
                  }}
                >
                  <img src="https://www.svgrepo.com/show/452234/icloud.svg" alt="iCloud" className="w-6 h-6" />
                  iCloud
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-md md:max-w-2xl lg:max-w-3xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
          <h1 className="text-xl md:text-2xl font-bold text-blue-600">Profil</h1>
          <div className="flex gap-2">
            <Button variant="ghost" size="sm" onClick={() => setShowAdminLogin(true)}>
              <Settings className="w-5 h-5 md:w-6 md:h-6" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setIsLoggedIn(false)
                setLoginId("")
                setLoginPassword("")
                setLoginError("")
              }}
            >
              Se déconnecter
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-md md:max-w-2xl lg:max-w-3xl mx-auto px-4 md:px-8 py-6 space-y-6">
        {/* En-tête du profil */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col items-center space-y-4">
              <div className="relative">
                {/* Bannière */}
                <div className="h-40 md:h-56 w-full bg-gray-200 rounded-b-3xl overflow-hidden relative">
                  <img
                    src={coverImage || "/placeholder-cover.jpg"}
                    alt="Bannière"
                    className="object-cover w-full h-full"
                  />
                  {/* Icône appareil photo pour changer la bannière */}
                  <label className="absolute top-3 right-3 bg-white bg-opacity-80 rounded-full p-2 cursor-pointer shadow hover:bg-opacity-100 transition">
                    <input type="file" accept="image/*" className="hidden" onChange={handleCoverChange} />
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path d="M15 10l4.553-4.553a1 1 0 00-1.414-1.414L13.586 8.586a2 2 0 01-2.828 0L5.86 2.86a1 1 0 00-1.414 1.414L9 10" />
                      <circle cx="12" cy="14" r="4" />
                    </svg>
                  </label>
                  {/* Photo de profil centrée */}
                  <div className="absolute left-1/2 -bottom-12 transform -translate-x-1/2">
                    <div className="relative">
                      <Avatar className="w-24 h-24 md:w-32 md:h-32 border-4 border-white shadow-lg">
                        {profileImage ? (
                          <AvatarImage src={profileImage} />
                        ) : (
                          <AvatarImage src="/placeholder.svg?height=192&width=192" />
                        )}
                        <AvatarFallback className="text-2xl md:text-4xl">
                          {profile.firstName[0]}
                          {profile.lastName[0]}
                        </AvatarFallback>
                      </Avatar>
                      <label className="block text-sm font-medium text-gray-700 cursor-pointer mt-2">
                        <span className="flex items-center gap-2">
                          <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                            <path d="M15 10l4.553-4.553a1 1 0 00-1.414-1.414L13.586 8.586a2 2 0 01-2.828 0L5.86 2.86a1 1 0 00-1.414 1.414L9 10" />
                            <circle cx="12" cy="14" r="4" />
                          </svg>
                          Changer la photo de profil
                        </span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleImageChange}
                        />
                      </label>
                    </div>
                  </div>
                </div>
                {/* Décalage pour la photo de profil */}
                <div className="h-16" />
              </div>

              <div className="text-center mt-2">
                <h2 className="text-2xl md:text-3xl font-extrabold text-blue-800 tracking-tight">{profile.nickname}</h2>
                <p className="text-gray-700 text-lg">{profile.firstName} {profile.lastName}</p>
                {profile.bio && <p className="text-base text-gray-500 italic mt-1">{profile.bio}</p>}
                {/* Champ statut/humeur */}
                <div className="mt-2">
                  <Input
                    value={profile.status || ""}
                    onChange={e => setProfile({ ...profile, status: e.target.value })}
                    placeholder="Exprimez votre humeur ou statut..."
                    className="text-center rounded-xl border-blue-200"
                  />
                </div>
              </div>

              <div className="flex justify-center gap-8 mt-6">
                <div className="flex flex-col items-center">
                  <Users className="w-7 h-7 text-green-500 mb-1" />
                  <span className="text-xl font-bold">{formatNumber(stats.followers)}</span>
                  <span className="text-xs text-gray-500">Abonnés</span>
                </div>
                <div className="flex flex-col items-center">
                  <Users className="w-7 h-7 text-blue-500 mb-1" />
                  <span className="text-xl font-bold">{formatNumber(stats.following)}</span>
                  <span className="text-xs text-gray-500">Abonnements</span>
                </div>
                <div className="flex flex-col items-center">
                  <Video className="w-7 h-7 text-purple-500 mb-1" />
                  <span className="text-xl font-bold">{formatNumber(stats.totalVideos)}</span>
                  <span className="text-xs text-gray-500">Vidéos</span>
                </div>
              </div>

              <Button
                className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl py-3 flex items-center justify-center gap-2"
                onClick={() => setIsEditing(true)}
              >
                <Edit className="w-5 h-5" />
                Modifier le profil
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Statistiques */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Statistiques</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <Heart className="w-5 h-5 text-red-500" />
                <div>
                  <p className="font-semibold">{formatNumber(stats.totalLikes)}</p>
                  <p className="text-sm text-gray-500">J'aime reçus</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <ThumbsDown className="w-5 h-5 text-gray-500" />
                <div>
                  <p className="font-semibold">{formatNumber(stats.totalDislikes)}</p>
                  <p className="text-sm text-gray-500">Je n'aime pas</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Video className="w-5 h-5 text-blue-500" />
                <div>
                  <p className="font-semibold">{formatNumber(stats.totalVideos)}</p>
                  <p className="text-sm text-gray-500">Vidéos publiées</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="w-5 h-5 text-green-500" />
                <div>
                  <p className="font-semibold">{formatNumber(stats.followers + stats.following)}</p>
                  <p className="text-sm text-gray-500">Réseau total</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Mes publications */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Mes Publications</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="videos" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="videos">Vidéos</TabsTrigger>
                <TabsTrigger value="liked">Aimées</TabsTrigger>
              </TabsList>

              <TabsContent value="videos" className="space-y-3 mt-4">
                <div className="grid grid-cols-3 gap-2">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className="aspect-square bg-gray-200 rounded-lg relative">
                      <img
                        src={`/placeholder.svg?height=120&width=120`}
                        alt={`Vidéo ${i}`}
                        className="w-full h-full object-cover rounded-lg"
                      />
                      <div className="absolute bottom-1 right-1 bg-black bg-opacity-50 text-white text-xs px-1 rounded">
                        1:23
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="liked" className="space-y-3 mt-4">
                <div className="grid grid-cols-3 gap-2">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="aspect-square bg-gray-200 rounded-lg relative">
                      <img
                        src={`/placeholder.svg?height=120&width=120`}
                        alt={`Vidéo aimée ${i}`}
                        className="w-full h-full object-cover rounded-lg"
                      />
                      <Heart className="absolute top-1 right-1 w-4 h-4 text-red-500 fill-current" />
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Panel Admin */}
        {isAdmin && (
          <Card className="border-orange-200 bg-orange-50">
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <Shield className="w-5 h-5 mr-2 text-orange-600" />
                Panel Administrateur
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full" onClick={() => router.push("/admin")}>
                Accéder à l'administration
              </Button>
              <Button variant="outline" className="w-full" onClick={() => router.push("/admin/publish")}>
                Publier du contenu
              </Button>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Dialog de modification du profil */}
      <Dialog open={isEditing} onOpenChange={setIsEditing}>
        <DialogContent className="max-w-md mx-auto">
          <DialogHeader>
            <DialogTitle>Modifier le profil</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="editFirstName">Prénom</Label>
                <Input
                  id="editFirstName"
                  value={profile.firstName}
                  onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="editLastName">Nom</Label>
                <Input
                  id="editLastName"
                  value={profile.lastName}
                  onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="editNickname">Surnom</Label>
              <Input
                id="editNickname"
                value={profile.nickname}
                onChange={(e) => setProfile({ ...profile, nickname: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="editBio">Bio</Label>
              <Input
                id="editBio"
                value={profile.bio}
                onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                placeholder="Parlez-nous de vous..."
              />
            </div>

            <div className="flex space-x-2">
              <Button onClick={handleSaveProfile} className="flex-1">
                Sauvegarder
              </Button>
              <Button variant="outline" onClick={() => setIsEditing(false)} className="flex-1">
                Annuler
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Dialog de connexion admin */}
      <Dialog open={showAdminLogin} onOpenChange={setShowAdminLogin}>
        <DialogContent className="max-w-md mx-auto">
          <DialogHeader>
            <DialogTitle>Connexion Administrateur</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="adminCode">Code administrateur</Label>
              <Input
                id="adminCode"
                type="password"
                placeholder="Entrez le code"
                value={adminCode}
                onChange={(e) => setAdminCode(e.target.value)}
              />
            </div>
            <div className="flex space-x-2">
              <Button onClick={handleAdminLogin} className="flex-1">
                Se connecter
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setShowAdminLogin(false)
                  setAdminCode("")
                }}
                className="flex-1"
              >
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
