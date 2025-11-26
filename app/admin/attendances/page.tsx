'use client';

import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import DataTable from '@/app/components/DataTable';
import { mockAttendances, Attendance } from '@/app/data/mockData';
import { Plus, Trash2 } from 'lucide-react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import z from 'zod';
import { toast } from 'sonner';

const attendanceSchema = z.object({
    student: z.string().min(1, 'Student name is required'),
    group: z.string().min(1, 'Group is required'),
    date: z.string().min(1, 'Date is required'),
    status: z.enum(['present', 'late', 'absent']),
});

type AttendanceFormData = z.infer<typeof attendanceSchema>;

export default function AttendancesPage() {
    const [attendances, setAttendances] = useState<Attendance[]>(mockAttendances);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [selectedAttendance, setSelectedAttendance] = useState<Attendance | null>(null);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<AttendanceFormData>({
        resolver: zodResolver(attendanceSchema),
    });

    const openCreateDialog = () => {
        reset({
            student: '',
            group: '',
            date: new Date().toISOString().split('T')[0],
            status: 'present',
        });
        setIsDialogOpen(true);
    };

    const openDeleteDialog = (attendance: Attendance) => {
        setSelectedAttendance(attendance);
        setIsDeleteDialogOpen(true);
    };

    const closeDialog = () => {
        setIsDialogOpen(false);
        reset();
    };

    const closeDeleteDialog = () => {
        setIsDeleteDialogOpen(false);
        setSelectedAttendance(null);
    };

    const onSubmit = (data: AttendanceFormData) => {
        const newAttendance: Attendance = {
            id: `A${(attendances.length + 1).toString().padStart(3, '0')}`,
            ...data,
        };
        setAttendances([...attendances, newAttendance]);
        toast.success('Attendance Marked', {
            description: `Attendance for ${data.student} has been recorded successfully.`,
        });
        console.log('Create attendance:', newAttendance);
        closeDialog();
    };

    const handleDelete = () => {
        if (selectedAttendance) {
            setAttendances(attendances.filter((a) => a.id !== selectedAttendance.id));
            toast.error('Attendance Deleted', {
                description: `Attendance record for ${selectedAttendance.student} has been removed.`,
            });
            console.log('Delete attendance:', selectedAttendance.id);
            closeDeleteDialog();
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    };

    const columns = [
        { key: 'student', label: 'Student', sortable: true },
        { key: 'group', label: 'Group', sortable: true },
        {
            key: 'date',
            label: 'Date',
            sortable: true,
            render: (value: string) => formatDate(value)
        },
        {
            key: 'status',
            label: 'Status',
            sortable: true,
            render: (value: string) => (
                <Badge
                    variant={
                        value === 'present' ? 'default' : value === 'late' ? 'outline' : 'destructive'
                    }
                >
                    {value}
                </Badge>
            ),
        },
        {
            key: 'actions',
            label: 'Actions',
            sortable: false,
            render: (_: any, attendance: Attendance) => (
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => openDeleteDialog(attendance)}
                >
                    <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
            ),
        },
    ];

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">Attendances</h1>
                    <p className="text-muted-foreground">Monitor student attendance records</p>
                </div>
                <Button className="gap-2" onClick={openCreateDialog}>
                    <Plus className="h-4 w-4" />
                    Mark Attendance
                </Button>
            </div>

            <DataTable columns={columns} data={attendances} />

            {/* Create Attendance Dialog */}
            <Dialog open={isDialogOpen} onOpenChange={closeDialog}>
                <DialogContent className="max-w-md">
                    <DialogHeader>
                        <DialogTitle>Mark Attendance</DialogTitle>
                        <DialogDescription>
                            Record a new attendance entry for a student.
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="student">Student Name</Label>
                            <Input
                                id="student"
                                {...register('student')}
                                placeholder="Enter student name"
                            />
                            {errors.student && <p className="text-xs text-destructive">{errors.student.message}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="group">Group</Label>
                            <Input
                                id="group"
                                {...register('group')}
                                placeholder="Enter group name"
                            />
                            {errors.group && <p className="text-xs text-destructive">{errors.group.message}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="date">Date</Label>
                            <Input
                                id="date"
                                type="date"
                                {...register('date')}
                            />
                            {errors.date && <p className="text-xs text-destructive">{errors.date.message}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="status">Status</Label>
                            <select
                                id="status"
                                {...register('status')}
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                            >
                                <option value="present">Present</option>
                                <option value="late">Late</option>
                                <option value="absent">Absent</option>
                            </select>
                            {errors.status && <p className="text-xs text-destructive">{errors.status.message}</p>}
                        </div>

                        <DialogFooter>
                            <Button type="button" variant="outline" onClick={closeDialog}>
                                Cancel
                            </Button>
                            <Button type="submit">
                                Mark Attendance
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

            {/* Delete Confirmation Dialog */}
            <Dialog open={isDeleteDialogOpen} onOpenChange={closeDeleteDialog}>
                <DialogContent className="max-w-md">
                    <DialogHeader>
                        <DialogTitle>Delete Attendance Record</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to delete the attendance record for {selectedAttendance?.student}?
                            This action cannot be undone.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={closeDeleteDialog}>
                            Cancel
                        </Button>
                        <Button type="button" variant="destructive" onClick={handleDelete}>
                            Delete Record
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}