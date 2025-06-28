"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Send, ArrowLeft, Shield } from "lucide-react"
import { BottomNavigation } from "@/components/bottom-navigation"

interface ChatContact {
  id: string
  name: string
  nickname: string
  lastMessage: string
  timestamp: string
  unreadCount: number
  isOnline: boolean
  isAdmin: boolean
  avatar: string
}

interface Message {
  id: string
  senderId: string
  content: string
  timestamp: string
  isOwn: boolean
}

const mockContacts: ChatContact[] = [
  {
    id: "1",
    name: "Admin ONG",
    nickname: "@admin_ong",
    lastMessage: "Merci pour votre engagement !",
    timestamp: "14:30",
    unreadCount: 0,
    isOnline: true,
    isAdmin: true,
    avatar: "/placeholder.svg?height=50&width=50",
  },
  {
    id: "2",
    name: "Marie Dubois",
    nickname: "@marie_eco",
    lastMessage: "Super vidéo sur le compostage !",
    timestamp: "12:45",
    unreadCount: 2,
    isOnline: true,
    isAdmin: false,
    avatar: "/placeholder.svg?height=50&width=50",
  },
  {
    id: "3",
    name: "Thomas Martin",
    nickname: "@thomas_green",
    lastMessage: "On se voit demain pour le projet ?",
    timestamp: "11:20",
    unreadCount: 0,
    isOnline: false,
    isAdmin: false,
    avatar: "/placeholder.svg?height=50&width=50",
  },
  {
    id: "4",
    name: "Sophie Laurent",
    nickname: "@sophie_nature",
    lastMessage: "Merci pour les conseils !",
    timestamp: "Hier",
    unreadCount: 1,
    isOnline: true,
    isAdmin: false,
    avatar: "/placeholder.svg?height=50&width=50",
  },
]

const mockMessages: Message[] = [
  {
    id: "1",
    senderId: "2",
    content: "Salut ! J'ai vu ta dernière vidéo, elle est géniale !",
    timestamp: "12:40",
    isOwn: false,
  },
  {
    id: "2",
    senderId: "me",
    content: "Merci beaucoup ! Ça me fait plaisir 😊",
    timestamp: "12:42",
    isOwn: true,
  },
  {
    id: "3",
    senderId: "2",
    content: "Tu pourrais faire une vidéo sur le compostage ?",
    timestamp: "12:43",
    isOwn: false,
  },
  {
    id: "4",
    senderId: "me",
    content: "Excellente idée ! Je vais y réfléchir",
    timestamp: "12:44",
    isOwn: true,
  },
  {
    id: "5",
    senderId: "2",
    content: "Super vidéo sur le compostage !",
    timestamp: "12:45",
    isOwn: false,
  },
]

export default function ChatPage() {
  const [contacts, setContacts] = useState<ChatContact[]>(mockContacts)
  const [selectedContact, setSelectedContact] = useState<ChatContact | null>(null)
  const [messages, setMessages] = useState<Message[]>(mockMessages)
  const [newMessage, setNewMessage] = useState("")

  const handleSelectContact = (contact: ChatContact) => {
    setSelectedContact(contact)
    // Marquer les messages comme lus
    setContacts((prev) => prev.map((c) => (c.id === contact.id ? { ...c, unreadCount: 0 } : c)))
  }

  const handleSendMessage = () => {
    if (newMessage.trim() && selectedContact) {
      const message: Message = {
        id: Date.now().toString(),
        senderId: "me",
        content: newMessage.trim(),
        timestamp: new Date().toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" }),
        isOwn: true,
      }

      setMessages((prev) => [...prev, message])
      setNewMessage("")

      // Mettre à jour le dernier message du contact
      setContacts((prev) =>
        prev.map((c) =>
          c.id === selectedContact.id ? { ...c, lastMessage: newMessage.trim(), timestamp: message.timestamp } : c,
        ),
      )
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  if (selectedContact) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        {/* En-tête du chat */}
        <div className="bg-white shadow-sm border-b">
          <div className="max-w-md mx-auto px-4 py-4 flex items-center space-x-3">
            <Button variant="ghost" size="sm" onClick={() => setSelectedContact(null)}>
              <ArrowLeft className="w-5 h-5" />
            </Button>

            <Avatar className="w-10 h-10">
              <AvatarImage src={selectedContact.avatar || "/placeholder.svg"} />
              <AvatarFallback>
                {selectedContact.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1">
              <div className="flex items-center space-x-2">
                <h2 className="font-semibold">{selectedContact.name}</h2>
                {selectedContact.isAdmin && <Shield className="w-4 h-4 text-orange-500" />}
              </div>
              <p className="text-sm text-gray-500">{selectedContact.isOnline ? "En ligne" : "Hors ligne"}</p>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 max-w-md mx-auto w-full px-4 py-4 space-y-4 overflow-y-auto">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.isOwn ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-xs px-4 py-2 rounded-2xl ${
                  message.isOwn ? "bg-blue-500 text-white" : "bg-white text-gray-800 shadow-sm"
                }`}
              >
                <p className="text-sm">{message.content}</p>
                <p className={`text-xs mt-1 ${message.isOwn ? "text-blue-100" : "text-gray-500"}`}>
                  {message.timestamp}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Zone de saisie */}
        <div className="bg-white border-t p-4">
          <div className="max-w-md mx-auto flex items-center space-x-2">
            <Input
              placeholder="Tapez votre message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1"
            />
            <Button onClick={handleSendMessage} disabled={!newMessage.trim()} size="sm">
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-md mx-auto px-4 py-4">
          <h1 className="text-xl font-bold text-center text-blue-600">Messages</h1>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 py-4 space-y-3">
        {contacts.map((contact) => (
          <Card
            key={contact.id}
            className="cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => handleSelectContact(contact)}
          >
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={contact.avatar || "/placeholder.svg"} />
                    <AvatarFallback>
                      {contact.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  {contact.isOnline && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <h3 className="font-semibold truncate">{contact.name}</h3>
                    {contact.isAdmin && <Shield className="w-4 h-4 text-orange-500 flex-shrink-0" />}
                  </div>
                  <p className="text-sm text-gray-500 truncate">{contact.lastMessage}</p>
                </div>

                <div className="flex flex-col items-end space-y-1">
                  <span className="text-xs text-gray-400">{contact.timestamp}</span>
                  {contact.unreadCount > 0 && (
                    <Badge className="bg-blue-500 text-white text-xs min-w-[20px] h-5 flex items-center justify-center">
                      {contact.unreadCount}
                    </Badge>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <BottomNavigation />
    </div>
  )
}
