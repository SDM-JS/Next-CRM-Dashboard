'use client';

import DataTable from '@/app/components/DataTable';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { mockTeachers, Teacher } from '@/app/data/mockData';
import { Plus, Pencil, Trash2, Eye, Star } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import z from 'zod';

const teacherSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    phone: z.string().min(10, 'Phone number must be valid'),
    salaryType: z.enum(["monthly", "hourly"], { "error": "Salary type is required" }),
    subject: z.string().min(1, "Subject is required")
});

type TeacherFormData = z.infer<typeof teacherSchema>

export default function TeachersPage() {
    const [teachers, setTeachers] = useState<Teacher[]>(mockTeachers);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);
    const [viewMode, setViewMode] = useState<'view' | 'edit' | 'create'>('create');

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors },
    } = useForm<TeacherFormData>({
        resolver: zodResolver(teacherSchema),
    });

    const openDialog = (mode: 'view' | 'edit' | 'create', teacher?: Teacher) => {
        setViewMode(mode);
        if (teacher) {
            setSelectedTeacher(teacher);
            setValue('name', teacher.name);
            setValue('phone', teacher.phone);
            setValue('salaryType', teacher.salaryType);
            setValue('subject', teacher.subject);
        } else {
            reset();
        }
        setIsDialogOpen(true);
    };

    const openDeleteDialog = (teacher: Teacher) => {
        setSelectedTeacher(teacher);
        setIsDeleteDialogOpen(true);
    };

    const closeDialog = () => {
        setIsDialogOpen(false);
        setSelectedTeacher(null);
        reset();
    };

    const closeDeleteDialog = () => {
        setIsDeleteDialogOpen(false);
        setSelectedTeacher(null);
    };

    const onSubmit = (data: TeacherFormData) => {
        if (viewMode === 'edit' && selectedTeacher) {
            setTeachers(teachers.map((t) => (t.id === selectedTeacher.id ? { ...t, ...data } : t)));
            console.log('Update teacher:', data);
        } else if (viewMode === 'create') {
            const newTeacher: Teacher = {
                id: `T${(teachers.length + 1).toString().padStart(3, '0')}`,
                ...data,
                rating: 0, // Add default rating
            };
            setTeachers([...teachers, newTeacher]);
            console.log('Create teacher:', newTeacher);
        }
        closeDialog();
    };

    const handleDelete = () => {
        if (selectedTeacher) {
            setTeachers(teachers.filter((t) => t.id !== selectedTeacher.id));
            console.log('Delete teacher:', selectedTeacher.id);
            closeDeleteDialog();
        }
    };

    const columns = [
        { key: 'id', label: 'ID', sortable: true },
        { key: 'name', label: 'Name', sortable: true },
        { key: 'subject', label: 'Subject', sortable: true },
        { key: 'phone', label: 'Phone' },
        {
            key: 'salaryType',
            label: 'Salary Type',
            sortable: true,
            render: (value: string) => (
                <Badge variant={value === 'monthly' ? 'outline' : 'secondary'}>{value}</Badge>
            ),
        },
        {
            key: 'rating',
            label: 'Rating',
            sortable: true,
            render: (value: number) => (
                <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                    <span className="font-medium">{value}</span>
                </div>
            ),
        },
    ];

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">Teachers</h1>
                    <p className="text-muted-foreground">Manage teaching staff</p>
                </div>
                <Button className="gap-2" onClick={() => openDialog('create')}>
                    <Plus className="h-4 w-4" />
                    Add Teacher
                </Button>
            </div>

            <DataTable
                columns={columns}
                data={teachers}
                actions={(teacher) => (
                    <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon" onClick={() => openDialog("view", teacher)}>
                            <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => openDialog("edit", teacher)}>
                            <Pencil className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => openDeleteDialog(teacher)}>
                            <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                    </div>
                )}
            />

            {/* Teacher Dialog */}
            <Dialog open={isDialogOpen} onOpenChange={closeDialog}>
                <DialogContent className="max-w-md">
                    <DialogHeader>
                        <DialogTitle>
                            {viewMode === 'create' ? 'Add New Teacher' : viewMode === 'edit' ? 'Edit Teacher' : 'View Teacher'}
                        </DialogTitle>
                        <DialogDescription>
                            {viewMode === 'create'
                                ? 'Fill in the details to add a new teacher'
                                : viewMode === 'edit'
                                    ? 'Update teacher information'
                                    : 'Teacher details'}
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Name</Label>
                            <Input id="name" {...register('name')} disabled={viewMode === 'view'} />
                            {errors.name && <p className="text-xs text-destructive">{errors.name.message}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="subject">Subject</Label>
                            <Input id="subject" {...register('subject')} disabled={viewMode === 'view'} />
                            {errors.subject && <p className="text-xs text-destructive">{errors.subject.message}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="phone">Phone</Label>
                            <Input id="phone" {...register('phone')} disabled={viewMode === 'view'} />
                            {errors.phone && <p className="text-xs text-destructive">{errors.phone.message}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="salaryType">Salary Type</Label>
                            <select
                                id="salaryType"
                                {...register('salaryType')}
                                disabled={viewMode === 'view'}
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                            >
                                <option value="monthly">Monthly</option>
                                <option value="hourly">Hourly</option>
                            </select>
                            {errors.salaryType && <p className="text-xs text-destructive">{errors.salaryType.message}</p>}
                        </div>
                        <DialogFooter>
                            <Button type="button" variant="outline" onClick={closeDialog}>
                                Cancel
                            </Button>
                            {viewMode !== 'view' && (
                                <Button type="submit">
                                    {viewMode === 'create' ? 'Add' : 'Save'}
                                </Button>
                            )}
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

            {/* Delete Confirmation Dialog */}
            <Dialog open={isDeleteDialogOpen} onOpenChange={closeDeleteDialog}>
                <DialogContent className="max-w-md">
                    <DialogHeader>
                        <DialogTitle>Delete Teacher</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to delete {selectedTeacher?.name}? This action cannot be undone.
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
        </div>
    );
}