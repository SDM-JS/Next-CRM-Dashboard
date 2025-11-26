export interface Student {
    id: string;
    name: string;
    phone: string;
    course: string;
    group: string;
    balance: number;
    status: 'active' | 'inactive' | 'pending';
    lastAttendance?: string;
    progress?: number;
}

export interface Teacher {
    id: string;
    name: string;
    subject: string;
    phone: string;
    salaryType: 'hourly' | 'monthly';
    rating?: number;
}

export interface Course {
    id: string;
    name: string;
    duration: string;
    price: number;
    studentsCount: number;
    description?: string;
}

export interface Lesson {
    id: string;
    course: string;
    teacher: string;
    dateTime: string;
    room: string;
    topic?: string;
    description?: string;
    status: 'scheduled' | 'completed' | 'cancelled';
}

export interface Payment {
    id: string;
    student: string;
    amount: number;
    date: string;
    method: 'cash' | 'card' | 'online';
    status: 'completed' | 'pending' | 'failed';
    description?: string
}

export interface Attendance {
    id: string;
    student: string;
    group: string;
    date: string;
    status: 'present' | 'absent' | 'late';
}

export interface Group {
    id: string;
    name: string;
    course: string;
    teacher: string;
    studentsCount: number;
    schedule: string;
}

export const mockStudents: Student[] = [
    { id: 'S001', name: 'John Smith', phone: '+1-555-0101', course: 'Web Development', group: 'Group A', balance: 500, status: 'active', lastAttendance: '2025-07-15', progress: 85 },
    { id: 'S001', name: 'John Smith', phone: '+1-555-0101', course: 'Web Development', group: 'Group A', balance: 500, status: 'active', lastAttendance: '2025-07-15', progress: 85 },
    { id: 'S001', name: 'John Smith', phone: '+1-555-0101', course: 'Web Development', group: 'Group A', balance: 500, status: 'active', lastAttendance: '2025-07-15', progress: 85 },
    { id: 'S001', name: 'John Smith', phone: '+1-555-0101', course: 'Web Development', group: 'Group A', balance: 500, status: 'active', lastAttendance: '2025-07-15', progress: 85 },
    { id: 'S001', name: 'John Smith', phone: '+1-555-0101', course: 'Web Development', group: 'Group A', balance: 500, status: 'active', lastAttendance: '2025-07-15', progress: 85 },
    { id: 'S001', name: 'John Smith', phone: '+1-555-0101', course: 'Web Development', group: 'Group A', balance: 500, status: 'active', lastAttendance: '2025-07-15', progress: 85 },
    { id: 'S001', name: 'John Smith', phone: '+1-555-0101', course: 'Web Development', group: 'Group A', balance: 500, status: 'active', lastAttendance: '2025-07-15', progress: 85 },
    { id: 'S001', name: 'John Smith', phone: '+1-555-0101', course: 'Web Development', group: 'Group A', balance: 500, status: 'active', lastAttendance: '2025-07-15', progress: 85 },
    { id: 'S001', name: 'John Smith', phone: '+1-555-0101', course: 'Web Development', group: 'Group A', balance: 500, status: 'active', lastAttendance: '2025-07-15', progress: 85 },
    { id: 'S002', name: 'Emma Johnson', phone: '+1-555-0102', course: 'Data Science', group: 'Group B', balance: 0, status: 'active', lastAttendance: '2025-07-14', progress: 92 },
    { id: 'S003', name: 'Michael Brown', phone: '+1-555-0103', course: 'UI/UX Design', group: 'Group C', balance: -200, status: 'inactive', lastAttendance: '2025-06-30', progress: 45 },
    { id: 'S004', name: 'Sarah Davis', phone: '+1-555-0104', course: 'Mobile Development', group: 'Group A', balance: 1200, status: 'active', lastAttendance: '2025-07-15', progress: 78 },
    { id: 'S005', name: 'James Wilson', phone: '+1-555-0105', course: 'Web Development', group: 'Group B', balance: 300, status: 'pending', lastAttendance: '2025-07-13', progress: 60 },
    { id: 'S006', name: 'Emily Martinez', phone: '+1-555-0106', course: 'Data Science', group: 'Group A', balance: 800, status: 'active', lastAttendance: '2025-07-15', progress: 88 },
    { id: 'S007', name: 'Daniel Anderson', phone: '+1-555-0107', course: 'UI/UX Design', group: 'Group C', balance: 450, status: 'active', lastAttendance: '2025-07-14', progress: 73 },
    { id: 'S008', name: 'Olivia Taylor', phone: '+1-555-0108', course: 'Mobile Development', group: 'Group B', balance: 0, status: 'active', lastAttendance: '2025-07-15', progress: 95 },
    { id: 'S001', name: 'John Smith', phone: '+1-555-0101', course: 'Web Development', group: 'Group A', balance: 500, status: 'active', lastAttendance: '2025-07-15', progress: 85 },
    { id: 'S002', name: 'Emma Johnson', phone: '+1-555-0102', course: 'Data Science', group: 'Group B', balance: 0, status: 'active', lastAttendance: '2025-07-14', progress: 92 },
    { id: 'S003', name: 'Michael Brown', phone: '+1-555-0103', course: 'UI/UX Design', group: 'Group C', balance: -200, status: 'inactive', lastAttendance: '2025-06-30', progress: 45 },
    { id: 'S004', name: 'Sarah Davis', phone: '+1-555-0104', course: 'Mobile Development', group: 'Group A', balance: 1200, status: 'active', lastAttendance: '2025-07-15', progress: 78 },
    { id: 'S005', name: 'James Wilson', phone: '+1-555-0105', course: 'Web Development', group: 'Group B', balance: 300, status: 'pending', lastAttendance: '2025-07-13', progress: 60 },
    { id: 'S006', name: 'Emily Martinez', phone: '+1-555-0106', course: 'Data Science', group: 'Group A', balance: 800, status: 'active', lastAttendance: '2025-07-15', progress: 88 },
    { id: 'S007', name: 'Daniel Anderson', phone: '+1-555-0107', course: 'UI/UX Design', group: 'Group C', balance: 450, status: 'active', lastAttendance: '2025-07-14', progress: 73 },
    { id: 'S008', name: 'Olivia Taylor', phone: '+1-555-0108', course: 'Mobile Development', group: 'Group B', balance: 0, status: 'active', lastAttendance: '2025-07-15', progress: 95 },
    { id: 'S001', name: 'John Smith', phone: '+1-555-0101', course: 'Web Development', group: 'Group A', balance: 500, status: 'active', lastAttendance: '2025-07-15', progress: 85 },
    { id: 'S002', name: 'Emma Johnson', phone: '+1-555-0102', course: 'Data Science', group: 'Group B', balance: 0, status: 'active', lastAttendance: '2025-07-14', progress: 92 },
    { id: 'S003', name: 'Michael Brown', phone: '+1-555-0103', course: 'UI/UX Design', group: 'Group C', balance: -200, status: 'inactive', lastAttendance: '2025-06-30', progress: 45 },
    { id: 'S004', name: 'Sarah Davis', phone: '+1-555-0104', course: 'Mobile Development', group: 'Group A', balance: 1200, status: 'active', lastAttendance: '2025-07-15', progress: 78 },
    { id: 'S005', name: 'James Wilson', phone: '+1-555-0105', course: 'Web Development', group: 'Group B', balance: 300, status: 'pending', lastAttendance: '2025-07-13', progress: 60 },
    { id: 'S006', name: 'Emily Martinez', phone: '+1-555-0106', course: 'Data Science', group: 'Group A', balance: 800, status: 'active', lastAttendance: '2025-07-15', progress: 88 },
    { id: 'S007', name: 'Daniel Anderson', phone: '+1-555-0107', course: 'UI/UX Design', group: 'Group C', balance: 450, status: 'active', lastAttendance: '2025-07-14', progress: 73 },
    { id: 'S008', name: 'Olivia Taylor', phone: '+1-555-0108', course: 'Mobile Development', group: 'Group B', balance: 0, status: 'active', lastAttendance: '2025-07-15', progress: 95 },

];

