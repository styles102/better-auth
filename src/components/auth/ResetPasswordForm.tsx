"use client"

import { AuthCard } from "@/components/auth/AuthCard";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { ResetPasswordFormSchema } from "@/schema/auth";
import { useForm } from "@tanstack/react-form-nextjs";
import Link from "next/link";
import { toast } from "sonner";

export function ResetPasswordForm() {
	const form = useForm({
		defaultValues: {
			email: ""
		},
		validators: {
			onSubmit: ResetPasswordFormSchema
		},
		onSubmit: async ({ value }) => {
			const { email } = value;
			try {
				await authClient.requestPasswordReset({
					email,
					redirectTo: "/create-password",
				});
				toast.success("Password reset email sent! Check your inbox.");
			}
			catch (err) {
				console.error(err);
				toast.error("There was a problem resetting your password, please try again");
			}
		}
	});

	return (
		<AuthCard>
			<div className="flex flex-col gap-6">
				<div className="flex flex-col gap-2 text-center">
					<h2 className="text-2xl font-bold">Reset Password</h2>
					<p className="text-sm text-muted-foreground">
						Enter your email address and we&apos;ll send you a link to reset your password
					</p>
				</div>

				<form
					onSubmit={(e) => {
						e.preventDefault()
						e.stopPropagation()
						form.handleSubmit()
					}}
					className="flex flex-col gap-4"
				>
					<FieldGroup>
						<form.Field name="email">
							{(field) => {
								const isInvalid =	field.state.meta.isTouched && !field.state.meta.isValid;
								return (
									<Field>
										<FieldLabel htmlFor={field.name}>Email:</FieldLabel>
										<Input
											type="email"
											id={field.name}
											name={field.name}
											placeholder="you@example.com"
											value={field.state.value}
											onBlur={field.handleBlur}
											onChange={(e) => field.handleChange(e.target.value)}
										/>
										{isInvalid && (
											<FieldError errors={field.state.meta.errors} />
										)}
									</Field>
								)
							}}
						</form.Field>
					</FieldGroup>

					<Button type="submit">Send Reset Link</Button>
				</form>

				<div className="text-center text-sm text-muted-foreground">
					Remember your password?{" "}
					<Link href="/" className="text-primary hover:underline font-medium">
						Sign in
					</Link>
				</div>
			</div>
		</AuthCard>
	);
}
