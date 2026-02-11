import { AuthCard } from "@/components/auth/AuthCard";

export default function EmailVerificationPage() {
	return (
		<div className="flex min-h-[calc(100vh-8rem)] items-center justify-center">
			<AuthCard>
				<div className="flex flex-col gap-4 text-center">
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
							<path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
						</svg>
					</div>
					<h2 className="text-2xl font-bold">Check Your Email</h2>
					<p className="text-muted-foreground">
						We&apos;ve sent a verification email to you. Please follow the instructions to verify your account and sign in.
					</p>
				</div>
			</AuthCard>
		</div>
	);
}