export const mockTeachers: Teacher[] = [
    { id: 'T001', name: 'Dr. Robert Chen', subject: 'Web Development', phone: '+1-555-1001', salaryType: 'monthly', rating: 4.8 },
    { id: 'T002', name: 'Prof. Lisa Anderson', subject: 'Data Science', phone: '+1-555-1002', salaryType: 'monthly', rating: 4.9 },
    { id: 'T003', name: 'Mark Thompson', subject: 'UI/UX Design', phone: '+1-555-1003', salaryType: 'hourly', rating: 4.6 },
    { id: 'T004', name: 'Jennifer Lee', subject: 'Mobile Development', phone: '+1-555-1004', salaryType: 'monthly', rating: 4.7 },
    { id: 'T005', name: 'David Kumar', subject: 'Web Development', phone: '+1-555-1005', salaryType: 'hourly', rating: 4.5 },
];

export const mockCourses: Course[] = [
    { id: 'C001', name: 'Web Development', duration: '6 months', price: 2500, studentsCount: 45 },
    { id: 'C002', name: 'Data Science', duration: '8 months', price: 3200, studentsCount: 32 },
    { id: 'C003', name: 'UI/UX Design', duration: '4 months', price: 1800, studentsCount: 28 },
    { id: 'C004', name: 'Mobile Development', duration: '6 months', price: 2800, studentsCount: 38 },
    { id: 'C005', name: 'Cloud Computing', duration: '5 months', price: 2200, studentsCount: 25 },
];

