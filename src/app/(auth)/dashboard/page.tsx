import { EnableTFAForm } from "@/components/auth/EnableTFAForm";
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { unauthorized } from "next/navigation";
import { signOut } from "./sign-out";

export default async function Dashboard() {
	const session = await auth.api.getSession({
		headers: await headers()
	});
	
	if(!session) {
		unauthorized();
	}

	return (
		<div className="container mx-auto px-4 py-8 max-w-6xl">
			<div className="flex items-center justify-between mb-8 pb-6 border-b border-border">
				<div>
					<h1 className="text-3xl font-bold">Dashboard</h1>
					<p className="text-muted-foreground mt-1">
						Welcome back, {session!.user.name}
					</p>
				</div>
				<form action={signOut}>
					<Button type="submit" variant="outline">
						Sign Out
					</Button>
				</form>
			</div>
			
			<div className="grid gap-6 md:grid-cols-2 mb-8">
				<div className="bg-card border border-border rounded-lg p-6">
					<h2 className="text-lg font-semibold mb-4">Account Information</h2>
					<div className="space-y-3">
						<div>
							<p className="text-sm text-muted-foreground">Name</p>
							<p className="font-medium">{session!.user.name}</p>
						</div>
						<div>
							<p className="text-sm text-muted-foreground">Email</p>
							<p className="font-medium">{session!.user.email}</p>
						</div>
						<div>
							<p className="text-sm text-muted-foreground">Email Verified</p>
							<div className="flex items-center gap-2">
								{session!.user.emailVerified ? (
									<>
										<svg className="w-4 h-4 text-green-600" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
											<path d="M5 13l4 4L19 7" />
										</svg>
										<span className="text-green-600 font-medium">Verified</span>
									</>
								) : (
									<>
										<svg className="w-4 h-4 text-amber-600" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
											<path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
										</svg>
										<span className="text-amber-600 font-medium">Not Verified</span>
									</>
								)}
							</div>
						</div>
					</div>
				</div>

				<div className="bg-card border border-border rounded-lg p-6">
					<h2 className="text-lg font-semibold mb-4">Security</h2>
					<div className="space-y-3">
						<div>
							<p className="text-sm text-muted-foreground">Two-Factor Authentication</p>
							<div className="flex items-center gap-2">
								{session!.user.twoFactorEnabled ? (
									<>
										<svg className="w-4 h-4 text-green-600" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
											<path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
										</svg>
										<span className="text-green-600 font-medium">Enabled</span>
									</>
								) : (
									<>
										<svg className="w-4 h-4 text-amber-600" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
											<path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
										</svg>
										<span className="text-amber-600 font-medium">Disabled</span>
									</>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
			
			{!session.user.twoFactorEnabled && (
				<div className="mb-8">
					<div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900 rounded-lg p-4 mb-6">
						<div className="flex gap-3">
							<svg className="w-5 h-5 text-amber-600 dark:text-amber-500 shrink-0 mt-0.5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
								<path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
							</svg>
							<div>
								<h3 className="font-semibold text-amber-900 dark:text-amber-100">Secure Your Account</h3>
								<p className="text-sm text-amber-800 dark:text-amber-200 mt-1">
									Two-factor authentication adds an extra layer of security to your account. Enable it below to protect your data.
								</p>
							</div>
						</div>
					</div>
					<EnableTFAForm />
				</div>
			)}

			{session.user.twoFactorEnabled && (
				<div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-900 rounded-lg p-6">
					<div className="flex gap-3">
						<svg className="w-6 h-6 text-green-600 dark:text-green-500 shrink-0" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
							<path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
						</svg>
						<div>
							<h3 className="font-semibold text-green-900 dark:text-green-100">Account Secured</h3>
							<p className="text-sm text-green-800 dark:text-green-200 mt-1">
								Your account is protected with two-factor authentication. Great job keeping your data safe!
							</p>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
