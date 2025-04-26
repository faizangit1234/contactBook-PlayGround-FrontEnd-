export type User = {
    _id: string
    name: string
    role:  "admin" | "superAdmin" | "manager" | "employee"
    email: string
    password: string
    company: string
    department: string
    avatar: string
  }