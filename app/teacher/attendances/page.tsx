'use client';

import { Button } from '@/components/ui/button';
import DataTable from '@/app/components/DataTable';
import { mockAttendances } from '@/app/data/mockData';
import { Plus } from 'lucide-react';

export default function TeacherAttendancesPage() {
    const columns = [
        { key: 'date', label: 'Date', sortable: true },
        { key: 'group', label: 'Group', sortable: true },
        {
            key: 'status',
            label: 'Present',
            render: () => {
                const present = Math.floor(Math.random() * 5) + 10;
                return <span className="text-green-500 font-medium">{present}</span>;
            },
        },
        {
            key: 'status',
            label: 'Absent',
            render: () => {
                const absent = Math.floor(Math.random() * 3);
                return <span className="text-red-500 font-medium">{absent}</span>;
            },
        },
    ];

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">My Attendances</h1>
                    <p className="text-muted-foreground">Track attendance records for your classes</p>
                </div>
                <Button className="gap-2">
                    <Plus className="h-4 w-4" />
                    Mark Attendance
                </Button>
            </div>

            <DataTable columns={columns} data={mockAttendances} />
        </div>
    );
}