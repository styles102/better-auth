"use client"

import { AuthCard } from "@/components/auth/AuthCard";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { CreatePasswordFormSchema } from "@/schema/auth";
import { useForm } from "@tanstack/react-form-nextjs";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";

export function CreatePasswordForm() {
	const searchParams = useSearchParams();
	const token = searchParams.get("token");
	const router = useRouter();

	const form = useForm({
		defaultValues: {
			password: "",
			confirmPassword: ""
		},
		validators: {
			onSubmit: CreatePasswordFormSchema
		},
		onSubmit: async ({ value }) => {
			const { password } = value;
			try {
				const { error } = await authClient.resetPassword({
					newPassword: password,
					token: token!
				});

				if(error) {
					throw Error(error.message ?? error.statusText, { cause: error.status });
				}

				toast.success("Password reset successfully!");
				router.push("/");
			}
			catch (err) {
				console.error(err);
				toast.error("There was a problem resetting your password, please try again");
			}
		}
	});

	if(token === "" || !token) {
		return (
			<AuthCard>
				<div className="flex flex-col gap-4 text-center">
					<div className="mx-auto w-12 h-12 bg-destructive/10 rounded-full flex items-center justify-center">
						<svg
							className="w-6 h-6 text-destructive"
							fill="none"
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
						</svg>
					</div>
					<h2 className="text-2xl font-bold">Invalid or Expired Token</h2>
					<p className="text-muted-foreground">
						This password reset link has expired or is invalid. Please request a new one.
					</p>
					<Button variant="outline" asChild>
						<Link href="/reset-password">Request New Link</Link>
					</Button>
				</div>
			</AuthCard>
		)
	}

	return (
		<AuthCard>
			<div className="flex flex-col gap-6">
				<div className="flex flex-col gap-2 text-center">
					<h2 className="text-2xl font-bold">Create New Password</h2>
					<p className="text-sm text-muted-foreground">
						Enter your new password below
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
						<form.Field name="password">
							{(field) => {
								const isInvalid =	field.state.meta.isTouched && !field.state.meta.isValid;
								return (
									<Field>
										<FieldLabel htmlFor={field.name}>New Password:</FieldLabel>
										<Input
											type="password"
											id={field.name}
											name={field.name}
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

					<FieldGroup>
						<form.Field name="confirmPassword">
							{(field) => {
								const isInvalid =	field.state.meta.isTouched && !field.state.meta.isValid;
								return (
									<Field>
										<FieldLabel htmlFor={field.name}>Confirm New Password:</FieldLabel>
										<Input
											type="password"
											id={field.name}
											name={field.name}
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

					<Button type="submit">Reset Password</Button>
				</form>

				<div className="text-center text-sm text-muted-foreground">
					<Link href="/" className="text-primary hover:underline font-medium">
						Back to sign in
					</Link>
				</div>
			</div>
		</AuthCard>
	);
}
