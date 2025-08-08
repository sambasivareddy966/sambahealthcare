# Healthcare Management System - Mini Project Report

## 1. Project Explanation

This Healthcare Management System is a comprehensive web application designed to streamline healthcare operations for various user roles including administrators, doctors, patients, and receptionists. Built with Next.js and React, it provides role-based dashboards and modules to manage appointments, patients, prescriptions, analytics, pharmacy, and more. The system supports authentication, theming, and responsive UI to enhance user experience and operational efficiency.

## 2. Models Explanation

### User
- Represents system users with roles such as admin, doctor, patient, and receptionist.
- Fields: `id`, `name`, `email`, `role`, `avatar` (optional).

### Appointment
- Represents scheduled healthcare appointments.
- Fields: `id`, `patientName`, `doctorName`, `date`, `time`, `status` (scheduled, completed, cancelled, in-progress), `type`.

### Patient
- Represents patient information.
- Fields: `id`, `name`, `age`, `gender`, `phone`, `lastVisit`, `condition`.

### Additional Models (Inferred)
- Doctor, Prescription, Pharmacy, Analytics data, Notifications, Reports, Settings.

## 3. Modules Explanation

- **Dashboard**: Role-based dashboards providing overviews such as total patients, active doctors, appointments, revenue, prescriptions, and notifications.
- **Appointments**: Manage appointments with add, edit, delete functionalities.
- **Patients**: Manage patient records with search and CRUD operations.
- **Prescriptions**: Manage prescriptions (UI placeholder present).
- **Doctors**: Manage doctor profiles (UI placeholder present).
- **Analytics & Reports**: Visualize healthcare data and reports.
- **Pharmacy**: Manage pharmacy-related data.
- **Settings**: User and system settings management.
- **Authentication**: Login and protected routes for secure access.

## 4. Tools Explanation

- **Next.js**: React framework for server-side rendering and routing.
- **React**: UI library for building interactive components.
- **TypeScript**: Typed superset of JavaScript for safer code.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **Radix UI**: Accessible UI primitives for React.
- **Zustand**: State management library with persistence.
- **React Hook Form & Zod**: Form handling and validation.
- **Sonner**: Toast notifications.
- **Lucide React**: Icon library.
- **Geist Fonts**: Custom fonts for UI.
- **Other utilities**: clsx, tailwind-merge for class name management.

## 5. How to Setup

1. Ensure Node.js (version >= 16) is installed.
2. Clone the repository.
3. Navigate to the project directory.
4. Install dependencies using:

```bash
npm install
# or
pnpm install
```

## 6. How to Run

- To start the development server:

```bash
npm run dev
# or
pnpm dev
```

- To build the project for production:

```bash
npm run build
# or
pnpm build
```

- To start the production server:

```bash
npm start
# or
pnpm start
```

---

This mini report provides an overview of the Healthcare Management System project, its core models, modules, tools, and setup instructions.
