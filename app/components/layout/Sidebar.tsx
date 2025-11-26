'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    LayoutDashboard,
    Users,
    GraduationCap,
    BookOpen,
    Calendar,
    CreditCard,
    CheckSquare,
    UsersRound,
    Settings,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarProps {
    role: 'admin' | 'teacher';
}

const adminMenuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', href: '/admin' },
    { icon: Users, label: 'Students', href: '/admin/students' },
    { icon: GraduationCap, label: 'Teachers', href: '/admin/teachers' },
    { icon: BookOpen, label: 'Courses', href: '/admin/courses' },
    { icon: Calendar, label: 'Lessons', href: '/admin/lessons' },
    { icon: CreditCard, label: 'Payments', href: '/admin/payments' },
    { icon: CheckSquare, label: 'Attendances', href: '/admin/attendances' },
    { icon: UsersRound, label: 'Groups', href: '/admin/groups' },
    { icon: Settings, label: 'Settings', href: '/admin/settings' },
];

const teacherMenuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', href: '/teacher' },
    { icon: Users, label: 'My Students', href: '/teacher/students' },
    { icon: CheckSquare, label: 'My Attendances', href: '/teacher/attendances' },
    { icon: Calendar, label: 'My Lessons', href: '/teacher/lessons' },
    { icon: Settings, label: 'Settings', href: '/teacher/settings' },
];

export default function Sidebar({ role }: SidebarProps) {
    const pathname = usePathname();
    const menuItems = role === 'admin' ? adminMenuItems : teacherMenuItems;

    return (
        <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r bg-card shadow-sm">
            <div className="flex h-full flex-col">
                {/* Logo */}
                <div className="flex h-16 items-center border-b px-6">
                    <Link href={role === 'admin' ? '/admin' : '/teacher'} className="flex items-center gap-2">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                            <GraduationCap className="h-5 w-5" />
                        </div>
                        <span className="text-lg font-bold">EduCRM</span>
                    </Link>
                </div>

                {/* Navigation */}
                <nav className="flex-1 space-y-1 overflow-y-auto p-4">
                    {menuItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = pathname === item.href || pathname?.startsWith(item.href + '/');

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-smooth',
                                    isActive
                                        ? 'bg-primary text-primary-foreground shadow-sm'
                                        : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                                )}
                            >
                                <Icon className="h-5 w-5" />
                                {item.label}
                            </Link>
                        );
                    })}
                </nav>

                {/* Footer */}
                <div className="border-t p-4">
                    <div className="text-xs text-muted-foreground">
                        © 2025 EduCRM
                    </div>
                </div>
            </div>
        </aside>
    );
}