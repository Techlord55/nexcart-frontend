'use client'

import { useState, useEffect } from 'react'
import api from '@/lib/api' 
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Save, Settings2, ShieldCheck, Loader2 } from 'lucide-react'

export default function SettingsPage() {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [settings, setSettings] = useState({
    store_name: '',
    support_email: '',
    maintenance_mode: false,
    require_email_verification: true
  })

  useEffect(() => {
    fetchSettings()
  }, [])

  const fetchSettings = async () => {
    try {
      const response = await api.client.get('/users/admin/settings/')
      setSettings(response.data)
    } catch (error) {
      console.error("Failed to fetch settings", error)
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      await api.client.patch('/users/admin/settings/', settings)
      alert("Settings saved successfully!")
    } catch (error) {
      console.error("Error saving settings", error)
      alert("Error saving settings")
    } finally {
      setSaving(false)
    }
  }

  if (loading) return (
    <div className="flex h-64 items-center justify-center">
      <Loader2 className="w-8 h-8 animate-spin text-primary" />
    </div>
  )

  return (
    <div className="p-6 space-y-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold">Store Settings</h1>
          <p className="text-muted-foreground">Configure global parameters and security.</p>
        </div>
        <Button onClick={handleSave} disabled={saving} className="gap-2">
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          Save Changes
        </Button>
      </div>

      <Tabs defaultValue="general">
        <TabsList className="mb-4">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Settings2 className="w-5 h-5"/> Branding</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Store Name</Label>
                <Input 
                  value={settings.store_name} 
                  onChange={(e) => setSettings({...settings, store_name: e.target.value})} 
                />
              </div>
              <div className="space-y-2">
                <Label>Support Email</Label>
                <Input 
                  value={settings.support_email} 
                  onChange={(e) => setSettings({...settings, support_email: e.target.value})} 
                />
              </div>
              <div className="flex items-center justify-between pt-4">
                <Label>Maintenance Mode</Label>
                <Switch 
                  checked={settings.maintenance_mode} 
                  onCheckedChange={(val) => setSettings({...settings, maintenance_mode: val})} 
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><ShieldCheck className="w-5 h-5"/> Access Control</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <Label>Require Email Verification</Label>
                <Switch 
                  checked={settings.require_email_verification} 
                  onCheckedChange={(val) => setSettings({...settings, require_email_verification: val})} 
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}