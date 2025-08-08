"use client"

import { useState } from "react"
import { Calendar, Users, Stethoscope, FileText, Home, Phone, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "../auth/auth-context"
import { DashboardLayout } from "./dashboard-layout"

export function ReceptionistDashboard() {
  const { user, logout } = useAuth()
  const [activeSection, setActiveSection] = useState("overview")

  const navigationItems = [
    { icon: Home, label: "Dashboard", id: "overview" },
    { icon: Calendar, label: "Appointments", id: "appointments" },
    { icon: Users, label: "Patient Check-in", id: "checkin" },
    { icon: Stethoscope, label: "Doctor Schedules", id: "schedules" },
    { icon: FileText, label: "Reports", id: "reports" },
  ]

  const todaysAppointments = [
    { id: 1, patient: "John Smith", doctor: "Dr. Sarah Johnson", time: "09:00 AM", status: "checked-in" },
    { id: 2, patient: "Emily Davis", doctor: "Dr. Michael Chen", time: "10:30 AM", status: "waiting" },
    { id: 3, patient: "Michael Brown", doctor: "Dr. Sarah Johnson", time: "02:00 PM", status: "scheduled" },
  ]

  const renderOverview = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold">Welcome, {user?.name}</h2>
        <p className="text-muted-foreground">Front desk operations dashboard</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today's Appointments</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">8 checked-in, 16 pending</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Waiting Patients</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">Currently waiting</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Available Doctors</CardTitle>
            <Stethoscope className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">On duty today</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Phone Calls</CardTitle>
            <Phone className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">18</div>
            <p className="text-xs text-muted-foreground">Handled today</p>
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
                <div>
                  <p className="font-medium">{appointment.patient}</p>
                  <p className="text-sm text-muted-foreground">{appointment.doctor}</p>
                  <p className="text-xs text-muted-foreground">{appointment.time}</p>
                </div>
                <Badge
                  className={
                    appointment.status === "checked-in"
                      ? "bg-green-100 text-green-800"
                      : appointment.status === "waiting"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-blue-100 text-blue-800"
                  }
                >
                  {appointment.status}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full justify-start bg-transparent" variant="outline">
              <Users className="h-4 w-4 mr-2" />
              Check-in Patient
            </Button>
            <Button className="w-full justify-start bg-transparent" variant="outline">
              <Calendar className="h-4 w-4 mr-2" />
              Schedule Appointment
            </Button>
            <Button className="w-full justify-start bg-transparent" variant="outline">
              <Phone className="h-4 w-4 mr-2" />
              Call Patient
            </Button>
            <Button className="w-full justify-start bg-transparent" variant="outline">
              <FileText className="h-4 w-4 mr-2" />
              Print Reports
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )

  const renderContent = () => {
    switch (activeSection) {
      case "overview":
        return renderOverview()
      case "appointments":
        return (
          <div className="space-y-4">
            <h2 className="text-3xl font-bold">Appointment Management</h2>
            <Card className="p-6">
              <p className="text-muted-foreground">
                Appointment scheduling and management interface will be implemented here.
              </p>
            </Card>
          </div>
        )
      case "checkin":
        return (
          <div className="space-y-4">
            <h2 className="text-3xl font-bold">Patient Check-in</h2>
            <Card className="p-6">
              <p className="text-muted-foreground">Patient check-in interface will be implemented here.</p>
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
