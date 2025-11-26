'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import DataTable from '@/app/components/DataTable';
import { mockCourses, Course } from '@/app/data/mockData';
import { Plus, Pencil, Trash2, Eye } from 'lucide-react';
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

const courseSchema = z.object({
    name: z.string().min(2, 'Course name must be at least 2 characters'),
    duration: z.string().min(1, 'Duration is required'),
    price: z.number().min(0, 'Price must be positive'),
    studentsCount: z.number().min(0, 'Students count must be positive'),
    description: z.string().optional(),
});

type CourseFormData = z.infer<typeof courseSchema>;

export default function CoursesPage() {
    const [courses, setCourses] = useState<Course[]>(mockCourses);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
    const [viewMode, setViewMode] = useState<'view' | 'edit' | 'create'>('create');

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors },
    } = useForm<CourseFormData>({
        resolver: zodResolver(courseSchema),
    });

    const openDialog = (mode: 'view' | 'edit' | 'create', course?: Course) => {
        setViewMode(mode);
        if (course) {
            setSelectedCourse(course);
            setValue('name', course.name);
            setValue('duration', course.duration);
            setValue('price', course.price);
            setValue('studentsCount', course.studentsCount);
            setValue('description', course.description || '');
        } else {
            reset({
                name: '',
                duration: '',
                price: 0,
                studentsCount: 0,
                description: '',
            });
        }
        setIsDialogOpen(true);
    };

    const openDeleteDialog = (course: Course) => {
        setSelectedCourse(course);
        setIsDeleteDialogOpen(true);
    };

    const closeDialog = () => {
        setIsDialogOpen(false);
        setSelectedCourse(null);
        reset();
    };

    const closeDeleteDialog = () => {
        setIsDeleteDialogOpen(false);
        setSelectedCourse(null);
    };

    const onSubmit = (data: CourseFormData) => {
        if (viewMode === 'edit' && selectedCourse) {
            // Update course
            setCourses(courses.map((c) =>
                c.id === selectedCourse.id ? { ...c, ...data } : c
            ));
            console.log('Update course:', data);
            toast.success("Course updated successfully!")
        } else if (viewMode === 'create') {
            // Create course
            const newCourse: Course = {
                id: `C${(courses.length + 1).toString().padStart(3, '0')}`,
                ...data,
            };
            setCourses([...courses, newCourse]);
            console.log('Create course:', newCourse);
            toast.success("Course created successfully!")
        }
        closeDialog();
    };

    const handleDelete = () => {
        if (selectedCourse) {
            setCourses(courses.filter((c) => c.id !== selectedCourse.id));
            console.log('Delete course:', selectedCourse.id);
            toast.success("Course deleted successfully!")
            closeDeleteDialog();
        }
    };

    const columns = [
        { key: 'id', label: 'ID', sortable: true },
        { key: 'name', label: 'Course Name', sortable: true },
        { key: 'duration', label: 'Duration', sortable: true },
        {
            key: 'price',
            label: 'Price',
            sortable: true,
            render: (value: number) => <span className="font-medium">${value.toLocaleString()}</span>,
        },
        {
            key: 'studentsCount',
            label: 'Students',
            sortable: true,
            render: (value: number) => <span className="text-blue-500 font-medium">{value}</span>,
        },
    ];

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">Courses</h1>
                    <p className="text-muted-foreground">Manage educational courses</p>
                </div>
                <Button className="gap-2" onClick={() => openDialog('create')}>
                    <Plus className="h-4 w-4" />
                    Add Course
                </Button>
            </div>

            <DataTable
                columns={columns}
                data={courses}
                actions={(course) => (
                    <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon" onClick={() => openDialog('view', course)}>
                            <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => openDialog('edit', course)}>
                            <Pencil className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => openDeleteDialog(course)}>
                            <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                    </div>
                )}
            />

            {/* Course Dialog */}
            <Dialog open={isDialogOpen} onOpenChange={closeDialog}>
                <DialogContent className="max-w-md">
                    <DialogHeader>
                        <DialogTitle>
                            {viewMode === 'create' ? 'Add New Course' : viewMode === 'edit' ? 'Edit Course' : 'View Course'}
                        </DialogTitle>
                        <DialogDescription>
                            {viewMode === 'create'
                                ? 'Fill in the details to add a new course'
                                : viewMode === 'edit'
                                    ? 'Update course information'
                                    : 'Course details'}
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Course Name</Label>
                            <Input
                                id="name"
                                {...register('name')}
                                disabled={viewMode === 'view'}
                            />
                            {errors.name && <p className="text-xs text-destructive">{errors.name.message}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="duration">Duration</Label>
                            <Input
                                id="duration"
                                {...register('duration')}
                                disabled={viewMode === 'view'}
                                placeholder="e.g., 3 months, 6 weeks"
                            />
                            {errors.duration && <p className="text-xs text-destructive">{errors.duration.message}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="price">Price ($)</Label>
                            <Input
                                id="price"
                                type="number"
                                {...register('price', { valueAsNumber: true })}
                                disabled={viewMode === 'view'}
                            />
                            {errors.price && <p className="text-xs text-destructive">{errors.price.message}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="studentsCount">Students Count</Label>
                            <Input
                                id="studentsCount"
                                type="number"
                                {...register('studentsCount', { valueAsNumber: true })}
                                disabled={viewMode === 'view'}
                            />
                            {errors.studentsCount && <p className="text-xs text-destructive">{errors.studentsCount.message}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="description">Description (Optional)</Label>
                            <textarea
                                id="description"
                                {...register('description')}
                                disabled={viewMode === 'view'}
                                rows={3}
                                className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            />
                        </div>

                        <DialogFooter>
                            <Button type="button" variant="outline" onClick={closeDialog}>
                                Cancel
                            </Button>
                            {viewMode !== 'view' && (
                                <Button type="submit">
                                    {viewMode === 'create' ? 'Add Course' : 'Save Changes'}
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
                        <DialogTitle>Delete Course</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to delete "{selectedCourse?.name}"? This action cannot be undone.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={closeDeleteDialog}>
                            Cancel
                        </Button>
                        <Button type="button" variant="destructive" onClick={handleDelete}>
                            Delete Course
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}