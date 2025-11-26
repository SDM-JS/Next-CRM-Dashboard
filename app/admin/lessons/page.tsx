'use client';

import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import DataTable from '@/app/components/DataTable';
import { mockLessons, Lesson } from '@/app/data/mockData';
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

import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

const lessonSchema = z.object({
    course: z.string().min(1, 'Course is required'),
    teacher: z.string().min(1, 'Teacher is required'),
    date: z.string().min(1, 'Date is required'),
    time: z.string().min(1, 'Time is required'),
    room: z.string().min(1, 'Room is required'),
    status: z.enum(['scheduled', 'completed', 'cancelled']),
    description: z.string().optional(),
});

type LessonFormData = z.infer<typeof lessonSchema>;

export default function LessonsPage() {
    const [lessons, setLessons] = useState<Lesson[]>(mockLessons);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
    const [viewMode, setViewMode] = useState<'view' | 'edit' | 'create'>('create');

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors },
    } = useForm<LessonFormData>({
        resolver: zodResolver(lessonSchema),
    });

    const openDialog = (mode: 'view' | 'edit' | 'create', lesson?: Lesson) => {
        setViewMode(mode);
        if (lesson) {
            setSelectedLesson(lesson);
            setValue('course', lesson.course);
            setValue('teacher', lesson.teacher);
            setValue('date', lesson.dateTime.split(' ')[0]);
            setValue('time', lesson.dateTime.split(' ')[1]);
            setValue('room', lesson.room);
            setValue('status', lesson.status);
            setValue('description', lesson.description || '');
        } else {
            reset({
                course: '',
                teacher: '',
                date: '',
                time: '',
                room: '',
                status: 'scheduled',
                description: '',
            });
        }
        setIsDialogOpen(true);
    };

    const openDeleteDialog = (lesson: Lesson) => {
        setSelectedLesson(lesson);
        setIsDeleteDialogOpen(true);
    };

    const closeDialog = () => {
        setIsDialogOpen(false);
        setSelectedLesson(null);
        reset();
    };

    const closeDeleteDialog = () => {
        setIsDeleteDialogOpen(false);
        setSelectedLesson(null);
    };

    const onSubmit = (data: LessonFormData) => {
        const dateTime = `${data.date} ${data.time}`;

        if (viewMode === 'edit' && selectedLesson) {
            // Update lesson
            setLessons(lessons.map((l) =>
                l.id === selectedLesson.id ? { ...l, ...data, dateTime } : l
            ));
            toast.success(`Lesson Updated ${data.course} lesson has been updated successfully.`);
            console.log('Update lesson:', data);
        } else if (viewMode === 'create') {
            // Create lesson
            const newLesson: Lesson = {
                id: `L${(lessons.length + 1).toString().padStart(3, '0')}`,
                ...data,
                dateTime,
            };
            setLessons([...lessons, newLesson]);
            toast.success(`Lesson Scheduled. ${data.course} lesson has been scheduled successfully.`);
            console.log('Create lesson:', newLesson);
        }
        closeDialog();
    };

    const handleDelete = () => {
        if (selectedLesson) {
            setLessons(lessons.filter((l) => l.id !== selectedLesson.id));
            toast.error(`Lesson Deleted ${selectedLesson.course} lesson has been deleted.`);
            console.log('Delete lesson:', selectedLesson.id);
            closeDeleteDialog();
        }
    };

    const formatDateTime = (dateTime: string) => {
        const [date, time] = dateTime.split(' ');
        const formattedDate = new Date(date).toLocaleDateString('en-US', {
            weekday: 'short',
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
        return `${formattedDate} at ${time}`;
    };

    const columns = [
        { key: 'id', label: 'Lesson ID', sortable: true },
        { key: 'course', label: 'Course', sortable: true },
        { key: 'teacher', label: 'Teacher', sortable: true },
        {
            key: 'dateTime',
            label: 'Date & Time',
            sortable: true,
            render: (value: string) => formatDateTime(value)
        },
        { key: 'room', label: 'Room', sortable: false },
        {
            key: 'status',
            label: 'Status',
            sortable: true,
            render: (value: string) => (
                <Badge
                    variant={
                        value === 'scheduled' ? 'outline' : value === 'completed' ? 'default' : 'destructive'
                    }
                >
                    {value}
                </Badge>
            ),
        },
    ];

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">Lessons</h1>
                    <p className="text-muted-foreground">Manage lesson schedules</p>
                </div>
                <Button className="gap-2" onClick={() => openDialog('create')}>
                    <Plus className="h-4 w-4" />
                    Schedule Lesson
                </Button>
            </div>

            <DataTable
                columns={columns}
                data={lessons}
                actions={(lesson) => (
                    <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon" onClick={() => openDialog('view', lesson)}>
                            <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => openDialog('edit', lesson)}>
                            <Pencil className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => openDeleteDialog(lesson)}>
                            <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                    </div>
                )}
            />

            {/* Lesson Dialog */}
            <Dialog open={isDialogOpen} onOpenChange={closeDialog}>
                <DialogContent className="max-w-md">
                    <DialogHeader>
                        <DialogTitle>
                            {viewMode === 'create' ? 'Schedule New Lesson' : viewMode === 'edit' ? 'Edit Lesson' : 'View Lesson'}
                        </DialogTitle>
                        <DialogDescription>
                            {viewMode === 'create'
                                ? 'Fill in the details to schedule a new lesson'
                                : viewMode === 'edit'
                                    ? 'Update lesson information'
                                    : 'Lesson details'}
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="course">Course</Label>
                            <Input
                                id="course"
                                {...register('course')}
                                disabled={viewMode === 'view'}
                                placeholder="Enter course name"
                            />
                            {errors.course && <p className="text-xs text-destructive">{errors.course.message}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="teacher">Teacher</Label>
                            <Input
                                id="teacher"
                                {...register('teacher')}
                                disabled={viewMode === 'view'}
                                placeholder="Enter teacher name"
                            />
                            {errors.teacher && <p className="text-xs text-destructive">{errors.teacher.message}</p>}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="date">Date</Label>
                                <Input
                                    id="date"
                                    type="date"
                                    {...register('date')}
                                    disabled={viewMode === 'view'}
                                />
                                {errors.date && <p className="text-xs text-destructive">{errors.date.message}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="time">Time</Label>
                                <Input
                                    id="time"
                                    type="time"
                                    {...register('time')}
                                    disabled={viewMode === 'view'}
                                />
                                {errors.time && <p className="text-xs text-destructive">{errors.time.message}</p>}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="room">Room</Label>
                            <Input
                                id="room"
                                {...register('room')}
                                disabled={viewMode === 'view'}
                                placeholder="Enter room number"
                            />
                            {errors.room && <p className="text-xs text-destructive">{errors.room.message}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="status">Status</Label>
                            <select
                                id="status"
                                {...register('status')}
                                disabled={viewMode === 'view'}
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                <option value="scheduled">Scheduled</option>
                                <option value="completed">Completed</option>
                                <option value="cancelled">Cancelled</option>
                            </select>
                            {errors.status && <p className="text-xs text-destructive">{errors.status.message}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="description">Description (Optional)</Label>
                            <Textarea
                                id="description"
                                {...register('description')}
                                disabled={viewMode === 'view'}
                                rows={3}
                                placeholder="Add any additional notes about the lesson"
                            />
                        </div>

                        <DialogFooter>
                            <Button type="button" variant="outline" onClick={closeDialog}>
                                Cancel
                            </Button>
                            {viewMode !== 'view' && (
                                <Button type="submit">
                                    {viewMode === 'create' ? 'Schedule Lesson' : 'Save Changes'}
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
                        <DialogTitle>Delete Lesson</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to delete the "{selectedLesson?.course}" lesson scheduled for {selectedLesson && formatDateTime(selectedLesson.dateTime)}? This action cannot be undone.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={closeDeleteDialog}>
                            Cancel
                        </Button>
                        <Button type="button" variant="destructive" onClick={handleDelete}>
                            Delete Lesson
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}