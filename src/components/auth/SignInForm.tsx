"use client"

import { AuthCard } from "@/components/auth/AuthCard";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { authClient } from "@/lib/auth-client";
import { cn } from "@/lib/utils";
import { SignInFormSchema } from "@/schema/auth";
import { useForm } from "@tanstack/react-form-nextjs";
import Link from "next/link";
import { toast } from "sonner";

export function SignInForm() {
	const form = useForm({
		defaultValues: {
			email: "",
			password: ""
		},
		validators: {
			onSubmit: SignInFormSchema
		},
		onSubmit: async ({ value }) => {
			const { email, password } = value;
			try {
				await authClient.signIn.email({
					email,
					password,
					callbackURL: "/dashboard",
				});
			}
			catch (err) {
				console.error(err);
				toast.error("Unable to sign you in, please try again");
			}
		}
	});

	return (
		<AuthCard>
			<div className="flex flex-col gap-6">
				<div className="flex flex-col gap-2 text-center">
					<h2 className="text-2xl font-bold">Sign In</h2>
					<p className="text-sm text-muted-foreground">
						Enter your credentials to access your account
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

					<Button type="button" variant="link" className={cn("self-end")}>
						<Link href="/reset-password">
							Forgotten Password?
						</Link>
					</Button>

					<Button type="submit">Sign In</Button>
				</form>

				<Separator className={cn("relative my-2")}>
					<span className={cn("absolute top-1/2 left-1/2 px-3 bg-card -translate-y-1/2 -translate-x-1/2 text-sm text-muted-foreground")}>
						or
					</span>
				</Separator>

				<Button variant="outline" className={cn("w-full")} asChild>
					<Link href="/create-account">
						Create Account
					</Link>
				</Button>
			</div>
		</AuthCard>
	);
}
