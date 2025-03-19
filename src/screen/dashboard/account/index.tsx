import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function AccountSettings () {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 container p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">System Settings</h1>
          <Button>Save Changes</Button>
        </div>

        <Tabs defaultValue="account" className="w-full mb-8">
          <TabsList>
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="appearance">Appearance</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="system">System</TabsTrigger>
          </TabsList>

          <TabsContent value="account" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Account Settings</CardTitle>
                <CardDescription>Manage your account information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Personal Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input id="name" defaultValue="Admin User" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input id="email" type="email" defaultValue="admin@techcomp.com" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input id="phone" type="tel" defaultValue="+62 123 4567 890" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="role">Role</Label>
                      <Input id="role" defaultValue="Administrator" disabled />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Profile Picture</h3>
                  <div className="flex items-center gap-4">
                    <div className="h-24 w-24 rounded-full bg-muted flex items-center justify-center text-2xl font-bold">
                      AD
                    </div>
                    <div className="space-y-2">
                      <Button variant="outline">Upload New Picture</Button>
                      <p className="text-xs text-muted-foreground">Recommended: Square image, at least 300x300px</p>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button>Save Account Settings</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="appearance" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Appearance Settings</CardTitle>
                <CardDescription>Customize the look and feel of the application</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Theme</h3>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="theme">Color Theme</Label>
                      <p className="text-sm text-muted-foreground">Choose between light and dark mode</p>
                    </div>
                    <Select defaultValue="light">
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select theme" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="light">Light</SelectItem>
                        <SelectItem value="dark">Dark</SelectItem>
                        <SelectItem value="system">System</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Layout</h3>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="compact-mode">Compact Mode</Label>
                      <p className="text-sm text-muted-foreground">
                        Use a more compact layout to fit more content on screen
                      </p>
                    </div>
                    <Switch id="compact-mode" />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="sidebar-collapsed">Collapsed Sidebar by Default</Label>
                      <p className="text-sm text-muted-foreground">
                        Start with the sidebar collapsed to maximize screen space
                      </p>
                    </div>
                    <Switch id="sidebar-collapsed" />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button>Save Appearance Settings</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Notification Settings</CardTitle>
                <CardDescription>Manage how you receive notifications</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Email Notifications</h3>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="email-matches">Match Updates</Label>
                          <p className="text-sm text-muted-foreground">
                            Receive notifications about match schedules and results
                          </p>
                        </div>
                        <Switch id="email-matches" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="email-tournaments">Tournament Updates</Label>
                          <p className="text-sm text-muted-foreground">
                            Receive notifications about tournament schedules and results
                          </p>
                        </div>
                        <Switch id="email-tournaments" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="email-system">System Updates</Label>
                          <p className="text-sm text-muted-foreground">
                            Receive notifications about system maintenance and updates
                          </p>
                        </div>
                        <Switch id="email-system" defaultChecked />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Push Notifications</h3>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="push-matches">Match Updates</Label>
                          <p className="text-sm text-muted-foreground">
                            Receive push notifications about match schedules and results
                          </p>
                        </div>
                        <Switch id="push-matches" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="push-tournaments">Tournament Updates</Label>
                          <p className="text-sm text-muted-foreground">
                            Receive push notifications about tournament schedules and results
                          </p>
                        </div>
                        <Switch id="push-tournaments" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="push-system">System Updates</Label>
                          <p className="text-sm text-muted-foreground">
                            Receive push notifications about system maintenance and updates
                          </p>
                        </div>
                        <Switch id="push-system" />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button>Save Notification Settings</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
                <CardDescription>Manage your account security</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Change Password</h3>
                    <div className="space-y-2">
                      <div className="space-y-2">
                        <Label htmlFor="current-password">Current Password</Label>
                        <Input id="current-password" type="password" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="new-password">New Password</Label>
                        <Input id="new-password" type="password" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="confirm-password">Confirm New Password</Label>
                        <Input id="confirm-password" type="password" />
                      </div>
                    </div>
                    <Button>Update Password</Button>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Two-Factor Authentication</h3>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="two-factor">Enable Two-Factor Authentication</Label>
                        <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
                      </div>
                      <Switch id="two-factor" />
                    </div>
                    <Button variant="outline">Set Up Two-Factor Authentication</Button>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Session Management</h3>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label>Active Sessions</Label>
                          <p className="text-sm text-muted-foreground">You are currently logged in on 1 device</p>
                        </div>
                        <Button variant="outline">View All Sessions</Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button>Save Security Settings</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="system" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>System Settings</CardTitle>
                <CardDescription>Configure system-wide settings</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Date and Time</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="timezone">Timezone</Label>
                        <Select defaultValue="Asia/Jakarta">
                          <SelectTrigger>
                            <SelectValue placeholder="Select timezone" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Asia/Jakarta">Asia/Jakarta (GMT+7)</SelectItem>
                            <SelectItem value="Asia/Singapore">Asia/Singapore (GMT+8)</SelectItem>
                            <SelectItem value="Asia/Tokyo">Asia/Tokyo (GMT+9)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="date-format">Date Format</Label>
                        <Select defaultValue="yyyy-MM-dd">
                          <SelectTrigger>
                            <SelectValue placeholder="Select date format" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="yyyy-MM-dd">YYYY-MM-DD</SelectItem>
                            <SelectItem value="dd/MM/yyyy">DD/MM/YYYY</SelectItem>
                            <SelectItem value="MM/dd/yyyy">MM/DD/YYYY</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Language</h3>
                    <div className="space-y-2">
                      <Label htmlFor="language">System Language</Label>
                      <Select defaultValue="en">
                        <SelectTrigger>
                          <SelectValue placeholder="Select language" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="en">English</SelectItem>
                          <SelectItem value="id">Bahasa Indonesia</SelectItem>
                          <SelectItem value="ms">Bahasa Melayu</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">System Maintenance</h3>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label>Database Backup</Label>
                          <p className="text-sm text-muted-foreground">Last backup: March 15, 2025, 02:00 AM</p>
                        </div>
                        <Button variant="outline">Run Backup Now</Button>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <Label>System Updates</Label>
                          <p className="text-sm text-muted-foreground">Current version: v1.0.0 (Up to date)</p>
                        </div>
                        <Button variant="outline">Check for Updates</Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button>Save System Settings</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}

