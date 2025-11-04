"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Users, UserPlus, Edit, Trash2, Key, QrCode, Contact, Database, LogOut } from "lucide-react"
import BackgroundPattern from "@/components/background-pattern"

interface UserProfile {
  id: string
  full_name: string
  email: string
  avatar_url: string | null
  created_at: string
  updated_at: string
}

interface ContactType {
  id: string
  name: string
  email: string
  source: string
  status: string
  was_notified: boolean
  created_at: string
  updated_at: string
}

interface ApiKey {
  id: string
  user_id: string
  key_name: string
  api_key: string
  is_active: boolean
  created_at: string
  updated_at: string
}

interface QrCodeType {
  id: string
  user_id: string
  bot_id: string
  description: string
  is_active: boolean
  created_at: string
  updated_at: string
}

// Demo data
const initialProfiles: UserProfile[] = [
  {
    id: "1",
    full_name: "John Doe",
    email: "john.doe@example.com",
    avatar_url: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    created_at: "2024-01-15T10:00:00Z",
    updated_at: "2024-01-15T10:00:00Z",
  },
  {
    id: "2",
    full_name: "Jane Smith",
    email: "jane.smith@example.com",
    avatar_url: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    created_at: "2024-01-16T11:00:00Z",
    updated_at: "2024-01-16T11:00:00Z",
  },
]

const initialContacts: ContactType[] = [
  {
    id: "1",
    name: "Alice Brown",
    email: "alice.brown@example.com",
    source: "website",
    status: "active",
    was_notified: true,
    created_at: "2024-01-15T10:00:00Z",
    updated_at: "2024-01-15T10:00:00Z",
  },
  {
    id: "2",
    name: "Bob Davis",
    email: "bob.davis@example.com",
    source: "manual",
    status: "pending",
    was_notified: false,
    created_at: "2024-01-16T11:00:00Z",
    updated_at: "2024-01-16T11:00:00Z",
  },
]

const initialApiKeys: ApiKey[] = [
  {
    id: "1",
    user_id: "demo-user",
    key_name: "Production API",
    api_key: "sk-prod-1234567890abcdef",
    is_active: true,
    created_at: "2024-01-15T10:00:00Z",
    updated_at: "2024-01-15T10:00:00Z",
  },
  {
    id: "2",
    user_id: "demo-user",
    key_name: "Development API",
    api_key: "sk-dev-abcdef1234567890",
    is_active: false,
    created_at: "2024-01-16T11:00:00Z",
    updated_at: "2024-01-16T11:00:00Z",
  },
]

const initialQrCodes: QrCodeType[] = [
  {
    id: "1",
    user_id: "demo-user",
    bot_id: "bot_whatsapp_001",
    description: "WhatsApp Business Bot - Main",
    is_active: true,
    created_at: "2024-01-15T10:00:00Z",
    updated_at: "2024-01-15T10:00:00Z",
  },
  {
    id: "2",
    user_id: "demo-user",
    bot_id: "bot_telegram_001",
    description: "Telegram Customer Service",
    is_active: false,
    created_at: "2024-01-16T11:00:00Z",
    updated_at: "2024-01-16T11:00:00Z",
  },
]

