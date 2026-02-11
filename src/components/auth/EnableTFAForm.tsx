"use client"

import { AuthCard } from "@/components/auth/AuthCard";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { EnableTwoFactorAuthFormSchema } from "@/schema/auth";
import { useForm } from "@tanstack/react-form-nextjs";
import { useState } from "react";
import QRCode from "react-qr-code";
import { toast } from "sonner";

export function EnableTFAForm() {
	const [totpUri, setTotpUri] = useState<string>(null!);
	const [backupCodes, setBackupCodes] = useState<string[]>([]);

	const form = useForm({
		defaultValues: {
			password: ""
		},
		validators: {
			onSubmit: EnableTwoFactorAuthFormSchema
		},
		onSubmit: async ({ value }) => {
			const { password } = value;
			try {
				const { data, error } = await authClient.twoFactor.enable({
					password,
					issuer: process.env.APP_NAME!
				});

				if(error) {
					throw Error(error.message ?? error.statusText, { cause: error.status });
				}

				setTotpUri(data.totpURI);
				setBackupCodes(data.backupCodes);
			}
			catch (err) {
				console.error(err);
				toast.error("There was a problem enabling 2FA, please try again");
			}
		}
	});

	const verifyForm = useForm({
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

				toast.success("2FA enabled successfully!");
				window.location.reload();
			}
			catch (err) {
				console.error(err);
				toast.error("Invalid code. Please try again.");
			}
		}
	});

	if(totpUri && backupCodes.length > 0) {
		return (
			<AuthCard className="max-w-2xl">
				<div className="flex flex-col gap-6">
					<div className="flex flex-col gap-2 text-center">
						<h2 className="text-2xl font-bold">Verify 2FA Setup</h2>
						<p className="text-sm text-muted-foreground">
							Complete the setup by scanning the QR code and entering a verification code
						</p>
					</div>

					<div className="flex flex-col gap-4 p-4 border border-border rounded-lg bg-muted/30">
						<div className="flex items-center gap-2">
							<div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-semibold">
								1
							</div>
							<h3 className="font-semibold">Scan the QR code</h3>
						</div>
						<p className="text-sm text-muted-foreground">
							Open your authenticator app and scan this QR code
						</p>
						<div className="bg-white p-4 rounded-lg inline-block self-start">
							<QRCode value={totpUri} size={180} />
						</div>
						<p className="text-sm text-muted-foreground">
							Or enter this code manually: <code className="bg-muted px-2 py-1 rounded font-mono text-xs">{totpUri}</code>
						</p>
					</div>

					<div className="flex flex-col gap-4 p-4 border border-border rounded-lg bg-muted/30">
						<h3 className="font-semibold">Backup Codes</h3>
						<p className="text-sm text-muted-foreground">
							Save these codes securely. You can use them to recover your account if you lose access to your authenticator app.
						</p>
						<ul className="grid grid-cols-2 gap-2">
							{backupCodes.map((code, index) =>
								<li key={index} className="font-mono bg-card px-3 py-2 rounded text-sm border border-border">
									{code}
								</li>
							)}
						</ul>
					</div>

					<form
						onSubmit={(e) => {
							e.preventDefault()
							e.stopPropagation()
							verifyForm.handleSubmit()
						}}
						className="flex flex-col gap-4"
					>
						<div className="flex flex-col gap-4 p-4 border border-border rounded-lg bg-muted/30">
							<div className="flex items-center gap-2">
								<div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-semibold">
									2
								</div>
								<h3 className="font-semibold">Enter verification code</h3>
							</div>
							<FieldGroup>
								<verifyForm.Field name="code">
									{(field) => {
										const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
										return (
											<Field>
												<FieldLabel htmlFor={field.name}>
													Enter the 6-digit code from your authenticator app
												</FieldLabel>
												<Input
													type="text"
													id={field.name}
													name={field.name}
													placeholder="000000"
													maxLength={6}
													autoComplete="one-time-code"
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
								</verifyForm.Field>
							</FieldGroup>
						</div>

						<Button type="submit" size="lg">Verify and Enable 2FA</Button>
					</form>
				</div>
			</AuthCard>
		)
	}

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
					<h2 className="text-2xl font-bold">Enable Two-Factor Authentication</h2>
					<p className="text-sm text-muted-foreground">
						Add an extra layer of security to your account
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
										<FieldLabel htmlFor={field.name}>
											Confirm your password to continue:
										</FieldLabel>
										<Input
											type="password"
											id={field.name}
											name={field.name}
											placeholder="Enter your password"
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

					<Button type="submit">Continue</Button>
				</form>
			</div>
		</AuthCard>
	);
}
