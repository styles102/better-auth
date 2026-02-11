"use client"

import { AuthCard } from "@/components/auth/AuthCard";
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
		<AuthCard>
			<div className="flex flex-col gap-6">
				<div className="flex flex-col gap-2 text-center">
					<div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
						<svg
							className="w-6 h-6 text-primary"
							fill="none"
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
						</svg>
					</div>
					<h2 className="text-2xl font-bold">Two-Factor Authentication</h2>
					<p className="text-sm text-muted-foreground">
						Enter the 6-digit code from your authenticator app
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
				</form>

				<div className="text-center text-sm text-muted-foreground">
					<p>Lost access to your authenticator app?</p>
					<button
						type="button"
						className="text-primary hover:underline font-medium"
						onClick={() => {
							// Handle backup code flow
							toast.info("Use one of your backup codes instead");
						}}
					>
						Use backup code
					</button>
				</div>
			</div>
		</AuthCard>
	);
}