export default function DemoDashboardContent() {
  const [profiles, setProfiles] = useState<UserProfile[]>(initialProfiles)
  const [contacts, setContacts] = useState<ContactType[]>(initialContacts)
  const [apiKeys, setApiKeys] = useState<ApiKey[]>(initialApiKeys)
  const [qrCodes, setQrCodes] = useState<QrCodeType[]>(initialQrCodes)
  const [editingProfile, setEditingProfile] = useState<string | null>(null)
  const [editForm, setEditForm] = useState<Partial<UserProfile>>({})
  const [newProfile, setNewProfile] = useState({
    full_name: "",
    email: "",
    avatar_url: "",
  })
  const [newContact, setNewContact] = useState({
    name: "",
    email: "",
    source: "manual",
    status: "active",
  })
  const [newApiKey, setNewApiKey] = useState({
    key_name: "",
    api_key: "",
  })
  const [newQrCode, setNewQrCode] = useState({
    bot_id: "",
    description: "",
  })
  const [showAddForms, setShowAddForms] = useState({
    profile: false,
    contact: false,
    apiKey: false,
    qrCode: false,
  })

  const generateId = () => Math.random().toString(36).substr(2, 9)
  const getCurrentTimestamp = () => new Date().toISOString()

  const createProfile = () => {
    const newProfileData: UserProfile = {
      id: generateId(),
      ...newProfile,
      created_at: getCurrentTimestamp(),
      updated_at: getCurrentTimestamp(),
    }
    setProfiles([newProfileData, ...profiles])
    setNewProfile({ full_name: "", email: "", avatar_url: "" })
    setShowAddForms({ ...showAddForms, profile: false })
  }

  const createContact = () => {
    const newContactData: ContactType = {
      id: generateId(),
      ...newContact,
      was_notified: false,
      created_at: getCurrentTimestamp(),
      updated_at: getCurrentTimestamp(),
    }
    setContacts([newContactData, ...contacts])
    setNewContact({ name: "", email: "", source: "manual", status: "active" })
    setShowAddForms({ ...showAddForms, contact: false })
  }

  const createApiKey = () => {
    const newApiKeyData: ApiKey = {
      id: generateId(),
      ...newApiKey,
      user_id: "demo-user",
      is_active: true,
      created_at: getCurrentTimestamp(),
      updated_at: getCurrentTimestamp(),
    }
    setApiKeys([newApiKeyData, ...apiKeys])
    setNewApiKey({ key_name: "", api_key: "" })
    setShowAddForms({ ...showAddForms, apiKey: false })
  }

  const createQrCode = () => {
    const newQrCodeData: QrCodeType = {
      id: generateId(),
      ...newQrCode,
      user_id: "demo-user",
      is_active: true,
      created_at: getCurrentTimestamp(),
      updated_at: getCurrentTimestamp(),
    }
    setQrCodes([newQrCodeData, ...qrCodes])
    setNewQrCode({ bot_id: "", description: "" })
    setShowAddForms({ ...showAddForms, qrCode: false })
  }

  const updateProfile = (id: string) => {
    setProfiles(profiles.map((p) => (p.id === id ? { ...p, ...editForm, updated_at: getCurrentTimestamp() } : p)))
    setEditingProfile(null)
    setEditForm({})
  }

  const deleteProfile = (id: string) => {
    setProfiles(profiles.filter((p) => p.id !== id))
  }

  const deleteContact = (id: string) => {
    setContacts(contacts.filter((c) => c.id !== id))
  }

  const deleteApiKey = (id: string) => {
    setApiKeys(apiKeys.filter((k) => k.id !== id))
  }

  const deleteQrCode = (id: string) => {
    setQrCodes(qrCodes.filter((q) => q.id !== id))
  }

  const toggleApiKeyStatus = (id: string, currentStatus: boolean) => {
    setApiKeys(apiKeys.map((k) => (k.id === id ? { ...k, is_active: !currentStatus } : k)))
  }

  const toggleQrCodeStatus = (id: string, currentStatus: boolean) => {
    setQrCodes(qrCodes.map((q) => (q.id === id ? { ...q, is_active: !currentStatus } : q)))
  }

  const startEdit = (profile: UserProfile) => {
    setEditingProfile(profile.id)
    setEditForm(profile)
  }

  const cancelEdit = () => {
    setEditingProfile(null)
    setEditForm({})
  }

  const handleLogout = () => {
    window.location.href = "/"
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#050508] text-white">
      <BackgroundPattern />

      {/* Header */}
      <header className="border-b border-white/10 bg-white/5 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-white/10 border border-white/10">
                <Database className="h-6 w-6 text-cyan-300" />
              </div>
              <h1 className="text-2xl font-bold text-white">Demo Database Management</h1>
              <Badge variant="secondary" className="bg-cyan-500/15 text-cyan-200 border-cyan-500/30 uppercase tracking-[0.2em]">
                Demo Mode
              </Badge>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex space-x-2">
                <Badge variant="secondary" className="px-3 py-1 bg-white/10 text-slate-200 border-white/20">
                  {profiles.length} Profiles
                </Badge>
                <Badge variant="secondary" className="px-3 py-1 bg-white/10 text-slate-200 border-white/20">
                  {contacts.length} Contacts
                </Badge>
                <Badge variant="secondary" className="px-3 py-1 bg-white/10 text-slate-200 border-white/20">
                  {apiKeys.length} API Keys
                </Badge>
                <Badge variant="secondary" className="px-3 py-1 bg-white/10 text-slate-200 border-white/20">
                  {qrCodes.length} QR Codes
                </Badge>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="flex items-center gap-2 border-white/20 text-white hover:bg-white/10"
              >
                <LogOut className="h-4 w-4" />
                Exit Demo
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">Welcome to the Demo!</h2>
          <p className="text-slate-300">Experience full CRUD operations across all database tables</p>
          <div className="mt-4 bg-white/5 border border-white/10 rounded-lg p-4">
            <p className="text-sm text-slate-200">
              <strong className="text-cyan-300">Demo Mode:</strong> All changes are temporary and will reset when you
              refresh the page. This demonstrates the full functionality without requiring database setup.
            </p>
          </div>
        </div>

        <Tabs defaultValue="profiles" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-white/10 border border-white/20 backdrop-blur">
            <TabsTrigger
              value="profiles"
              className="flex items-center gap-2 text-slate-300 data-[state=active]:bg-cyan-500/15 data-[state=active]:text-white"
            >
              <Users className="h-4 w-4" />
              Profiles
            </TabsTrigger>
            <TabsTrigger
              value="contacts"
              className="flex items-center gap-2 text-slate-300 data-[state=active]:bg-cyan-500/15 data-[state=active]:text-white"
            >
              <Contact className="h-4 w-4" />
              Contacts
            </TabsTrigger>
            <TabsTrigger
              value="api-keys"
              className="flex items-center gap-2 text-slate-300 data-[state=active]:bg-cyan-500/15 data-[state=active]:text-white"
            >
              <Key className="h-4 w-4" />
              API Keys
            </TabsTrigger>
            <TabsTrigger
              value="qr-codes"
              className="flex items-center gap-2 text-slate-300 data-[state=active]:bg-cyan-500/15 data-[state=active]:text-white"
            >
              <QrCode className="h-4 w-4" />
              QR Codes
            </TabsTrigger>
          </TabsList>

          {/* Profiles Tab */}
          <TabsContent value="profiles" className="space-y-6">
            <Card className="bg-white/10 backdrop-blur border border-white/20 text-white">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2 text-white">
                      <UserPlus className="h-5 w-5" />
                      Add New Profile
                    </CardTitle>
                    <CardDescription className="text-slate-300">Create a new user profile</CardDescription>
                  </div>
                  <Button
                    onClick={() => setShowAddForms({ ...showAddForms, profile: !showAddForms.profile })}
                    className="bg-cyan-500 hover:bg-cyan-400 text-black"
                  >
                    {showAddForms.profile ? "Cancel" : "Add Profile"}
                  </Button>
                </div>
              </CardHeader>
              {showAddForms.profile && (
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="fullName">Full Name</Label>
                      <Input
                        id="fullName"
                        value={newProfile.full_name}
                        onChange={(e) => setNewProfile({ ...newProfile, full_name: e.target.value })}
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={newProfile.email}
                        onChange={(e) => setNewProfile({ ...newProfile, email: e.target.value })}
                        placeholder="john@example.com"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Label htmlFor="avatarUrl">Avatar URL</Label>
                      <Input
                        id="avatarUrl"
                        value={newProfile.avatar_url}
                        onChange={(e) => setNewProfile({ ...newProfile, avatar_url: e.target.value })}
                        placeholder="https://example.com/avatar.jpg"
                      />
                    </div>
                  </div>
                  <div className="flex justify-end mt-4">
                    <Button onClick={createProfile}>Create Profile</Button>
                  </div>
                </CardContent>
              )}
            </Card>

            <div className="space-y-4">
              {profiles.map((profile) => (
                <Card key={profile.id} className="bg-white/10 backdrop-blur border border-white/20 text-white">
                  <CardContent className="p-6">
                    {editingProfile === profile.id ? (
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label className="text-slate-200">Full Name</Label>
                            <Input
                              value={editForm.full_name || ""}
                              onChange={(e) => setEditForm({ ...editForm, full_name: e.target.value })}
                            />
                          </div>
                          <div>
                            <Label className="text-slate-200">Email</Label>
                            <Input
                              type="email"
                              value={editForm.email || ""}
                              onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                            />
                          </div>
                          <div className="md:col-span-2">
                            <Label className="text-slate-200">Avatar URL</Label>
                            <Input
                              value={editForm.avatar_url || ""}
                              onChange={(e) => setEditForm({ ...editForm, avatar_url: e.target.value })}
                            />
                          </div>
                        </div>
                        <div className="flex justify-end space-x-2">
                          <Button variant="outline" onClick={cancelEdit} className="border-white/20 text-white hover:bg-white/10">
                            Cancel
                          </Button>
                          <Button onClick={() => updateProfile(profile.id)} className="bg-cyan-500 hover:bg-cyan-400 text-black">
                            Save Changes
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <div className="flex justify-between items-start mb-4">
                          <div className="flex items-center space-x-4">
                            {profile.avatar_url && (
                              <Image
                                src={profile.avatar_url || "/placeholder.svg"}
                                alt={profile.full_name}
                                width={48}
                                height={48}
                                className="w-12 h-12 rounded-full object-cover"
                                sizes="48px"
                              />
                            )}
                            <div>
                              <h4 className="text-lg font-semibold text-white">{profile.full_name}</h4>
                              <p className="text-slate-300">{profile.email}</p>
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => startEdit(profile)}
                              className="border-white/20 text-white hover:bg-white/10"
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => deleteProfile(profile.id)}
                              className="border-red-400/40 text-red-300 hover:bg-red-500/10"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        <Separator className="my-4" />
                        <div className="flex justify-between text-sm text-slate-300">
                          <span>Created: {new Date(profile.created_at).toLocaleDateString()}</span>
                          <span>Updated: {new Date(profile.updated_at).toLocaleDateString()}</span>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Contacts Tab */}
          <TabsContent value="contacts" className="space-y-6">
            <Card className="bg-white/10 backdrop-blur border border-white/20 text-white">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-white">Add New Contact</CardTitle>
                    <CardDescription className="text-slate-300">Create a new contact entry</CardDescription>
                  </div>
                  <Button
                    onClick={() => setShowAddForms({ ...showAddForms, contact: !showAddForms.contact })}
                    className="bg-cyan-500 hover:bg-cyan-400 text-black"
                  >
                    {showAddForms.contact ? "Cancel" : "Add Contact"}
                  </Button>
                </div>
              </CardHeader>
              {showAddForms.contact && (
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-slate-200">Name</Label>
                      <Input
                        value={newContact.name}
                        onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
                        placeholder="Contact Name"
                      />
                    </div>
                    <div>
                      <Label className="text-slate-200">Email</Label>
                      <Input
                        type="email"
                        value={newContact.email}
                        onChange={(e) => setNewContact({ ...newContact, email: e.target.value })}
                        placeholder="contact@example.com"
                      />
                    </div>
                    <div>
                      <Label className="text-slate-200">Source</Label>
                      <Input
                        value={newContact.source}
                        onChange={(e) => setNewContact({ ...newContact, source: e.target.value })}
                        placeholder="manual, import, api"
                      />
                    </div>
                    <div>
                      <Label className="text-slate-200">Status</Label>
                      <Input
                        value={newContact.status}
                        onChange={(e) => setNewContact({ ...newContact, status: e.target.value })}
                        placeholder="active, inactive, pending"
                      />
                    </div>
                  </div>
                  <div className="flex justify-end mt-4">
                    <Button onClick={createContact} className="bg-cyan-500 hover:bg-cyan-400 text-black">
                      Create Contact
                    </Button>
                  </div>
                </CardContent>
              )}
            </Card>

            <div className="grid gap-4">
              {contacts.map((contact) => (
                <Card key={contact.id} className="bg-white/10 backdrop-blur border border-white/20 text-white">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="text-lg font-semibold text-white">{contact.name}</h4>
                        <p className="text-slate-300">{contact.email}</p>
                        <div className="flex space-x-2 mt-2">
                          <Badge className="bg-white/10 text-slate-200 border-white/20">{contact.source}</Badge>
                          <Badge
                            className={
                              contact.status === "active"
                                ? "bg-emerald-500/20 text-emerald-200 border-emerald-500/40"
                                : "bg-white/10 text-slate-200 border-white/20"
                            }
                          >
                            {contact.status}
                          </Badge>
                          {contact.was_notified && (
                            <Badge className="bg-cyan-500/15 text-cyan-200 border-cyan-500/30">Notified</Badge>
                          )}
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => deleteContact(contact.id)}
                        className="border-red-400/40 text-red-300 hover:bg-red-500/10"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* API Keys Tab */}
          <TabsContent value="api-keys" className="space-y-6">
            <Card className="bg-white/10 backdrop-blur border border-white/20 text-white">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-white">Add New API Key</CardTitle>
                    <CardDescription className="text-slate-300">Create a new API key</CardDescription>
                  </div>
                  <Button
                    onClick={() => setShowAddForms({ ...showAddForms, apiKey: !showAddForms.apiKey })}
                    className="bg-cyan-500 hover:bg-cyan-400 text-black"
                  >
                    {showAddForms.apiKey ? "Cancel" : "Add API Key"}
                  </Button>
                </div>
              </CardHeader>
              {showAddForms.apiKey && (
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-slate-200">Key Name</Label>
                      <Input
                        value={newApiKey.key_name}
                        onChange={(e) => setNewApiKey({ ...newApiKey, key_name: e.target.value })}
                        placeholder="Production API Key"
                      />
                    </div>
                    <div>
                      <Label className="text-slate-200">API Key</Label>
                      <Input
                        value={newApiKey.api_key}
                        onChange={(e) => setNewApiKey({ ...newApiKey, api_key: e.target.value })}
                        placeholder="sk-..."
                      />
                    </div>
                  </div>
                  <div className="flex justify-end mt-4">
                    <Button onClick={createApiKey} className="bg-cyan-500 hover:bg-cyan-400 text-black">
                      Create API Key
                    </Button>
                  </div>
                </CardContent>
              )}
            </Card>

            <div className="grid gap-4">
              {apiKeys.map((apiKey) => (
                <Card key={apiKey.id} className="bg-white/10 backdrop-blur border border-white/20 text-white">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="text-lg font-semibold text-white">{apiKey.key_name}</h4>
                        <p className="text-slate-300 font-mono text-sm">{apiKey.api_key}</p>
                        <div className="flex space-x-2 mt-2">
                          <Badge
                            className={
                              apiKey.is_active
                                ? "bg-emerald-500/20 text-emerald-200 border-emerald-500/40"
                                : "bg-white/10 text-slate-200 border-white/20"
                            }
                          >
                            {apiKey.is_active ? "Active" : "Inactive"}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => toggleApiKeyStatus(apiKey.id, apiKey.is_active)}
                          className="border-white/20 text-white hover:bg-white/10"
                        >
                          {apiKey.is_active ? "Deactivate" : "Activate"}
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => deleteApiKey(apiKey.id)}
                          className="border-red-400/40 text-red-300 hover:bg-red-500/10"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* QR Codes Tab */}
          <TabsContent value="qr-codes" className="space-y-6">
            <Card className="bg-white/10 backdrop-blur border border-white/20 text-white">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-white">Add New QR Code</CardTitle>
                    <CardDescription className="text-slate-300">Create a new QR code entry</CardDescription>
                  </div>
                  <Button
                    onClick={() => setShowAddForms({ ...showAddForms, qrCode: !showAddForms.qrCode })}
                    className="bg-cyan-500 hover:bg-cyan-400 text-black"
                  >
                    {showAddForms.qrCode ? "Cancel" : "Add QR Code"}
                  </Button>
                </div>
              </CardHeader>
              {showAddForms.qrCode && (
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-slate-200">Bot ID</Label>
                      <Input
                        value={newQrCode.bot_id}
                        onChange={(e) => setNewQrCode({ ...newQrCode, bot_id: e.target.value })}
                        placeholder="bot_12345"
                      />
                    </div>
                    <div>
                      <Label className="text-slate-200">Description</Label>
                      <Input
                        value={newQrCode.description}
                        onChange={(e) => setNewQrCode({ ...newQrCode, description: e.target.value })}
                        placeholder="WhatsApp Bot QR Code"
                      />
                    </div>
                  </div>
                  <div className="flex justify-end mt-4">
                    <Button onClick={createQrCode} className="bg-cyan-500 hover:bg-cyan-400 text-black">
                      Create QR Code
                    </Button>
                  </div>
                </CardContent>
              )}
            </Card>

            <div className="grid gap-4">
              {qrCodes.map((qrCode) => (
                <Card key={qrCode.id} className="bg-white/10 backdrop-blur border border-white/20 text-white">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="text-lg font-semibold text-white">{qrCode.description}</h4>
                        <p className="text-slate-300">Bot ID: {qrCode.bot_id}</p>
                        <div className="flex space-x-2 mt-2">
                          <Badge
                            className={
                              qrCode.is_active
                                ? "bg-emerald-500/20 text-emerald-200 border-emerald-500/40"
                                : "bg-white/10 text-slate-200 border-white/20"
                            }
                          >
                            {qrCode.is_active ? "Active" : "Inactive"}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => toggleQrCodeStatus(qrCode.id, qrCode.is_active)}
                          className="border-white/20 text-white hover:bg-white/10"
                        >
                          {qrCode.is_active ? "Deactivate" : "Activate"}
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => deleteQrCode(qrCode.id)}
                          className="border-red-400/40 text-red-300 hover:bg-red-500/10"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