export const mockLessons: Lesson[] = [
    { id: 'L001', course: 'Web Development', teacher: 'Dr. Robert Chen', dateTime: '2025-07-16 10:00', room: 'Room 101', topic: 'React Basics', status: 'scheduled' },
    { id: 'L002', course: 'Data Science', teacher: 'Prof. Lisa Anderson', dateTime: '2025-07-16 14:00', room: 'Room 202', topic: 'Machine Learning', status: 'scheduled' },
    { id: 'L003', course: 'UI/UX Design', teacher: 'Mark Thompson', dateTime: '2025-07-17 09:00', room: 'Room 103', topic: 'Figma Basics', status: 'scheduled' },
    { id: 'L004', course: 'Mobile Development', teacher: 'Jennifer Lee', dateTime: '2025-07-17 15:00', room: 'Room 104', topic: 'Flutter Basics', status: 'scheduled' },
    { id: 'L005', course: 'Web Development', teacher: 'David Kumar', dateTime: '2025-07-15 11:00', room: 'Room 101', topic: 'JavaScript ES6', status: 'completed' },
];

export const mockPayments: Payment[] = [
    { id: 'P001', student: 'John Smith', amount: 500, date: '2025-07-01', method: 'card', status: 'completed' },
    { id: 'P002', student: 'Emma Johnson', amount: 1600, date: '2025-07-03', method: 'online', status: 'completed' },
    { id: 'P003', student: 'Sarah Davis', amount: 700, date: '2025-07-05', method: 'cash', status: 'completed' },
    { id: 'P004', student: 'James Wilson', amount: 450, date: '2025-07-08', method: 'card', status: 'pending' },
    { id: 'P005', student: 'Emily Martinez', amount: 800, date: '2025-07-10', method: 'online', status: 'completed' },
    { id: 'P006', student: 'Daniel Anderson', amount: 300, date: '2025-07-12', method: 'cash', status: 'failed' },
    { id: 'P007', student: 'Olivia Taylor', amount: 1400, date: '2025-07-14', method: 'card', status: 'completed' },
];

