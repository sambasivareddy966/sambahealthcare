"use client"

import React, { useState, Suspense } from "react"
import { Users, Stethoscope, Calendar, BarChart3, Settings, Pill, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "../auth/auth-context"
import { DashboardLayout } from "./dashboard-layout"

export function AdminDashboard() {
  const { user, logout } = useAuth()
  const [activeSection, setActiveSection] = useState("overview")

  const navigationItems = [
    { icon: BarChart3, label: "Overview", id: "overview" },
    { icon: Stethoscope, label: "Doctors", id: "doctors" },
    { icon: Users, label: "Patients", id: "patients" },
    { icon: Calendar, label: "Appointments", id: "appointments" },
    { icon: BarChart3, label: "Analytics", id: "analytics" },
    { icon: Pill, label: "Pharmacy", id: "pharmacy" },
    { icon: Settings, label: "Settings", id: "settings" },
  ]

  const renderOverview = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold">Admin Dashboard</h2>
        <p className="text-muted-foreground">Hospital management overview</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Patients</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,847</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Doctors</CardTitle>
            <Stethoscope className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">67</div>
            <p className="text-xs text-muted-foreground">+3 new this month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today's Appointments</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">156</div>
            <p className="text-xs text-muted-foreground">+8% from yesterday</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$89,432</div>
            <p className="text-xs text-muted-foreground">+15% from last month</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-4">
              <Avatar className="h-8 w-8">
                <AvatarFallback>DR</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="text-sm font-medium">Dr. Smith registered</p>
                <p className="text-xs text-muted-foreground">2 hours ago</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Avatar className="h-8 w-8">
                <AvatarFallback>PT</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="text-sm font-medium">New patient registration</p>
                <p className="text-xs text-muted-foreground">4 hours ago</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>System Status</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm">Server Status</span>
              <Badge className="bg-green-100 text-green-800">Online</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Database</span>
              <Badge className="bg-green-100 text-green-800">Connected</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Backup Status</span>
              <Badge className="bg-blue-100 text-blue-800">Completed</Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )

  const AdminAppointments = React.lazy(() => import("@/app/admin/appointments"));
  const AdminDoctors = React.lazy(() => import("@/app/admin/doctors"));
  const AdminPatients = React.lazy(() => import("@/app/admin/patients"));
  const AdminAnalytics = React.lazy(() => import("@/app/admin/analytics"));
  const AdminPharmacy = React.lazy(() => import("@/app/admin/pharmacy"));
  const AdminSettings = React.lazy(() => import("@/app/admin/settings"));

  const renderContent = () => {
    switch (activeSection) {
      case "overview":
        return renderOverview()
      case "appointments":
        return (
          <div className="space-y-4">
            <h2 className="text-3xl font-bold">All Appointments</h2>
            <Card className="p-6">
              <div className="mt-4">
                <Suspense fallback={<div>Loading...</div>}>
                  <AdminAppointments />
                </Suspense>
              </div>
            </Card>
          </div>
        )
      case "doctors":
        return (
          <div className="space-y-4">
            <h2 className="text-3xl font-bold">All Doctors</h2>
            <Card className="p-6">
              <div className="mt-4">
                <Suspense fallback={<div>Loading...</div>}>
                  <AdminDoctors />
                </Suspense>
              </div>
            </Card>
          </div>
        )
      case "patients":
        return (
          <div className="space-y-4">
            <h2 className="text-3xl font-bold">All Patients</h2>
            <Card className="p-6">
              <div className="mt-4">
                <Suspense fallback={<div>Loading...</div>}>
                  <AdminPatients />
                </Suspense>
              </div>
            </Card>
          </div>
        )
      case "analytics":
        return (
          <div className="space-y-4">
            <h2 className="text-3xl font-bold">Analytics</h2>
            <Card className="p-6">
              <div className="mt-4">
                <Suspense fallback={<div>Loading...</div>}>
                  <AdminAnalytics />
                </Suspense>
              </div>
            </Card>
          </div>
        )
      case "pharmacy":
        return (
          <div className="space-y-4">
            <h2 className="text-3xl font-bold">Pharmacy Details</h2>
            <Card className="p-6">
              <div className="mt-4">
                <Suspense fallback={<div>Loading...</div>}>
                  <AdminPharmacy />
                </Suspense>
              </div>
            </Card>
          </div>
        )
      case "settings":
        return (
          <div className="space-y-4">
            <h2 className="text-3xl font-bold">Settings</h2>
            <Card className="p-6">
              <div className="mt-4">
                <Suspense fallback={<div>Loading...</div>}>
                  <AdminSettings />
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
