"use client"

import { useState } from "react"
import {
  Calendar,
  Users,
  FileText,
  Settings,
  Bell,
  Home,
  Stethoscope,
  UserCheck,
  Pill,
  BarChart3,
  Plus,
  Upload,
  Eye,
  Edit,
  Trash2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

type UserRole = "admin" | "doctor" | "patient" | "receptionist"

interface User {
  id: string
  name: string
  email: string
  role: UserRole
  avatar?: string
}

interface Appointment {
  id: string
  patientName: string
  doctorName: string
  date: string
  time: string
  status: "scheduled" | "completed" | "cancelled" | "in-progress"
  type: string
}

interface Patient {
  id: string
  name: string
  age: number
  gender: string
  phone: string
  lastVisit: string
  condition: string
}

const mockUser: User = {
  id: "1",
  name: "Dr. Sarah Johnson",
  email: "sarah.johnson@hospital.com",
  role: "doctor",
}

const mockAppointments: Appointment[] = [
  {
    id: "1",
    patientName: "John Smith",
    doctorName: "Dr. Sarah Johnson",
    date: "2024-01-15",
    time: "09:00",
    status: "scheduled",
    type: "Consultation",
  },
  {
    id: "2",
    patientName: "Emily Davis",
    doctorName: "Dr. Sarah Johnson",
    date: "2024-01-15",
    time: "10:30",
    status: "in-progress",
    type: "Follow-up",
  },
  {
    id: "3",
    patientName: "Michael Brown",
    doctorName: "Dr. Sarah Johnson",
    date: "2024-01-15",
    time: "14:00",
    status: "completed",
    type: "Check-up",
  },
]

const mockPatients: Patient[] = [
  {
    id: "1",
    name: "John Smith",
    age: 45,
    gender: "Male",
    phone: "+1 (555) 123-4567",
    lastVisit: "2024-01-10",
    condition: "Hypertension",
  },
  {
    id: "2",
    name: "Emily Davis",
    age: 32,
    gender: "Female",
    phone: "+1 (555) 987-6543",
    lastVisit: "2024-01-12",
    condition: "Diabetes",
  },
]

const getNavigationItems = (role: UserRole) => {
  const baseItems = [{ icon: Home, label: "Dashboard", id: "dashboard" }]

  switch (role) {
    case "admin":
      return [
        ...baseItems,
        { icon: Users, label: "Doctors", id: "doctors" },
        { icon: UserCheck, label: "Patients", id: "patients" },
        { icon: Calendar, label: "Appointments", id: "appointments" },
        { icon: BarChart3, label: "Analytics", id: "analytics" },
        { icon: Pill, label: "Pharmacy", id: "pharmacy" },
        { icon: Settings, label: "Settings", id: "settings" },
      ]
    case "doctor":
      return [
        ...baseItems,
        { icon: Calendar, label: "Appointments", id: "appointments" },
        { icon: Users, label: "Patients", id: "patients" },
        { icon: FileText, label: "Prescriptions", id: "prescriptions" },
        { icon: Bell, label: "Notifications", id: "notifications" },
        { icon: Settings, label: "Profile", id: "profile" },
      ]
    case "patient":
      return [
        ...baseItems,
        { icon: Calendar, label: "My Appointments", id: "appointments" },
        { icon: FileText, label: "Prescriptions", id: "prescriptions" },
        { icon: Upload, label: "Reports", id: "reports" },
        { icon: Stethoscope, label: "Find Doctors", id: "doctors" },
        { icon: Settings, label: "Profile", id: "profile" },
      ]
    case "receptionist":
      return [
        ...baseItems,
        { icon: Calendar, label: "Appointments", id: "appointments" },
        { icon: Users, label: "Patients", id: "patients" },
        { icon: Stethoscope, label: "Doctors", id: "doctors" },
        { icon: FileText, label: "Reports", id: "reports" },
      ]
    default:
      return baseItems
  }
}

const getStatusBadge = (status: string) => {
  const variants = {
    scheduled: "default",
    "in-progress": "secondary",
    completed: "outline",
    cancelled: "destructive",
  } as const

  const colors = {
    scheduled: "bg-blue-100 text-blue-800",
    "in-progress": "bg-yellow-100 text-yellow-800",
    completed: "bg-green-100 text-green-800",
    cancelled: "bg-red-100 text-red-800",
  }

  return (
    <Badge className={colors[status as keyof typeof colors]}>{status.charAt(0).toUpperCase() + status.slice(1)}</Badge>
  )
}

export function HealthcareDashboard() {
  const [currentUser, setCurrentUser] = useState<User>(mockUser)
  const [activeSection, setActiveSection] = useState("dashboard")
  const [selectedRole, setSelectedRole] = useState<UserRole>(currentUser.role)

  const navigationItems = getNavigationItems(selectedRole)

  const switchRole = (role: UserRole) => {
    setSelectedRole(role)
    setCurrentUser({
      ...currentUser,
      role,
      name:
        role === "admin"
          ? "Admin User"
          : role === "doctor"
            ? "Dr. Sarah Johnson"
            : role === "patient"
              ? "John Smith"
              : "Receptionist",
    })
    setActiveSection("dashboard")
  }

  const renderDashboardOverview = () => {
    if (selectedRole === "admin") {
      return (
        <div className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Patients</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,234</div>
                <p className="text-xs text-muted-foreground">+12% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Doctors</CardTitle>
                <Stethoscope className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">45</div>
                <p className="text-xs text-muted-foreground">+2 new this month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Today's Appointments</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">89</div>
                <p className="text-xs text-muted-foreground">+5% from yesterday</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Revenue</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$12,345</div>
                <p className="text-xs text-muted-foreground">+8% from last week</p>
              </CardContent>
            </Card>
          </div>
        </div>
      )
    }

    if (selectedRole === "doctor") {
      return (
        <div className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Today's Appointments</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">8</div>
                <p className="text-xs text-muted-foreground">2 completed, 6 remaining</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Patients</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">156</div>
                <p className="text-xs text-muted-foreground">Active patients</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Prescriptions</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">23</div>
                <p className="text-xs text-muted-foreground">This week</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Notifications</CardTitle>
                <Bell className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">5</div>
                <p className="text-xs text-muted-foreground">Unread messages</p>
              </CardContent>
            </Card>
          </div>
        </div>
      )
    }

    if (selectedRole === "patient") {
      return (
        <div className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Next Appointment</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">Jan 20</div>
                <p className="text-xs text-muted-foreground">Dr. Sarah Johnson at 2:00 PM</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Prescriptions</CardTitle>
                <Pill className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3</div>
                <p className="text-xs text-muted-foreground">Active prescriptions</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Reports</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">7</div>
                <p className="text-xs text-muted-foreground">Medical reports</p>
              </CardContent>
            </Card>
          </div>
        </div>
      )
    }

    return null
  }

  const renderAppointments = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Appointments</h2>
        <div className="flex items-center space-x-2">
          <Input placeholder="Search appointments..." className="w-64" />
          <Select>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="scheduled">Scheduled</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            New Appointment
          </Button>
        </div>
      </div>

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Patient</TableHead>
              <TableHead>Doctor</TableHead>
              <TableHead>Date & Time</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockAppointments.map((appointment) => (
              <TableRow key={appointment.id}>
                <TableCell className="font-medium">{appointment.patientName}</TableCell>
                <TableCell>{appointment.doctorName}</TableCell>
                <TableCell>
                  {appointment.date} at {appointment.time}
                </TableCell>
                <TableCell>{appointment.type}</TableCell>
                <TableCell>{getStatusBadge(appointment.status)}</TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  )

  const renderPatients = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Patients</h2>
        <div className="flex items-center space-x-2">
          <Input placeholder="Search patients..." className="w-64" />
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Patient
          </Button>
        </div>
      </div>

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Age</TableHead>
              <TableHead>Gender</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Last Visit</TableHead>
              <TableHead>Condition</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockPatients.map((patient) => (
              <TableRow key={patient.id}>
                <TableCell className="font-medium">{patient.name}</TableCell>
                <TableCell>{patient.age}</TableCell>
                <TableCell>{patient.gender}</TableCell>
                <TableCell>{patient.phone}</TableCell>
                <TableCell>{patient.lastVisit}</TableCell>
                <TableCell>{patient.condition}</TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <FileText className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  )

  const renderContent = () => {
    switch (activeSection) {
      case "dashboard":
        return renderDashboardOverview()
      case "appointments":
        return renderAppointments()
      case "patients":
        return renderPatients()
      case "prescriptions":
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Prescriptions</h2>
            <Card className="p-6">
              <p className="text-muted-foreground">Prescription management interface would go here.</p>
            </Card>
          </div>
        )
      case "doctors":
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Doctors</h2>
            <Card className="p-6">
              <p className="text-muted-foreground">Doctor management interface would go here.</p>
            </Card>
          </div>
        )
      case "analytics":
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Analytics & Reports</h2>
            <Card className="p-6">
              <p className="text-muted-foreground">Analytics dashboard with charts would go here.</p>
            </Card>
          </div>
        )
      default:
        return renderDashboardOverview()
    }
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-sm border-r">
        <div className="p-6 border-b">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Stethoscope className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="font-semibold text-lg">HealthCare</h1>
              <p className="text-xs text-muted-foreground">Management System</p>
            </div>
          </div>
        </div>

        {/* Role Switcher for Demo */}
        <div className="p-4 border-b">
          <Select value={selectedRole} onValueChange={(value: UserRole) => switchRole(value)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="admin">Admin</SelectItem>
              <SelectItem value="doctor">Doctor</SelectItem>
              <SelectItem value="patient">Patient</SelectItem>
              <SelectItem value="receptionist">Receptionist</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <nav className="p-4 space-y-2">
          {navigationItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                activeSection === item.id
                  ? "bg-blue-50 text-blue-700 border border-blue-200"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <item.icon className="h-5 w-5" />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white border-b px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold capitalize">
                {activeSection === "dashboard" ? `${selectedRole} Dashboard` : activeSection}
              </h1>
              <p className="text-muted-foreground">Welcome back, {currentUser.name}</p>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                <Bell className="h-5 w-5" />
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/placeholder-user.jpg" alt={currentUser.name} />
                      <AvatarFallback>
                        {currentUser.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{currentUser.name}</p>
                      <p className="text-xs leading-none text-muted-foreground">{currentUser.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem>Settings</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Log out</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 p-6 overflow-auto">{renderContent()}</main>
      </div>
    </div>
  )
}