export const mockAttendances: Attendance[] = [
    { id: 'A001', student: 'John Smith', group: 'Group A', date: '2025-07-15', status: 'present' },
    { id: 'A002', student: 'Emma Johnson', group: 'Group B', date: '2025-07-15', status: 'present' },
    { id: 'A003', student: 'Michael Brown', group: 'Group C', date: '2025-07-15', status: 'absent' },
    { id: 'A004', student: 'Sarah Davis', group: 'Group A', date: '2025-07-15', status: 'present' },
    { id: 'A005', student: 'James Wilson', group: 'Group B', date: '2025-07-15', status: 'late' },
    { id: 'A006', student: 'Emily Martinez', group: 'Group A', date: '2025-07-15', status: 'present' },
    { id: 'A007', student: 'Daniel Anderson', group: 'Group C', date: '2025-07-15', status: 'present' },
    { id: 'A008', student: 'Olivia Taylor', group: 'Group B', date: '2025-07-15', status: 'present' },
    { id: 'A001', student: 'John Smith', group: 'Group A', date: '2025-07-15', status: 'present' },
    { id: 'A002', student: 'Emma Johnson', group: 'Group B', date: '2025-07-15', status: 'present' },
    { id: 'A003', student: 'Michael Brown', group: 'Group C', date: '2025-07-15', status: 'absent' },
    { id: 'A004', student: 'Sarah Davis', group: 'Group A', date: '2025-07-15', status: 'present' },
    { id: 'A005', student: 'James Wilson', group: 'Group B', date: '2025-07-15', status: 'late' },
    { id: 'A006', student: 'Emily Martinez', group: 'Group A', date: '2025-07-15', status: 'present' },
    { id: 'A007', student: 'Daniel Anderson', group: 'Group C', date: '2025-07-15', status: 'present' },
    { id: 'A008', student: 'Olivia Taylor', group: 'Group B', date: '2025-07-15', status: 'present' },
    { id: 'A001', student: 'John Smith', group: 'Group A', date: '2025-07-15', status: 'present' },
    { id: 'A002', student: 'Emma Johnson', group: 'Group B', date: '2025-07-15', status: 'present' },
    { id: 'A003', student: 'Michael Brown', group: 'Group C', date: '2025-07-15', status: 'absent' },
    { id: 'A004', student: 'Sarah Davis', group: 'Group A', date: '2025-07-15', status: 'present' },
    { id: 'A005', student: 'James Wilson', group: 'Group B', date: '2025-07-15', status: 'late' },
    { id: 'A006', student: 'Emily Martinez', group: 'Group A', date: '2025-07-15', status: 'present' },
    { id: 'A007', student: 'Daniel Anderson', group: 'Group C', date: '2025-07-15', status: 'present' },
    { id: 'A008', student: 'Olivia Taylor', group: 'Group B', date: '2025-07-15', status: 'present' },
    { id: 'A001', student: 'John Smith', group: 'Group A', date: '2025-07-15', status: 'present' },
    { id: 'A002', student: 'Emma Johnson', group: 'Group B', date: '2025-07-15', status: 'present' },
    { id: 'A003', student: 'Michael Brown', group: 'Group C', date: '2025-07-15', status: 'absent' },
    { id: 'A004', student: 'Sarah Davis', group: 'Group A', date: '2025-07-15', status: 'present' },
    { id: 'A005', student: 'James Wilson', group: 'Group B', date: '2025-07-15', status: 'late' },
    { id: 'A006', student: 'Emily Martinez', group: 'Group A', date: '2025-07-15', status: 'present' },
    { id: 'A007', student: 'Daniel Anderson', group: 'Group C', date: '2025-07-15', status: 'present' },
    { id: 'A008', student: 'Olivia Taylor', group: 'Group B', date: '2025-07-15', status: 'present' },
];

export const mockGroups: Group[] = [
    { id: 'G001', name: 'Group A', course: 'Web Development', teacher: 'Dr. Robert Chen', studentsCount: 15, schedule: 'Mon, Wed, Fri - 10:00 AM' },
    { id: 'G002', name: 'Group B', course: 'Data Science', teacher: 'Prof. Lisa Anderson', studentsCount: 12, schedule: 'Tue, Thu - 2:00 PM' },
    { id: 'G003', name: 'Group C', course: 'UI/UX Design', teacher: 'Mark Thompson', studentsCount: 10, schedule: 'Mon, Wed - 9:00 AM' },
    { id: 'G004', name: 'Group D', course: 'Mobile Development', teacher: 'Jennifer Lee', studentsCount: 13, schedule: 'Tue, Thu, Sat - 3:00 PM' },
];

export const currentUser = {
    id: 'U001',
    name: 'Admin User',
    email: 'admin@crm.com',
    role: 'admin' as 'admin' | 'teacher',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Admin',
};

export const teacherUser = {
    id: 'T001',
    name: 'Dr. Robert Chen',
    email: 'robert.chen@crm.com',
    role: 'teacher' as 'admin' | 'teacher',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Robert',
};