'use client'

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
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
import { mockStudents, type Student } from '@/app/data/mockData';
import { Plus, Pencil, Trash2, Eye } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import DataTable from '@/app/components/DataTable';
import { toast } from 'sonner';

const studentSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    phone: z.string().min(10, 'Phone number must be valid'),
    course: z.string().min(1, 'Course is required'),
    group: z.string().min(1, 'Group is required'),
    balance: z.number().min(0, 'Balance must be positive'),
    status: z.enum(['active', 'inactive', 'pending']),
});

type StudentFormData = z.infer<typeof studentSchema>;

export default function StudentsPage() {
    const [students, setStudents] = useState<Student[]>(mockStudents);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
    const [viewMode, setViewMode] = useState<'view' | 'edit' | 'create'>('create');
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

    // Add this function to Students page
    const openDeleteDialog = (student: Student) => {
        setSelectedStudent(student);
        setIsDeleteDialogOpen(true);
    };

    const closeDeleteDialog = () => {
        setIsDeleteDialogOpen(false);
        setSelectedStudent(null);
    };


    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors },
    } = useForm<StudentFormData>({
        resolver: zodResolver(studentSchema),
    });

    const openDialog = (mode: 'view' | 'edit' | 'create', student?: Student) => {
        setViewMode(mode);
        if (student) {
            setSelectedStudent(student);
            setValue('name', student.name);
            setValue('phone', student.phone);
            setValue('course', student.course);
            setValue('group', student.group);
            setValue('balance', student.balance);
            setValue('status', student.status);
        } else {
            reset();
        }
        setIsDialogOpen(true);
    };

    const closeDialog = () => {
        setIsDialogOpen(false);
        setSelectedStudent(null);
        reset();
    };

    const onSubmit = (data: StudentFormData) => {
        if (viewMode === 'edit' && selectedStudent) {
            // Update student logic
            setStudents(students.map((s) => (s.id === selectedStudent.id ? { ...s, ...data } : s)));
            console.log('Update student:', data);
        } else if (viewMode === 'create') {
            // Create student logic
            const newStudent: Student = {
                id: `S${(students.length + 1).toString().padStart(3, '0')}`,
                ...data,
            };
            setStudents([...students, newStudent]);
            console.log('Create student:', newStudent);
        }
        closeDialog();
    };

    const handleDelete = () => {
        if (selectedStudent) {
            setStudents(students.filter((s) => s.id !== selectedStudent.id));
            console.log('Delete student:', selectedStudent.id);
            toast.success("Student deleted successfully!")
            closeDeleteDialog();
        }
    };

    const columns = [
        { key: 'id', label: 'ID', sortable: true },
        { key: 'name', label: 'Name', sortable: true },
        { key: 'phone', label: 'Phone', sortable: false },
        { key: 'course', label: 'Course', sortable: true },
        { key: 'group', label: 'Group', sortable: true },
        {
            key: 'balance',
            label: 'Balance',
            sortable: true,
            render: (value: number) => (
                <span className={value < 0 ? 'text-red-500 font-medium' : value > 0 ? 'text-green-500 font-medium' : ''}>
                    ${value}
                </span>
            ),
        },
        {
            key: 'status',
            label: 'Status',
            sortable: true,
            render: (value: string) => (
                <Badge variant={value === 'active' ? 'default' : value === 'inactive' ? 'destructive' : 'outline'}>
                    {value}
                </Badge>
            ),
        },
    ];

    return (
        <div className={"space-y-6"}>
            < div className={"flex items-center justify-between"}>
                < div >
                    <h1 className={"text-3xl font-bold"}>Students</h1>
                    < p className={"text-muted-foreground"}>Manage all students in the system</p>
                </div >
                <Button onClick={() => openDialog('create')} className={"gap-2"}>
                    < Plus className={"h-4 w-4"} />
                    Add Student
                </Button >
            </div >

            <DataTable
                columns={columns}
                data={students}
                actions={(student) => (
                    <div className={"flex items-center gap-2"}>
                        < Button variant={"ghost"} size={"icon"} onClick={() => openDialog('view', student)}>
                            < Eye className={"h-4 w-4"} />
                        </Button >
                        <Button variant={"ghost"} size={"icon"} onClick={() => openDialog('edit', student)}>
                            < Pencil className={"h-4 w-4"} />
                        </Button >
                        <Button variant="ghost" size="icon" onClick={() => openDeleteDialog(student)}>
                            <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                    </div >
                )
                }
            />

            {/* Student Dialog */}
            <Dialog open={isDialogOpen} onOpenChange={closeDialog}>
                <DialogContent className={"max-w-md"}>
                    <DialogHeader>
                        <DialogTitle>
                            {viewMode === 'create' ? 'Add New Student' : viewMode === 'edit' ? 'Edit Student' : 'View Student'}
                        </DialogTitle>
                        <DialogDescription>
                            {viewMode === 'create'
                                ? 'Fill in the details to add a new student'
                                : viewMode === 'edit'
                                    ? 'Update student information'
                                    : 'Student details'}
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleSubmit(onSubmit)} className={"space-y-4"}>
                        <div className={"space-y-2"}>
                            <Label htmlFor={"name"}>Name</Label>
                            <Input id={"name"} {...register('name')} disabled={viewMode === 'view'} />
                            {
                                errors.name && <p className={"text-xs text-destructive"}>{errors.name.message}</p>}
                        </div >
                        <div className={"space-y-2"}>
                            < Label htmlFor={"phone"}>Phone</Label>
                            < Input id={"phone"} {...register('phone')} disabled={viewMode === 'view'} />
                            {
                                errors.phone && <p className={"text-xs text-destructive"}>{errors.phone.message}</p>}
                        </div >
                        <div className={"space-y-2"}>
                            < Label htmlFor={"course"}>Course</Label>
                            < Input id={"course"} {...register('course')} disabled={viewMode === 'view'} />
                            {
                                errors.course && <p className={"text-xs text-destructive"}>{errors.course.message}</p>}
                        </div >
                        <div className={"space-y-2"}>
                            < Label htmlFor={"group"}>Group</Label>
                            < Input id={"group"} {...register('group')} disabled={viewMode === 'view'} />
                            {
                                errors.group && <p className={"text-xs text-destructive"}>{errors.group.message}</p>}
                        </div >
                        <div className={"space-y-2"}>
                            < Label htmlFor={"balance"}>Balance</Label>
                            < Input
                                id={"balance"}
                                type={"number"}
                                {...register('balance', { valueAsNumber: true })}
                                disabled={viewMode === 'view'
                                }
                            />
                            {
                                errors.balance && <p className={"text-xs text-destructive"}>{errors.balance.message}</p>}
                        </div >
                        <div className={"space-y-2"}>
                            < Label htmlFor={"status"}>Status</Label>
                            < select
                                id={"status"}
                                {...register('status')}
                                disabled={viewMode === 'view'
                                }
                                className={"flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"}>
                                <option value={"active"}>Active</option>
                                < option value={"inactive"}>Inactive</option>
                                < option value={"pending"}>Pending</option>
                            </select >
                            {
                                errors.status && <p className={"text-xs text-destructive"}>{errors.status.message}</p>}
                        </div>
                        <DialogFooter>
                            <Button type={"button"} variant={"outline"} onClick={closeDialog}>
                                Cancel
                            </Button>
                            {
                                viewMode !== 'view' && <Button type={"submit"}>{viewMode === 'create' ? 'Add' : 'Save'}</Button>}
                        </DialogFooter >
                    </form >
                </DialogContent >
            </Dialog >

            {/* Delete student dialog */}

            <Dialog open={isDeleteDialogOpen} onOpenChange={closeDeleteDialog}>
                <DialogContent className="max-w-md">
                    <DialogHeader>
                        <DialogTitle>Delete Student</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to delete {selectedStudent?.name}? This action cannot be undone.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={closeDeleteDialog}>
                            Cancel
                        </Button>
                        <Button type="button" variant="destructive" onClick={handleDelete}>
                            Delete
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div >
    );
}
