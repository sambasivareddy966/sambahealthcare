"use client"

import React, { useState, Suspense } from "react"
import { Calendar, Users, FileText, Bell, Settings, Stethoscope, Clock, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "../auth/auth-context"
import { DashboardLayout } from "./dashboard-layout"

export function DoctorDashboard() {
  const { user, logout } = useAuth()
  const [activeSection, setActiveSection] = useState("overview")

  const navigationItems = [
    { icon: Stethoscope, label: "Dashboard", id: "overview" },
    { icon: Calendar, label: "Appointments", id: "appointments" },
    { icon: Users, label: "My Patients", id: "patients" },
    { icon: FileText, label: "Prescriptions", id: "prescriptions" },
    { icon: Bell, label: "Notifications", id: "notifications" },
    { icon: Settings, label: "Profile", id: "profile" },
  ]

  const todaysAppointments = [
    { id: 1, patient: "John Smith", time: "09:00 AM", status: "completed", type: "Consultation" },
    { id: 2, patient: "Emily Davis", time: "10:30 AM", status: "in-progress", type: "Follow-up" },
    { id: 3, patient: "Michael Brown", time: "02:00 PM", status: "scheduled", type: "Check-up" },
    { id: 4, patient: "Sarah Wilson", time: "03:30 PM", status: "scheduled", type: "Consultation" },
  ]

  const getStatusBadge = (status: string) => {
    const colors = {
      scheduled: "bg-blue-100 text-blue-800",
      "in-progress": "bg-yellow-100 text-yellow-800",
      completed: "bg-green-100 text-green-800",
    }
    return (
      <Badge className={colors[status as keyof typeof colors]}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    )
  }

  const renderOverview = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold">Welcome back, {user?.name}</h2>
        <p className="text-muted-foreground">Here's your schedule for today</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today's Appointments</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">2 completed, 6 remaining</p>
            <Button className="mt-2" variant="outline" onClick={() => setActiveSection("appointments")}>Go to Appointments</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Patients</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">247</div>
            <p className="text-xs text-muted-foreground">Active patients</p>
            <Button className="mt-2" variant="outline" onClick={() => setActiveSection("patients")}>Go to My Patients</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Prescriptions</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">34</div>
            <p className="text-xs text-muted-foreground">This week</p>
            {/* Add navigation if prescription page is implemented */}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Notifications</CardTitle>
            <Bell className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7</div>
            <p className="text-xs text-muted-foreground">Unread messages</p>
            <Button className="mt-2" variant="outline" onClick={() => setActiveSection("notifications")}>Go to Notifications</Button>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Today's Schedule</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {todaysAppointments.map((appointment) => (
              <div key={appointment.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-full">
                    {appointment.status === "completed" ? (
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    ) : appointment.status === "in-progress" ? (
                      <Clock className="h-4 w-4 text-yellow-600" />
                    ) : (
                      <Calendar className="h-4 w-4 text-blue-600" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium">{appointment.patient}</p>
                    <p className="text-sm text-muted-foreground">{appointment.type}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">{appointment.time}</p>
                  {getStatusBadge(appointment.status)}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full justify-start bg-transparent" variant="outline" onClick={() => setActiveSection("appointments")}> 
              <Calendar className="h-4 w-4 mr-2" />
              Schedule Appointment
            </Button>
            <Button className="w-full justify-start bg-transparent" variant="outline" onClick={() => setActiveSection("patients")}> 
              <Users className="h-4 w-4 mr-2" />
              View Patient Records
            </Button>
            <Button className="w-full justify-start bg-transparent" variant="outline" onClick={() => setActiveSection("notifications")}> 
              <Bell className="h-4 w-4 mr-2" />
              Send Notification
            </Button>
            <Button className="w-full justify-start bg-transparent" variant="outline" onClick={() => setActiveSection("profile")}> 
              <Settings className="h-4 w-4 mr-2" />
              Edit Profile
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )

  const DoctorAppointments = React.lazy(() => import("@/app/doctor/appointments"));
  const MyPatients = React.lazy(() => import("@/app/doctor/patients"));
  const Notifications = React.lazy(() => import("@/app/doctor/notifications"));
  const Profile = React.lazy(() => import("@/app/doctor/profile"));

  const renderContent = () => {
    switch (activeSection) {
      case "overview":
        return renderOverview()
      case "appointments":
        return (
          <div className="space-y-4">
            <h2 className="text-3xl font-bold">My Appointments</h2>
            <Card className="p-6">
              <div className="mt-4">
                <Suspense fallback={<div>Loading...</div>}>
                  <DoctorAppointments />
                </Suspense>
              </div>
            </Card>
          </div>
        )
      case "patients":
        return (
          <div className="space-y-4">
            <h2 className="text-3xl font-bold">My Patients</h2>
            <Card className="p-6">
              <div className="mt-4">
                <Suspense fallback={<div>Loading...</div>}>
                  <MyPatients />
                </Suspense>
              </div>
            </Card>
          </div>
        )
      case "notifications":
        return (
          <div className="space-y-4">
            <h2 className="text-3xl font-bold">Notifications</h2>
            <Card className="p-6">
              <div className="mt-4">
                <Suspense fallback={<div>Loading...</div>}>
                  <Notifications />
                </Suspense>
              </div>
            </Card>
          </div>
        )
      case "profile":
        return (
          <div className="space-y-4">
            <h2 className="text-3xl font-bold">My Profile</h2>
            <Card className="p-6">
              <div className="mt-4">
                <Suspense fallback={<div>Loading...</div>}>
                  <Profile />
                </Suspense>
              </div>
            </Card>
          </div>
        )
      default:
        return renderOverview()
    }
  }

  return (
    <DashboardLayout
      user={user!}
      navigationItems={navigationItems}
      activeSection={activeSection}
      setActiveSection={setActiveSection}
      onLogout={logout}
    >
      {renderContent()}
    </DashboardLayout>
  )
}
