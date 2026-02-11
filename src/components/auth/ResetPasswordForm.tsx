"use client"

import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { requestPasswordReset } from "@/lib/auth-client";
import { cn } from "@/lib/utils";
import { useForm } from "@tanstack/react-form-nextjs";
import Link from "next/link";
import { toast } from "sonner";
import z from "zod";

export function ResetPasswordForm() {
	const form = useForm({
		defaultValues: {
			email: ""
		},
		validators: {
			onSubmit: z.object({ email: z.email().min(1, "Email is required")})
		},
		onSubmit: async ({ value }) => {
			const { email } = value;
			try {
				await requestPasswordReset({
					email,
					redirectTo: "/create-password",
				});
			}
			catch (err) {
				console.error(err);
				toast.error("There was a problem resetting your password, please try again");
			}
		}
	});

	return (
		<div className="flex flex-col gap-4 max-w-xl w-full">
			<h2 className="text-2xl font-bold">Sign In</h2>
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

			<Separator className={cn("relative my-6")}>
				<span className={cn("absolute top-1/2 left-1/2 px-3 bg-background -translate-y-1/2 -translate-x-1/2")}>or</span>
			</Separator>

			<div>
				<Button className={cn("block w-full")}>
					<Link href="/create-account">
						Back to sign in
					</Link>
				</Button>
			</div>
		</div>
	);
}
