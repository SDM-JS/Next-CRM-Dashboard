'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import DataTable from '@/app/components/DataTable';
import { mockGroups, Group } from '@/app/data/mockData';
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

const groupSchema = z.object({
    name: z.string().min(1, 'Group name is required'),
    course: z.string().min(1, 'Course is required'),
    teacher: z.string().min(1, 'Teacher is required'),
    studentsCount: z.number().min(0, 'Students count must be positive'),
    schedule: z.string().min(1, 'Schedule is required'),
});

type GroupFormData = z.infer<typeof groupSchema>;

export default function GroupsPage() {
    const [groups, setGroups] = useState<Group[]>(mockGroups);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);
    const [viewMode, setViewMode] = useState<'view' | 'edit' | 'create'>('create');

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors },
    } = useForm<GroupFormData>({
        resolver: zodResolver(groupSchema),
    });

    const openDialog = (mode: 'view' | 'edit' | 'create', group?: Group) => {
        setViewMode(mode);
        if (group) {
            setSelectedGroup(group);
            setValue('name', group.name);
            setValue('course', group.course);
            setValue('teacher', group.teacher);
            setValue('studentsCount', group.studentsCount);
            setValue('schedule', group.schedule);
        } else {
            reset({
                name: '',
                course: '',
                teacher: '',
                studentsCount: 0,
                schedule: '',
            });
        }
        setIsDialogOpen(true);
    };

    const openDeleteDialog = (group: Group) => {
        setSelectedGroup(group);
        setIsDeleteDialogOpen(true);
    };

    const closeDialog = () => {
        setIsDialogOpen(false);
        setSelectedGroup(null);
        reset();
    };

    const closeDeleteDialog = () => {
        setIsDeleteDialogOpen(false);
        setSelectedGroup(null);
    };

    const onSubmit = (data: GroupFormData) => {
        if (viewMode === 'edit' && selectedGroup) {
            // Update group
            setGroups(groups.map((g) =>
                g.id === selectedGroup.id ? { ...g, ...data } : g
            ));
            toast.success('Group Updated', {
                description: `${data.name} group has been updated successfully.`,
            });
            console.log('Update group:', data);
        } else if (viewMode === 'create') {
            // Create group
            const newGroup: Group = {
                id: `G${(groups.length + 1).toString().padStart(3, '0')}`,
                ...data,
            };
            setGroups([...groups, newGroup]);
            toast.success('Group Created', {
                description: `${data.name} group has been created successfully.`,
            });
            console.log('Create group:', newGroup);
        }
        closeDialog();
    };

    const handleDelete = () => {
        if (selectedGroup) {
            setGroups(groups.filter((g) => g.id !== selectedGroup.id));
            toast.error('Group Deleted', {
                description: `${selectedGroup.name} group has been deleted.`,
            });
            console.log('Delete group:', selectedGroup.id);
            closeDeleteDialog();
        }
    };

    const columns = [
        { key: 'id', label: 'ID', sortable: true },
        { key: 'name', label: 'Group Name', sortable: true },
        { key: 'course', label: 'Course', sortable: true },
        { key: 'teacher', label: 'Teacher', sortable: true },
        {
            key: 'studentsCount',
            label: 'Students',
            sortable: true,
            render: (value: number) => <span className="text-blue-500 font-medium">{value}</span>,
        },
        { key: 'schedule', label: 'Schedule', sortable: false },
    ];

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">Groups</h1>
                    <p className="text-muted-foreground">Manage student groups</p>
                </div>
                <Button className="gap-2" onClick={() => openDialog('create')}>
                    <Plus className="h-4 w-4" />
                    Create Group
                </Button>
            </div>

            <DataTable
                columns={columns}
                data={groups}
                actions={(group) => (
                    <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon" onClick={() => openDialog('view', group)}>
                            <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => openDialog('edit', group)}>
                            <Pencil className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => openDeleteDialog(group)}>
                            <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                    </div>
                )}
            />

            {/* Group Dialog */}
            <Dialog open={isDialogOpen} onOpenChange={closeDialog}>
                <DialogContent className="max-w-md">
                    <DialogHeader>
                        <DialogTitle>
                            {viewMode === 'create' ? 'Create New Group' : viewMode === 'edit' ? 'Edit Group' : 'View Group'}
                        </DialogTitle>
                        <DialogDescription>
                            {viewMode === 'create'
                                ? 'Fill in the details to create a new group'
                                : viewMode === 'edit'
                                    ? 'Update group information'
                                    : 'Group details'}
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Group Name</Label>
                            <Input
                                id="name"
                                {...register('name')}
                                disabled={viewMode === 'view'}
                                placeholder="Enter group name"
                            />
                            {errors.name && <p className="text-xs text-destructive">{errors.name.message}</p>}
                        </div>

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

                        <div className="space-y-2">
                            <Label htmlFor="studentsCount">Students Count</Label>
                            <Input
                                id="studentsCount"
                                type="number"
                                {...register('studentsCount', { valueAsNumber: true })}
                                disabled={viewMode === 'view'}
                                min="0"
                            />
                            {errors.studentsCount && <p className="text-xs text-destructive">{errors.studentsCount.message}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="schedule">Schedule</Label>
                            <Input
                                id="schedule"
                                {...register('schedule')}
                                disabled={viewMode === 'view'}
                                placeholder="e.g., Mon, Wed, Fri 10:00 AM"
                            />
                            {errors.schedule && <p className="text-xs text-destructive">{errors.schedule.message}</p>}
                        </div>

                        <DialogFooter>
                            <Button type="button" variant="outline" onClick={closeDialog}>
                                Cancel
                            </Button>
                            {viewMode !== 'view' && (
                                <Button type="submit">
                                    {viewMode === 'create' ? 'Create Group' : 'Save Changes'}
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
                        <DialogTitle>Delete Group</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to delete the "{selectedGroup?.name}" group? This action cannot be undone.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={closeDeleteDialog}>
                            Cancel
                        </Button>
                        <Button type="button" variant="destructive" onClick={handleDelete}>
                            Delete Group
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}