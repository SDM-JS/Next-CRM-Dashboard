'use client';

import Sidebar from '@/app/components/layout/Sidebar';
import Header from '@/app/components/layout/Header';
import { currentUser } from '@/app/data/mockData';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen bg-background">
            <Sidebar role="admin" />
            <div className="ml-64">
                <Header user={currentUser} />
                <main className="mt-16 p-6">{children}</main>
            </div>
        </div>
    );
}