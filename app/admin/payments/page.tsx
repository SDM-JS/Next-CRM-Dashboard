'use client';

import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import DataTable from '@/app/components/DataTable';
import { mockPayments, Payment } from '@/app/data/mockData';
import { Plus, Eye, Pencil, Trash2 } from 'lucide-react';
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
import { Textarea } from '@/components/ui/textarea';

const paymentSchema = z.object({
    student: z.string().min(1, 'Student name is required'),
    amount: z.number().min(1, 'Amount must be greater than 0'),
    date: z.string().min(1, 'Date is required'),
    method: z.enum(['cash', 'card', 'online'], {
        error: "Method is required"
    }),
    status: z.enum(['completed', 'pending', 'failed']),
    description: z.string().optional(),
});

type PaymentFormData = z.infer<typeof paymentSchema>;

export default function PaymentsPage() {
    const [payments, setPayments] = useState<Payment[]>(mockPayments);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);
    const [viewMode, setViewMode] = useState<'view' | 'edit' | 'create'>('create');

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors },
    } = useForm<PaymentFormData>({
        resolver: zodResolver(paymentSchema),
    });

    const openDialog = (mode: 'view' | 'edit' | 'create', payment?: Payment) => {
        setViewMode(mode);
        if (payment) {
            setSelectedPayment(payment);
            setValue('student', payment.student);
            setValue('amount', payment.amount);
            setValue('date', payment.date);
            setValue('method', payment.method);
            setValue('status', payment.status);
            setValue('description', payment.description || '');
        } else {
            reset({
                student: '',
                amount: 0,
                date: new Date().toISOString().split('T')[0],
                method: 'card',
                status: 'pending',
                description: '',
            });
        }
        setIsDialogOpen(true);
    };

    const openDeleteDialog = (payment: Payment) => {
        setSelectedPayment(payment);
        setIsDeleteDialogOpen(true);
    };

    const closeDialog = () => {
        setIsDialogOpen(false);
        setSelectedPayment(null);
        reset();
    };

    const closeDeleteDialog = () => {
        setIsDeleteDialogOpen(false);
        setSelectedPayment(null);
    };

    const onSubmit = (data: PaymentFormData) => {
        if (viewMode === 'edit' && selectedPayment) {
            // Update payment
            setPayments(payments.map((p) =>
                p.id === selectedPayment.id ? { ...p, ...data } : p
            ));
            toast.success('Payment Updated', {
                description: `Payment for ${data.student} has been updated successfully.`,
            });
            console.log('Update payment:', data);
        } else if (viewMode === 'create') {
            // Create payment
            const newPayment: Payment = {
                id: `P${(payments.length + 1).toString().padStart(3, '0')}`,
                ...data,
            };
            setPayments([...payments, newPayment]);
            toast.success('Payment Added', {
                description: `Payment of $${data.amount} for ${data.student} has been recorded successfully.`,
            });
            console.log('Create payment:', newPayment);
        }
        closeDialog();
    };

    const handleDelete = () => {
        if (selectedPayment) {
            setPayments(payments.filter((p) => p.id !== selectedPayment.id));
            toast.error('Payment Deleted', {
                description: `Payment record for ${selectedPayment.student} has been deleted.`,
            });
            console.log('Delete payment:', selectedPayment.id);
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

    const formatMethod = (method: string) => {
        const methodMap: { [key: string]: string } = {
            card: 'Credit Card',
            cash: 'Cash',
            online: 'Online',
        };
        return methodMap[method] || method;
    };

    const columns = [
        { key: 'id', label: 'Payment ID', sortable: true },
        { key: 'student', label: 'Student', sortable: true },
        {
            key: 'amount',
            label: 'Amount',
            sortable: true,
            render: (value: number) => <span className="font-medium">${value.toLocaleString()}</span>,
        },
        {
            key: 'date',
            label: 'Date',
            sortable: true,
            render: (value: string) => formatDate(value)
        },
        {
            key: 'method',
            label: 'Method',
            sortable: true,
            render: (value: string) => (
                <Badge variant="secondary" className="capitalize">
                    {formatMethod(value)}
                </Badge>
            ),
        },
        {
            key: 'status',
            label: 'Status',
            sortable: true,
            render: (value: string) => (
                <Badge
                    variant={
                        value === 'completed' ? 'default' : value === 'pending' ? 'outline' : 'destructive'
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
                    <h1 className="text-3xl font-bold">Payments</h1>
                    <p className="text-muted-foreground">Track all payment transactions</p>
                </div>
                <Button className="gap-2" onClick={() => openDialog('create')}>
                    <Plus className="h-4 w-4" />
                    Add Payment
                </Button>
            </div>

            <DataTable
                columns={columns}
                data={payments}
                actions={(payment) => (
                    <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon" onClick={() => openDialog('view', payment)}>
                            <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => openDialog('edit', payment)}>
                            <Pencil className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => openDeleteDialog(payment)}>
                            <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                    </div>
                )}
            />

            {/* Payment Dialog */}
            <Dialog open={isDialogOpen} onOpenChange={closeDialog}>
                <DialogContent className="max-w-md">
                    <DialogHeader>
                        <DialogTitle>
                            {viewMode === 'create' ? 'Add New Payment' : viewMode === 'edit' ? 'Edit Payment' : 'View Payment'}
                        </DialogTitle>
                        <DialogDescription>
                            {viewMode === 'create'
                                ? 'Record a new payment transaction'
                                : viewMode === 'edit'
                                    ? 'Update payment information'
                                    : 'Payment details'}
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="student">Student Name</Label>
                            <Input
                                id="student"
                                {...register('student')}
                                disabled={viewMode === 'view'}
                                placeholder="Enter student name"
                            />
                            {errors.student && <p className="text-xs text-destructive">{errors.student.message}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="amount">Amount ($)</Label>
                            <Input
                                id="amount"
                                type="number"
                                step="0.01"
                                {...register('amount', { valueAsNumber: true })}
                                disabled={viewMode === 'view'}
                                placeholder="0.00"
                            />
                            {errors.amount && <p className="text-xs text-destructive">{errors.amount.message}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="date">Payment Date</Label>
                            <Input
                                id="date"
                                type="date"
                                {...register('date')}
                                disabled={viewMode === 'view'}
                            />
                            {errors.date && <p className="text-xs text-destructive">{errors.date.message}</p>}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="method">Payment Method</Label>
                                <select
                                    id="method"
                                    {...register('method')}
                                    disabled={viewMode === 'view'}
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    <option value="card">Credit Card</option>
                                    <option value="cash">Cash</option>
                                    <option value="online">Online</option>
                                </select>
                                {errors.method && <p className="text-xs text-destructive">{errors.method.message}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="status">Status</Label>
                                <select
                                    id="status"
                                    {...register('status')}
                                    disabled={viewMode === 'view'}
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    <option value="pending">Pending</option>
                                    <option value="completed">Completed</option>
                                    <option value="failed">Failed</option>
                                </select>
                                {errors.status && <p className="text-xs text-destructive">{errors.status.message}</p>}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="description">Description (Optional)</Label>
                            <Textarea
                                id="description"
                                {...register('description')}
                                disabled={viewMode === 'view'}
                                rows={3}
                                placeholder="Add any additional notes about this payment"
                            />
                        </div>

                        <DialogFooter>
                            <Button type="button" variant="outline" onClick={closeDialog}>
                                Cancel
                            </Button>
                            {viewMode !== 'view' && (
                                <Button type="submit">
                                    {viewMode === 'create' ? 'Add Payment' : 'Save Changes'}
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
                        <DialogTitle>Delete Payment</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to delete the payment record for {selectedPayment?.student}?
                            This action cannot be undone.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={closeDeleteDialog}>
                            Cancel
                        </Button>
                        <Button type="button" variant="destructive" onClick={handleDelete}>
                            Delete Payment
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}