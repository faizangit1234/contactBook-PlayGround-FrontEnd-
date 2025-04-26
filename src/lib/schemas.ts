import { z } from "zod"

const MAX_AVATAR_BYTES = 5 * 1024 * 1024

export const UserformSchema = z
  .object({
    name: z
      .string()
      .min(2, { message: "Name must be at least 2 characters." })
      .max(50, { message: "Name must be at most 50 characters." })
      .regex(/^[A-Za-z\s]+$/, { message: "Only letters and spaces allowed." }),

    email: z
      .string()
      .email({ message: "Enter a valid email address." }),

    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long." })
      .regex(/[A-Z]/, { message: "Include an uppercase letter." })
      .regex(/[a-z]/, { message: "Include a lowercase letter." })
      .regex(/[0-9]/, { message: "Include a number." })
      .regex(/[@$!%*?&]/, { message: "Include a special character." }),

    

    company: z
      .string()
      .min(2, { message: "Company name too short." })
      .max(100, { message: "Company name too long." }),

    department: z
      .string()
      .min(2, { message: "Department too short." })
      .max(100, { message: "Department too long." }),

    role: z
      .string()
      .min(2, { message: "Role too short." })
      .max(100, { message: "Role too long." }),

    avatar: z
      .any()
      .refine((f) => f instanceof File, { message: "Must upload a file." })
      .refine((f) => f.size <= MAX_AVATAR_BYTES, { message: "Max size is 5 MB." })
      .refine((f) => ["image/jpeg","image/png"].includes(f.type), {
        message: "Only JPEG/PNG formats allowed.",
      }).optional(),
  })
  
