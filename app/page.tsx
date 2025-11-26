'use client';

import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { GraduationCap, User, Shield } from 'lucide-react';

export default function Home() {
    const router = useRouter();

    return (
        <div className="flex min-h-screen items-center justify-center bg-linear-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-4">
            <div className="w-full max-w-4xl">
                <div className="mb-8 text-center">
                    <div className="mb-4 flex justify-center">
                        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg">
                            <GraduationCap className="h-8 w-8" />
                        </div>
                    </div>
                    <h1 className="mb-2 text-4xl font-bold">Welcome to EduCRM</h1>
                    <p className="text-lg text-muted-foreground">Educational Center Management System</p>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                    {/* Admin Card */}
                    <Card className="transition-smooth hover:shadow-xl cursor-pointer" onClick={() => router.push('/admin')}>
                        <CardHeader>
                            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-500 text-white">
                                <Shield className="h-6 w-6" />
                            </div>
                            <CardTitle className="text-2xl">Admin Dashboard</CardTitle>
                            <CardDescription>
                                Full access to manage students, teachers, courses, payments, and more
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Button className="w-full" size="lg" onClick={() => router.push('/admin')}>
                                Enter as Admin
                            </Button>
                        </CardContent>
                    </Card>

                    {/* Teacher Card */}
                    <Card className="transition-smooth hover:shadow-xl cursor-pointer" onClick={() => router.push('/teacher')}>
                        <CardHeader>
                            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-green-500 text-white">
                                <User className="h-6 w-6" />
                            </div>
                            <CardTitle className="text-2xl">Teacher Dashboard</CardTitle>
                            <CardDescription>
                                Access your lessons, students, attendance records, and schedules
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Button className="w-full" size="lg" variant="secondary" onClick={() => router.push('/teacher')}>
                                Enter as Teacher
                            </Button>
                        </CardContent>
                    </Card>
                </div>

                <div className="mt-8 text-center text-sm text-muted-foreground">
                    <p>© 2025 EduCRM. All rights reserved.</p>
                </div>
            </div>
        </div>
    );
}