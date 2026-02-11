"use client"

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
				toast.error("There was a problem resetting your password, please try again");
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
				// Optionally redirect or refresh
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
			<div className="flex flex-col gap-4 max-w-xl w-full">
				<h2 className="text-2xl font-bold">Verify 2FA Setup</h2>

				<div className="flex flex-col gap-4 p-4 border rounded">
					<p>Step 1: Scan the QR code with your authenticator app</p>
					<div className="bg-white p-4 rounded inline-block self-start">
						<QRCode value={totpUri} />
					</div>
					<p className="text-sm text-gray-600">Or enter this code manually: <code className="bg-gray-100 px-2 py-1 rounded">{totpUri}</code></p>
				</div>

				<div className="flex flex-col gap-4 p-4 border rounded">
					<h4 className="font-semibold">Backup Codes</h4>
					<p className="text-sm">Save these codes securely. You can use them to recover your account if you lose access to your authenticator app.</p>
					<ul className="grid grid-cols-2 gap-2">
						{backupCodes.map((code, index) =>
							<li key={index} className="font-mono bg-gray-100 px-3 py-2 rounded text-sm">
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
					<FieldGroup>
						<verifyForm.Field name="code">
							{(field) => {
								const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
								return (
									<Field>
										<FieldLabel htmlFor={field.name}>
											Step 2: Enter the 6-digit code from your authenticator app
										</FieldLabel>
										<Input
											type="text"
											id={field.name}
											name={field.name}
											placeholder="000000"
											maxLength={6}
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

					<Button type="submit">Verify and Enable 2FA</Button>
				</form>
			</div>
		)
	}

	return (
		<div className="flex flex-col gap-4 max-w-xl w-full">
			<h2 className="text-2xl font-bold">Enable 2FA</h2>
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

				<Button type="submit">Enable 2FA</Button>
			</form>
		</div>
	);
}
