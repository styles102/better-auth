"use client"

import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { resetPassword } from "@/lib/auth-client";
import { cn } from "@/lib/utils";
import { useForm } from "@tanstack/react-form-nextjs";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import z from "zod";

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
			onSubmit: z.object({
				password: z.string()
					.min(8, "Password must be at least 8 characters")
					.regex(/[0-9]/, "Password must contain at least one number")
					.regex(/[A-Z]/, "Password must contain at least one uppercase letter")
					.regex(
						/[!@#$%^&*(),.?":{}|<>_\-+=~[\]\\;/]/,
						"Password must contain at least one special character"
					),
				confirmPassword: z.string()
			})
		},
		onSubmit: async ({ value }) => {
			const { password } = value;
			try {
				const { error } = await resetPassword({
					newPassword: password,
					token: token!
				});

				if(error) {
					throw Error(error.message ?? error.statusText, { cause: error.status });
				}

				router.push("/");
			}
			catch (err) {
				console.error(err);
				toast.error("There was a problem resetting your password, please try again");
			}
		}
	});

	if(token === "") {
		return (
			<>
				<h1>Token has expired.</h1>
				<Button variant="link">
					<Link href="/">Back to Sign In</Link>
				</Button>
			</>
		)
	}

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
					<form.Field name="password">
						{(field) => {
							const isInvalid =	field.state.meta.isTouched && !field.state.meta.isValid;
							return (
								<Field>
									<FieldLabel htmlFor={field.name}>Password:</FieldLabel>
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
									<FieldLabel htmlFor={field.name}>Confirm Password:</FieldLabel>
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
