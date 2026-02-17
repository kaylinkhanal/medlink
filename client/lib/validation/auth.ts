import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .max(20, "Email is too long")
    .email("Invalid email address"),

  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(20, "Password must be at most 20 characters"),
});


export type LoginTypeSchema = z.infer<typeof loginSchema>

const bloodGroups = [
  "A+",
  "A-",
  "B+",
  "B-",
  "O+",
  "O-",
  "AB+",
  "AB-",
] as const;

const donorTypes = ["blood", "plasma", "platelets", "organ"] as const;

export const registerSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(2, "Name must be at least 2 characters")
      .max(50, "Name is too long"),

    middleName: z
      .string()
      .trim()
      .max(30, "Middle name is too long")
      .optional()
      .or(z.literal("")),


    email: z
      .string()
      .trim()
      .min(1, "Email is required")
      .max(25, "Email is too long")
      .email("Invalid email address"),

    phone: z
      .string()
      .trim()
      .min(10, "Phone number must be at least 10 digits")
      .max(15, "Phone number is too long")
      .regex(/^[0-9+]+$/, "Phone must contain only numbers or +"),

    bloodGroup: z.enum(bloodGroups, { message: "Please select your blood group" }),

    address: z
      .string()
      .trim()
      .min(2, "Address is required")
      .max(60, "Address is too long"),

    dob: z
      .string()
      .min(1, "Date of birth is required"),

    lastDonationDate: z.string().optional(),

    donorType: z.enum(donorTypes, { message: "Please select donor type" }),

    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(72, "Password must be at most 72 characters")
      .regex(/[A-Z]/, "Must contain at least 1 uppercase letter")
      .regex(/[a-z]/, "Must contain at least 1 lowercase letter")
      .regex(/[0-9]/, "Must contain at least 1 number")
      .regex(/[^A-Za-z0-9]/, "Must contain at least 1 special character"),

    confirmPassword: z.string().min(1, "Confirm password is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type RegisterTypeSchema = z.infer<typeof registerSchema>;
