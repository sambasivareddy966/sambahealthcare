"use client"

import { AuthProvider } from "@/components/auth/auth-context"
import { AuthGuard } from "@/components/auth/auth-guard"

export default function Home() {
  return (
    <AuthProvider>
      <AuthGuard />
    </AuthProvider>
  )
}
