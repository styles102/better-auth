import z from "zod";
import { EmailSchema, PasswordSchema } from "./base-schemas";

export const CreatePasswordFormSchema = z.object({
	password: PasswordSchema,
	confirmPassword: z.string()
});

export const ResetPasswordFormSchema = z.object({
	email: EmailSchema
})

export const SignInFormSchema = z.object({
	email: EmailSchema,
	password: PasswordSchema
})

export const SignUpFormSchema = z.object({
	name: z.string().min(1, "A name is required"),
	email: EmailSchema,
	password: PasswordSchema,
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
