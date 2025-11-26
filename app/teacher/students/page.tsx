'use client';

import DataTable from '@/app/components/DataTable';
import { mockStudents, Student } from '@/app/data/mockData';
import { Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';

export default function TeacherStudentsPage() {
    // Filter students for Web Development course
    const myStudents = mockStudents.filter((s) => s.course === 'Web Development');
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

    const openDialog = (student: Student) => {
        setSelectedStudent(student);
        setIsDialogOpen(true);
    };

    const closeDialog = () => {
        setIsDialogOpen(false);
        setSelectedStudent(null);
    };

    const columns = [
        { key: 'id', label: 'ID', sortable: true },
        { key: 'name', label: 'Name', sortable: true },
        { key: 'group', label: 'Group', sortable: true },
        { key: 'lastAttendance', label: 'Last Attendance', sortable: true },
        {
            key: 'progress',
            label: 'Progress',
            sortable: true,
            render: (value: number) => (
                <div className="flex items-center gap-2">
                    <div className="h-2 w-20 rounded-full bg-muted overflow-hidden">
                        <div
                            className="h-full bg-primary transition-all"
                            style={{ width: `${value}%` }}
                        />
                    </div>
                    <span className="text-sm font-medium">{value}%</span>
                </div>
            ),
        },
    ];

    const getProgressColor = (progress: number) => {
        if (progress >= 80) return 'text-green-600';
        if (progress >= 60) return 'text-blue-600';
        if (progress >= 40) return 'text-yellow-600';
        return 'text-red-600';
    };

    const getProgressStatus = (progress: number) => {
        if (progress >= 80) return 'Excellent';
        if (progress >= 60) return 'Good';
        if (progress >= 40) return 'Average';
        return 'Needs Improvement';
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold">My Students</h1>
                <p className="text-muted-foreground">View and track your students' progress</p>
            </div>

            <DataTable
                columns={columns}
                data={myStudents}
                actions={(student) => (
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => openDialog(student)}
                    >
                        <Eye className="h-4 w-4" />
                    </Button>
                )}
            />

            {/* Student Details Dialog */}
            <Dialog open={isDialogOpen} onOpenChange={closeDialog}>
                <DialogContent className="max-w-md">
                    <DialogHeader>
                        <DialogTitle>Student Details</DialogTitle>
                        <DialogDescription>
                            Complete information about {selectedStudent?.name}
                        </DialogDescription>
                    </DialogHeader>

                    {selectedStudent && (
                        <div className="space-y-6">
                            {/* Basic Information */}
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold">Basic Information</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-sm font-medium text-muted-foreground">Student ID</p>
                                        <p className="text-base">{selectedStudent.id}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-muted-foreground">Name</p>
                                        <p className="text-base font-medium">{selectedStudent.name}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-muted-foreground">Phone</p>
                                        <p className="text-base">{selectedStudent.phone}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-muted-foreground">Group</p>
                                        <p className="text-base">{selectedStudent.group}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Course Information */}
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold">Course Information</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-sm font-medium text-muted-foreground">Course</p>
                                        <p className="text-base">{selectedStudent.course}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-muted-foreground">Status</p>
                                        <Badge
                                            variant={
                                                selectedStudent.status === 'active' ? 'default' :
                                                    selectedStudent.status === 'inactive' ? 'destructive' : 'outline'
                                            }
                                        >
                                            {selectedStudent.status}
                                        </Badge>
                                    </div>
                                </div>
                            </div>

                            {/* Progress Information */}
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold">Progress Information</h3>
                                <div className="space-y-3">
                                    <div>
                                        <p className="text-sm font-medium text-muted-foreground">Progress</p>
                                        <div className="flex items-center gap-3 mt-1">
                                            <div className="h-3 w-32 rounded-full bg-muted overflow-hidden">
                                                <div
                                                    className="h-full bg-primary transition-all"
                                                    style={{ width: `${selectedStudent.progress}%` }}
                                                />
                                            </div>
                                            <span className={`text-base font-medium ${getProgressColor(selectedStudent.progress!)}`}>
                                                {selectedStudent.progress}%
                                            </span>
                                        </div>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-muted-foreground">Progress Status</p>
                                        <p className="text-base">{getProgressStatus(selectedStudent.progress!)}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-muted-foreground">Last Attendance</p>
                                        <p className="text-base">{selectedStudent.lastAttendance}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Financial Information */}
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold">Financial Information</h3>
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">Balance</p>
                                    <p className={`text-base font-medium ${selectedStudent.balance < 0 ? 'text-red-500' :
                                        selectedStudent.balance > 0 ? 'text-green-500' : ''
                                        }`}>
                                        ${selectedStudent.balance}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
}