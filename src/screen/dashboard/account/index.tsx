import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import imageCompression from "browser-image-compression";
import React, { useEffect, useRef, useState } from "react"
import { toast } from "sonner"
import { changePasswordUser, updateUser } from "@/services/auth"
import { Progress } from "@/components/ui/progress"
import useAuthStore from "@/store/feature/authStand"

export default function AccountSettings() {
  const { accessToken, user, zusLogout } = useAuthStore()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const formRef = useRef(null)
  const [uploadProgress, setUploadProgress] = useState(0)


  const [formData, setFormData] = useState({
    fullName: user?.name || "",
    avatar: null as File | null
  });

  const [securityData, setSecurityData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmNewPassword: ''
  })

  const [preview, setPreview] = useState(user?.avatar)

  useEffect(() => {
    if (!user) {
      setFormData({
        fullName: "",
        avatar: null,
      });
      setPreview("")
    } else {
      setFormData({
        fullName: user.name || "",
        avatar: null,
      });
      setPreview(user?.avatar)
    }
  }, [user]);

  useEffect(() => {
    if (!formData.avatar) return;

    const objectUrl = URL.createObjectURL(formData.avatar);
    setPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [formData.avatar]);


  const handleButtonClick = () => {
    if (formRef.current) {
      // @ts-ignore
      formRef.current.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
    } else {
      submitForm();
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submit handler triggered");

    try {
      await submitForm();
    } catch (error) {
      console.error("Error in form submission:", error);
    }
  };

  const handleFormSubmitSecurity = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    if (securityData.oldPassword === '' || securityData.newPassword === '' || securityData.confirmNewPassword === '') {
      toast.error('Gagal mengubah password, silakan isi semua form');
      setIsSubmitting(false)
      return;
    }
    if (securityData.newPassword !== securityData.confirmNewPassword) {
      toast.error('Gagal mengubah password, password baru dan konfirmasi password tidak sama');
      setIsSubmitting(false)
      return;
    }
    const data = {
      oldPassword: securityData.oldPassword,
      newPassword: securityData.newPassword
    }
    const response = await changePasswordUser(data, accessToken)
    if (response.success) {
      toast.success('Berhasil update profil, silahkan login ulang')
      zusLogout()
    } else {
      toast.error(response.error)
    }

    setIsSubmitting(false)

  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      if (!file.type.startsWith("image/")) {
        alert("Format file tidak valid! Silakan unggah gambar.");
        return;
      }

      let compressedFile = file;

      // Jika file lebih dari 5MB, lakukan kompresi
      if (file.size > 5 * 1024 * 1024) {
        try {
          const options = {
            maxSizeMB: 2,
            maxWidthOrHeight: 1024,
            useWebWorker: true,
            onProgress: (progress: number) => {
              setUploadProgress(progress);
            },
          };

          compressedFile = await imageCompression(file, options);
          toast.info("Gambar berhasil dikompres sebelum upload.");
        } catch (err) {
          console.error("Gagal kompres gambar:", err);
          toast.error("Gagal kompres gambar.");
        }
      }

      setFormData((prev) => ({ ...prev, avatar: compressedFile }));

    } else {
      setFormData((prev) => ({ ...prev, avatar: null }));
    }
  };

  const submitForm = async () => {
    setIsSubmitting(true)
    const data = new FormData();
    data.append('fullName', formData.fullName)
    if (formData.avatar) {
      data.append('avatar', formData.avatar || "");
    }

    const response = await updateUser(data, accessToken || "")
    if (response.error) {
      toast.error(response.error)
      setIsSubmitting(false)
      return
    }
    setIsSubmitting(false)
    toast.success('Berhasil update profil, silahkan login ulang')
    zusLogout()
  }

  const isFormValid = () => {
    // Basic validation - must have player type
    const valid = formData.fullName !== ""

    return valid;
  };


  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 container mx-auto p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Sistem Akun</h1>
          {/* <Button>Save Changes</Button> */}
        </div>

        <Tabs defaultValue="account" className="w-full mb-8">
          <TabsList>
            <TabsTrigger value="account">Account</TabsTrigger>
            {/* <TabsTrigger value="appearance">Appearance</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="system">System</TabsTrigger> */}
            <TabsTrigger value="security">Security</TabsTrigger>
          </TabsList>

          <TabsContent value="account" className="mt-6">
            <form ref={formRef} onSubmit={handleFormSubmit} encType="multipart/form-data">

              <Card>
                <CardHeader>
                  <CardTitle>Pengaturan Akun</CardTitle>
                  <CardDescription>Atur dan perbarui informasi akun Anda dengan mudah</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Informasi Pribadi</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Nama Lengkap</Label>
                        <Input id="name" value={formData.fullName} onChange={(e) => setFormData((prev) => ({ ...prev, fullName: e.target.value }))} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Alamat Email</Label>
                        <Input disabled type="email" value={user?.email} />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Foto Profil</h3>
                    <div className="flex items-center gap-4">
                      <div className="h-24 w-24 rounded-full bg-muted flex items-center justify-center text-2xl font-bold">
                        {
                          preview &&
                          (
                            <img src={preview} className="h-24 w-24 rounded-full bg-muted flex items-center justify-center" />
                          )
                        }
                      </div>
                      <div className="space-y-2">
                        <Input
                          className="mt-2 block w-full border border-gray-300 rounded p-2"
                          id="logo"
                          type="file"
                          accept="image/png, image/jpg, image/jpeg"
                          onChange={handleFileChange}
                        />
                        <span className="text-xs">Ukuran file maksimal 10Mb</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    type="button"
                    disabled={!isFormValid()}
                    onClick={handleButtonClick}
                  >{isSubmitting ? 'Loading...' : 'Simpan Pengaturan Akun'}</Button>
                </CardFooter>
                {uploadProgress > 0 && uploadProgress < 100 && (
                  <div className="pt-2">
                    <Progress value={uploadProgress} />
                    <p className="text-xs text-muted-foreground">{Math.round(uploadProgress)}%</p>
                  </div>
                )}
              </Card>
            </form>
          </TabsContent>

          {/* <TabsContent value="appearance" className="mt-6">
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

          */}
          <TabsContent value="security" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
                <CardDescription>Manage your account security</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <form className="space-y-4" onSubmit={handleFormSubmitSecurity}>
                    <h3 className="text-lg font-medium">Change Password</h3>
                    <div className="space-y-2">
                      <div className="space-y-2">
                        <Label htmlFor="current-password">Current Password</Label>
                        <Input id="current-password" onChange={(e) => setSecurityData({ ...securityData, oldPassword: e.target.value })} type="password" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="new-password">New Password</Label>
                        <Input id="new-password" onChange={(e) => setSecurityData({ ...securityData, newPassword: e.target.value })} type="password" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="confirm-password">Confirm New Password</Label>
                        <Input id="confirm-password" onChange={(e) => setSecurityData({ ...securityData, confirmNewPassword: e.target.value })} type="password" />
                      </div>
                    </div>
                    <Button type="submit">Update Password</Button>
                  </form>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

        </Tabs>
      </main>
    </div>
  )
}

