"use client"

import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { signIn } from "@/lib/auth-client";
import { cn } from "@/lib/utils";
import { SignInFormSchema } from "@/schema/sign-in-form";
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
				await signIn.email({
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

				<Button type="submit">Sign up</Button>
			</form>

			<Separator className={cn("relative my-6")}>
				<span className={cn("absolute top-1/2 left-1/2 px-3 bg-background -translate-y-1/2 -translate-x-1/2")}>or</span>
			</Separator>

			<div>
				<Button className={cn("block w-full")}>
					<Link href="/create-account">
						Create Account
					</Link>
				</Button>
			</div>
		</div>
	);
}
