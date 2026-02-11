"use client"

import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { SignUpFormSchema } from "@/schema/auth";
import { useForm } from "@tanstack/react-form-nextjs";
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
		<div className="flex flex-col gap-4 max-w-xl w-full">
			<h2 className="text-2xl font-bold">Sign Up</h2>
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

				<Button type="submit">Sign up</Button>
			</form>
		</div>
	);
}
