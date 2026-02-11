import z from "zod";

export const EmailSchema = z.email().min(1, "Email is required");

export const PasswordSchema = z.string()
	.min(8, "Password must be at least 8 characters")
	.regex(/[0-9]/, "Password must contain at least one number")
	.regex(/[A-Z]/, "Password must contain at least one uppercase letter")
	.regex(
		/[!@#$%^&*(),.?":{}|<>_\-+=~[\]\\;/]/,
		"Password must contain at least one special character"
	);
