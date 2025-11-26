'use client';

import Sidebar from '@/app/components/layout/Sidebar';
import Header from '@/app/components/layout/Header';
import { teacherUser } from '@/app/data/mockData';

export default function TeacherLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen bg-background">
            <Sidebar role="teacher" />
            <div className="ml-64">
                <Header user={teacherUser} />
                <main className="mt-16 p-6">{children}</main>
            </div>
        </div>
    );
}