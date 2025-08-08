"use client"

import React, { useState, Suspense } from "react"
import { Calendar, FileText, Upload, Stethoscope, Settings, Home, Clock, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { useAuth } from "../auth/auth-context"
import { DashboardLayout } from "./dashboard-layout"

export function PatientDashboard() {
  const { user, logout } = useAuth()
  const [activeSection, setActiveSection] = useState("overview")

  const navigationItems = [
    { icon: Home, label: "Dashboard", id: "overview" },
    { icon: Calendar, label: "My Appointments", id: "appointments" },
    { icon: FileText, label: "Prescriptions", id: "prescriptions" },
    { icon: Upload, label: "Medical Reports", id: "reports" },
    { icon: Stethoscope, label: "Find Doctors", id: "doctors" },
    { icon: Settings, label: "Profile", id: "profile" },
  ]

  const upcomingAppointments = [
    {
      id: 1,
      doctor: "Dr. Sarah Johnson",
      specialty: "Cardiology",
      date: "Jan 20, 2024",
      time: "2:00 PM",
      location: "Room 205",
      status: "confirmed",
    },
    {
      id: 2,
      doctor: "Dr. Michael Chen",
      specialty: "Dermatology",
      date: "Jan 25, 2024",
      time: "10:30 AM",
      location: "Room 102",
      status: "pending",
    },
  ]

  const recentPrescriptions = [
    {
      id: 1,
      doctor: "Dr. Sarah Johnson",
      medication: "Lisinopril 10mg",
      date: "Jan 15, 2024",
      status: "active",
    },
    {
      id: 2,
      doctor: "Dr. Sarah Johnson",
      medication: "Metformin 500mg",
      date: "Jan 10, 2024",
      status: "active",
    },
  ]

  const renderOverview = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold">Welcome, {user?.name}</h2>
        <p className="text-muted-foreground">Manage your health and appointments</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Next Appointment</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Jan 20</div>
            <p className="text-xs text-muted-foreground">Dr. Sarah Johnson at 2:00 PM</p>
            <Button className="mt-2" variant="outline" onClick={() => setActiveSection("appointments")}>Go to Appointments</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Prescriptions</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">Current medications</p>
            <Button className="mt-2" variant="outline" onClick={() => setActiveSection("prescriptions")}>Go to Prescriptions</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Medical Reports</CardTitle>
            <Upload className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">Uploaded documents</p>
            {/* You can add navigation for reports if implemented */}
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Appointments</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {upcomingAppointments.map((appointment) => (
              <div key={appointment.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback>
                      {appointment.doctor
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{appointment.doctor}</p>
                    <p className="text-sm text-muted-foreground">{appointment.specialty}</p>
                    <div className="flex items-center text-xs text-muted-foreground mt-1">
                      <Clock className="h-3 w-3 mr-1" />
                      {appointment.date} at {appointment.time}
                    </div>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <MapPin className="h-3 w-3 mr-1" />
                      {appointment.location}
                    </div>
                  </div>
                </div>
                <Badge
                  className={
                    appointment.status === "confirmed" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                  }
                >
                  {appointment.status}
                </Badge>
              </div>
            ))}
            <Button className="w-full bg-transparent" variant="outline" onClick={() => setActiveSection("appointments")}> 
              <Calendar className="h-4 w-4 mr-2" />
              Book New Appointment
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Prescriptions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentPrescriptions.map((prescription) => (
              <div key={prescription.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">{prescription.medication}</p>
                  <p className="text-sm text-muted-foreground">Prescribed by {prescription.doctor}</p>
                  <p className="text-xs text-muted-foreground">{prescription.date}</p>
                </div>
                <Badge className="bg-blue-100 text-blue-800">{prescription.status}</Badge>
              </div>
            ))}
            <Button className="w-full bg-transparent" variant="outline" onClick={() => setActiveSection("prescriptions")}> 
              <FileText className="h-4 w-4 mr-2" />
              View All Prescriptions
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
            <Button className="justify-start bg-transparent" variant="outline" onClick={() => setActiveSection("appointments")}> 
              <Calendar className="h-4 w-4 mr-2" />
              Book Appointment
            </Button>
            <Button className="justify-start bg-transparent" variant="outline"> 
              <Upload className="h-4 w-4 mr-2" />
              Upload Report
            </Button>
            <Button className="justify-start bg-transparent" variant="outline" onClick={() => setActiveSection("prescriptions")}> 
              <FileText className="h-4 w-4 mr-2" />
              Download Prescription
            </Button>
            <Button className="justify-start bg-transparent" variant="outline" onClick={() => setActiveSection("doctors")}> 
              <Stethoscope className="h-4 w-4 mr-2" />
              Find Specialist
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderContent = () => {
    // Use dynamic imports for patient portal sections
    const MyAppointments = React.lazy(() => import("@/app/patient/my-appointments"));
    const Prescriptions = React.lazy(() => import("@/app/patient/prescriptions"));
    const FindDoctors = React.lazy(() => import("@/app/patient/find-doctors"));
    const Profile = React.lazy(() => import("@/app/patient/profile"));

    switch (activeSection) {
      case "overview":
        return renderOverview()
      case "appointments":
        return (
          <div className="space-y-4">
            <h2 className="text-3xl font-bold">My Appointments</h2>
            <Card className="p-6">
              <p className="text-muted-foreground">View and manage your appointments below.</p>
              <div className="mt-4">
                <Suspense fallback={<div>Loading...</div>}>
                  <MyAppointments />
                </Suspense>
              </div>
            </Card>
          </div>
        )
      case "prescriptions":
        return (
          <div className="space-y-4">
            <h2 className="text-3xl font-bold">My Prescriptions</h2>
            <Card className="p-6">
              <p className="text-muted-foreground">View your prescriptions below.</p>
              <div className="mt-4">
                <Suspense fallback={<div>Loading...</div>}>
                  <Prescriptions />
                </Suspense>
              </div>
            </Card>
          </div>
        )
      case "doctors":
        return (
          <div className="space-y-4">
            <h2 className="text-3xl font-bold">Find Doctors</h2>
            <Card className="p-6">
              <p className="text-muted-foreground">Search and connect with doctors below.</p>
              <div className="mt-4">
                <Suspense fallback={<div>Loading...</div>}>
                  <FindDoctors />
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
              <p className="text-muted-foreground">View and update your profile information below.</p>
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
