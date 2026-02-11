"use client"

import { AuthCard } from "@/components/auth/AuthCard";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { SignUpFormSchema } from "@/schema/auth";
import { useForm } from "@tanstack/react-form-nextjs";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function SignUpForm() {
	const router = useRouter();

	const form = useForm({
		defaultValues: {
			email: "",
			name: "",
			password: "",
			confirmPassword: ""
		},
		validators: {
			onBlur: SignUpFormSchema,
			onChange: SignUpFormSchema,
			onSubmit: SignUpFormSchema
		},
		onSubmit: async ({ value }) => {
			const { name, email, password } = value;
			try {
				await authClient.signUp.email({
					name,
					email,
					password,
					callbackURL: "/dashboard"
				});
				
				router.push("/email-verification");
			}
			catch (err) {
				console.error(err);
				toast.error("Unable to sign you up, please try again");
			}
		}
	});

	return (
		<AuthCard>
			<div className="flex flex-col gap-6">
				<div className="flex flex-col gap-2 text-center">
					<h2 className="text-2xl font-bold">Create Account</h2>
					<p className="text-sm text-muted-foreground">
						Enter your information to get started
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
					<form.Field name="name">
						{(field) => {
							const isInvalid =	field.state.meta.isTouched && !field.state.meta.isValid;
							return (
								<Field data-invalid={isInvalid}>
									<FieldLabel htmlFor={field.name}>Name:</FieldLabel>
									<Input
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

				<Button type="submit">Sign Up</Button>
				</form>

				<div className="text-center text-sm text-muted-foreground">
					Already have an account?{" "}
					<Link href="/" className="text-primary hover:underline font-medium">
						Sign in
					</Link>
				</div>
			</div>
		</AuthCard>
	);
}
