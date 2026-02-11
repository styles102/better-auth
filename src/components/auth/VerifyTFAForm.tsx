"use client"

import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { useForm } from "@tanstack/react-form-nextjs";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function VerifyTFAForm() {
	const router = useRouter();

	const form = useForm({
		defaultValues: {
			code: ""
		},
		onSubmit: async ({ value }) => {
			const { code } = value;
			try {
				const { error } = await authClient.twoFactor.verifyTotp({
					code
				});

				if(error) {
					throw Error(error.message ?? error.statusText, { cause: error.status });
				}

				toast.success("Successfully verified!");
				router.push("/dashboard");
			}
			catch (err) {
				console.error(err);
				toast.error("Invalid code. Please try again.");
			}
		}
	});

	return (
		<div className="flex flex-col gap-4 max-w-xl w-full">
			<h2 className="text-2xl font-bold">Two-Factor Authentication</h2>
			<p className="text-gray-600">Enter the 6-digit code from your authenticator app</p>

			<form
				onSubmit={(e) => {
					e.preventDefault()
					e.stopPropagation()
					form.handleSubmit()
				}}
				className="flex flex-col gap-4"
			>
				<FieldGroup>
					<form.Field name="code">
						{(field) => {
							const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
							return (
								<Field>
									<FieldLabel htmlFor={field.name}>Verification Code:</FieldLabel>
									<Input
										type="text"
										id={field.name}
										name={field.name}
										placeholder="000000"
										maxLength={6}
										autoComplete="one-time-code"
										autoFocus
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

				<Button type="submit">Verify</Button>

				<div className="text-sm text-gray-600">
					<p>Lost access to your authenticator app?</p>
					<button
						type="button"
						className="text-blue-600 hover:underline"
						onClick={() => {
							// Handle backup code flow
							toast.info("Use one of your backup codes instead");
						}}
					>
						Use backup code
					</button>
				</div>
			</form>
		</div>
	);
}