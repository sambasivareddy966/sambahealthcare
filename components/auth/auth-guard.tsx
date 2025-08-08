"use client"

import { useAuth } from "./auth-context"
import { LoginPage } from "./login-page"
import { AdminDashboard } from "../dashboards/admin-dashboard"
import { DoctorDashboard } from "../dashboards/doctor-dashboard"
import { PatientDashboard } from "../dashboards/patient-dashboard"
import { ReceptionistDashboard } from "../dashboards/receptionist-dashboard"

export function AuthGuard() {
  const { user, isLoading } = useAuth()

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!user) {
    return <LoginPage />
  }

  // Route to appropriate dashboard based on user role
  switch (user.role) {
    case "admin":
      return <AdminDashboard />
    case "doctor":
      return <DoctorDashboard />
    case "patient":
      return <PatientDashboard />
    case "receptionist":
      return <ReceptionistDashboard />
    default:
      return <LoginPage />
  }
}
