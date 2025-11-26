'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Save, Bell, Lock, User } from 'lucide-react';
import { useState } from 'react';

export default function TeacherSettingsPage() {
    const [enable, setEnable] = useState(false)
    const [enables, setEnables] = useState(false)
    return (
        <div className={"space-y-6"}>
            < div >
                <h1 className={"text-3xl font-bold"}>Settings</h1>
                < p className={"text-muted-foreground"}>Manage your profile and preferences</p>
            </div >

            <div className={"grid gap-6"}>
                {/* Profile Settings */}
                <Card>
                    <CardHeader>
                        <CardTitle className={"flex items-center gap-2"}>
                            <User className={"h-5 w-5"} />
                            Profile Settings
                        </CardTitle>
                        <CardDescription>Update your personal information</CardDescription>
                    </CardHeader>
                    <CardContent className={"space-y-4"}>
                        < div className={"grid gap-4 md:grid-cols-2"}>
                            < div className={"space-y-2"}>
                                < Label htmlFor={"name"}>Full Name</Label>
                                < Input id={"name"} defaultValue={"Dr. Robert Chen"} />
                            </div >
                            <div className={"space-y-2"}>
                                < Label htmlFor={"email"}>Email</Label>
                                < Input id={"email"} type={"email"} defaultValue={"robert.chen@crm.com"} />
                            </div >
                            <div className={"space-y-2"}>
                                < Label htmlFor={"phone"}>Phone</Label>
                                < Input id={"phone"} defaultValue={"+1-555-1001"} />
                            </div >
                            <div className={"space-y-2"}>
                                < Label htmlFor={"subject"}>Subject</Label>
                                < Input id={"subject"} defaultValue={"Web Development"} />
                            </div >
                        </div >
                        <Button className={"gap-2"}>
                            < Save className={"h-4 w-4"} />
                            Save Changes
                        </Button >
                    </CardContent >
                </Card >

                {/* Security Settings */}
                < Card >
                    <CardHeader>
                        <CardTitle className={"flex items-center gap-2"}>
                            <Lock className={"h-5 w-5"} />
                            Security Settings
                        </CardTitle>
                        <CardDescription>Manage your password and security preferences</CardDescription>
                    </CardHeader >
                    <CardContent className={"space-y-4"}>
                        < div className={"grid gap-4"}>
                            < div className={"space-y-2"}>
                                < Label htmlFor={"current-password"}>Current Password</Label>
                                < Input id={"current-password"} type={"password"} />
                            </div >
                            <div className={"space-y-2"}>
                                < Label htmlFor={"new-password"}>New Password</Label>
                                < Input id={"new-password"} type={"password"} />
                            </div >
                            <div className={"space-y-2"}>
                                < Label htmlFor={"confirm-password"}>Confirm Password</Label>
                                < Input id={"confirm-password"} type={"password"} />
                            </div >
                        </div >
                        <Button className={"gap-2"}>
                            < Lock className={"h-4 w-4"} />
                            Update Password
                        </Button >
                    </CardContent >
                </Card >

                {/* Notification Settings */}
                < Card >
                    <CardHeader>
                        <CardTitle className={"flex items-center gap-2"}>
                            <Bell className={"h-5 w-5"} />
                            Notification Settings
                        </CardTitle>
                        <CardDescription>Configure how you receive notifications</CardDescription>
                    </CardHeader >
                    <CardContent className={"space-y-4"}>
                        < div className={"flex items-center justify-between"}>
                            < div >
                                <p className={"font-medium"}>Lesson Reminders</p>
                                < p className={"text-sm text-muted-foreground"}>Get notified before your lessons</p>
                            </div >
                            <Button variant={"outline"} size={"sm"} onClick={() => { setEnable(prev => !prev) }}>
                                {enable ? "Disable" : "Enable"}
                            </Button >
                        </div >
                        <Separator />
                        <div className={"flex items-center justify-between"}>
                            < div >
                                <p className={"font-medium"}>Student Updates</p>
                                < p className={"text-sm text-muted-foreground"}>Receive updates about your students</p>
                            </div >
                            <Button variant={"outline"} size={"sm"} onClick={() => { setEnables(prev => !prev) }}>
                                {enables ? "Disable" : "Enable"}
                            </Button >
                        </div >
                    </CardContent >
                </Card >
            </div >
        </div >
    );
}
