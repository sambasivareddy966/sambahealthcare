"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

export type UserRole = "admin" | "doctor" | "patient" | "receptionist"

export interface User {
  id: string
  name: string
  email: string
  role: UserRole
  avatar?: string
  specialization?: string // for doctors
  department?: string // for admin/receptionist
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Mock user database
const mockUsers: Record<string, { password: string; user: User }> = {
  "admin@hospital.com": {
    password: "admin123",
    user: {
      id: "1",
      name: "Hospital Administrator",
      email: "admin@hospital.com",
      role: "admin",
      department: "Administration",
    },
  },
  "doctor@hospital.com": {
    password: "doctor123",
    user: {
      id: "2",
      name: "Dr. Sarah Johnson",
      email: "doctor@hospital.com",
      role: "doctor",
      specialization: "Cardiology",
    },
  },
  "patient@hospital.com": {
    password: "patient123",
    user: {
      id: "3",
      name: "John Smith",
      email: "patient@hospital.com",
      role: "patient",
    },
  },
  "receptionist@hospital.com": {
    password: "receptionist123",
    user: {
      id: "4",
      name: "Mary Wilson",
      email: "receptionist@hospital.com",
      role: "receptionist",
      department: "Front Desk",
    },
  },
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if user is already logged in (from localStorage)
    const savedUser = localStorage.getItem("healthcare_user")
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true)

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const userRecord = mockUsers[email.toLowerCase()]

    if (userRecord && userRecord.password === password) {
      setUser(userRecord.user)
      localStorage.setItem("healthcare_user", JSON.stringify(userRecord.user))
      setIsLoading(false)
      return true
    }

    setIsLoading(false)
    return false
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("healthcare_user")
  }

  return <AuthContext.Provider value={{ user, login, logout, isLoading }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
