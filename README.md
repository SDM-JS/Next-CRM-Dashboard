"# EduCRM - Educational Center Management System

A modern, fully-featured CRM dashboard built with Next.js, TypeScript, and TailwindCSS for managing educational centers.

## 🌟 Features

### Admin Dashboard
- **Comprehensive Dashboard**: Overview of students, teachers, payments, and attendance
- **Student Management**: Full CRUD operations with modal forms, search, filter, sort, and pagination
- **Teacher Management**: Manage teaching staff with ratings and salary types
- **Course Management**: Track courses with duration, price, and student count
- **Lesson Scheduling**: Schedule and manage lessons with teachers and rooms
- **Payment Tracking**: Monitor all payment transactions with multiple payment methods
- **Attendance Records**: Track student attendance across all groups
- **Group Management**: Organize students into groups with schedules
- **Settings**: Profile and security management

### Teacher Dashboard
- **Personal Dashboard**: View today's lessons and group statistics
- **My Students**: Track student progress with visual progress bars
- **My Attendances**: Record and view attendance for classes
- **My Lessons**: View lesson schedule and topics
- **Settings**: Manage personal profile and preferences

### UI/UX Features
- ✅ Fixed sidebar navigation with icons
- ✅ Top header with search, notifications, theme toggle, and user menu
- ✅ Responsive data tables with sorting, filtering, and pagination
- ✅ Modal dialogs for CRUD operations using shadcn components
- ✅ Color-coded status badges (green=active, red=inactive, blue=pending)
- ✅ Dark/Light theme toggle with next-themes
- ✅ Modern, minimalistic design with soft shadows and rounded corners
- ✅ Smooth transitions and hover effects
- ✅ Lucide React icons throughout
- ✅ Form validation with Zod and react-hook-form
- ✅ TypeScript for type safety

## 🚀 Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS 3
- **UI Components**: Radix UI (shadcn/ui)
- **Icons**: Lucide React
- **Form Handling**: React Hook Form
- **Validation**: Zod
- **Theme**: next-themes

## 📦 Installation

```bash
# Install dependencies
yarn install

# Run development server
yarn dev

# Build for production
yarn build

# Start production server
yarn start
```

## 🌐 Access

- **Development**: http://localhost:3002
- **Admin Dashboard**: http://localhost:3002/admin
- **Teacher Dashboard**: http://localhost:3002/teacher

## 📁 Project Structure

```
crm-dashboard/
├── app/
│   ├── admin/              # Admin pages
│   │   ├── students/       # Student management
│   │   ├── teachers/       # Teacher management
│   │   ├── courses/        # Course management
│   │   ├── lessons/        # Lesson scheduling
│   │   ├── payments/       # Payment tracking
│   │   ├── attendances/    # Attendance records
│   │   ├── groups/         # Group management
│   │   └── settings/       # Admin settings
│   ├── teacher/            # Teacher pages
│   │   ├── students/       # Teacher's students
│   │   ├── attendances/    # Teacher's attendances
│   │   ├── lessons/        # Teacher's lessons
│   │   └── settings/       # Teacher settings
│   ├── layout.tsx          # Root layout with theme provider
│   ├── page.tsx            # Landing page (role selector)
│   └── globals.css         # Global styles
├── components/
│   ├── admin/              # Admin-specific components
│   │   └── DataTable.tsx   # Reusable data table
│   ├── layout/             # Layout components
│   │   ├── Sidebar.tsx     # Navigation sidebar
│   │   ├── Header.tsx      # Top header bar
│   │   └── ThemeProvider.tsx # Theme provider wrapper
│   └── ui/                 # shadcn UI components
├── data/
│   └── mockData.ts         # Mock data for all entities
└── lib/
    └── utils.ts            # Utility functions
```

## 🎨 Design Principles

- **Clean & Modern**: Minimalistic design with soft shadows and rounded corners
- **Consistent**: Unified color scheme and spacing throughout
- **Responsive**: Desktop-first approach, optimized for large screens
- **Accessible**: Proper ARIA labels and keyboard navigation
- **Fast**: Optimized performance with Next.js App Router

## 🔑 Key Components

### Data Table
Reusable table component with:
- Search functionality
- Column sorting
- Pagination (10 items per page)
- Custom cell rendering
- Action buttons

### Modal Forms
Form dialogs for CRUD operations with:
- Zod schema validation
- React Hook Form integration
- View/Edit/Create modes
- Error handling

### Status Badges
Color-coded indicators:
- 🟢 Green: Active/Completed/Present
- 🔴 Red: Inactive/Failed/Absent
- 🟡 Yellow: Pending/Late
- 🔵 Blue: Info/Scheduled

## 📝 Data Models

All data structures are defined in `data/mockData.ts`:
- Student
- Teacher
- Course
- Lesson
- Payment
- Attendance
- Group

## 🎯 Future Enhancements

Since this is frontend-only with mock data, you can easily integrate with a backend by:
1. Replacing mock data imports with API calls
2. Implementing actual CRUD functions in forms
3. Adding authentication/authorization
4. Integrating with a real database

## 📄 License

This project is built for educational purposes.

## 🤝 Contributing

Feel free to fork and modify this project for your needs!

---

Built with ❤️ using Next.js and TypeScript
"
