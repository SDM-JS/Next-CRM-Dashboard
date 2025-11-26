'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, GraduationCap, CreditCard, CheckSquare, Calendar, TrendingUp } from 'lucide-react';
import { mockStudents, mockTeachers, mockPayments, mockLessons, mockAttendances } from '@/app/data/mockData';
import { Badge } from '@/components/ui/badge';

export default function AdminDashboard() {
    const totalStudents = mockStudents.length;
    const activeStudents = mockStudents.filter((s) => s.status === 'active').length;
    const totalTeachers = mockTeachers.length;
    const paymentsThisMonth = mockPayments
        .filter((p) => p.status === 'completed')
        .reduce((sum, p) => sum + p.amount, 0);
    const presentToday = mockAttendances.filter((a) => a.status === 'present').length;
    const attendanceRate = Math.round((presentToday / mockAttendances.length) * 100);
    const upcomingLessons = mockLessons.filter((l) => l.status === 'scheduled');

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold">Dashboard</h1>
                <p className="text-muted-foreground">Welcome back! Here's what's happening today.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <Card className="transition-smooth hover:shadow-md">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Students</CardTitle>
                        <Users className="h-5 w-5 text-blue-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{totalStudents}</div>
                        <p className="text-xs text-muted-foreground mt-1">
                            <span className="text-green-500 font-medium">{activeStudents} active</span>
                        </p>
                    </CardContent>
                </Card>

                <Card className="transition-smooth hover:shadow-md">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Teachers</CardTitle>
                        <GraduationCap className="h-5 w-5 text-green-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{totalTeachers}</div>
                        <p className="text-xs text-muted-foreground mt-1">Active instructors</p>
                    </CardContent>
                </Card>

                <Card className="transition-smooth hover:shadow-md">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Payments This Month</CardTitle>
                        <CreditCard className="h-5 w-5 text-amber-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">${paymentsThisMonth.toLocaleString()}</div>
                        <p className="text-xs text-muted-foreground mt-1">
                            <TrendingUp className="inline h-3 w-3 text-green-500" /> +12% from last month
                        </p>
                    </CardContent>
                </Card>

                <Card className="transition-smooth hover:shadow-md">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Attendance Rate</CardTitle>
                        <CheckSquare className="h-5 w-5 text-purple-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{attendanceRate}%</div>
                        <p className="text-xs text-muted-foreground mt-1">Today's attendance</p>
                    </CardContent>
                </Card>
            </div>

            {/* Upcoming Lessons */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Calendar className="h-5 w-5" />
                        Upcoming Lessons
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {upcomingLessons.slice(0, 5).map((lesson) => (
                            <div
                                key={lesson.id}
                                className="flex items-center justify-between rounded-lg border p-4 transition-smooth hover:bg-muted/50"
                            >
                                <div className="space-y-1">
                                    <p className="font-medium">{lesson.course}</p>
                                    <p className="text-sm text-muted-foreground">{lesson.teacher}</p>
                                </div>
                                <div className="text-right space-y-1">
                                    <p className="text-sm font-medium">{lesson.dateTime}</p>
                                    <p className="text-sm text-muted-foreground">{lesson.room}</p>
                                </div>
                                <Badge variant="outline">{lesson.status}</Badge>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}