import z from "zod";

export const SignUpFormSchema = z.object({
	name: z.string().min(1, "A name is required"),
	email: z.email().min(1, "An email is required"),
	password: z.string()
		.min(8, "Password must be at least 8 characters")
		.regex(/[0-9]/, "Password must contain at least one number")
		.regex(/[A-Z]/, "Password must contain at least one uppercase letter")
		.regex(
			/[!@#$%^&*(),.?":{}|<>_\-+=~[\]\\;/]/,
			"Password must contain at least one special character"
		),
	confirmPassword: z.string()
}).superRefine((data, ctx) => {
	if (data.password !== data.confirmPassword) {
		ctx.addIssue({
			code: "custom",
			path: ["confirmPassword"],
			message: "Passwords do not match",
		});
	}
})
