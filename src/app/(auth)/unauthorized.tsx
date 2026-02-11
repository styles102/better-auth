import { AuthCard } from "@/components/auth/AuthCard";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function UnauthorizedPage() {
	return (
		<div className="flex min-h-[calc(100vh-8rem)] items-center justify-center p-4">
			<AuthCard>
				<div className="flex flex-col gap-6 text-center">
					<div className="mx-auto w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center">
						<svg
							className="w-8 h-8 text-destructive"
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

					<div className="flex flex-col gap-2">
						<h1 className="text-3xl font-bold">401 - Unauthorized</h1>
						<p className="text-muted-foreground">
							You need to be signed in to access this page.
						</p>
					</div>

					<div className="flex flex-col gap-3 pt-2">
						<Button asChild size="lg">
							<Link href="/">
								Sign In to Continue
							</Link>
						</Button>
						<Button variant="outline" asChild>
							<Link href="/create-account">
								Create an Account
							</Link>
						</Button>
					</div>

					<div className="text-sm text-muted-foreground pt-2 border-t border-border">
						<p>
							If you believe this is an error, please{" "}
							<a href="mailto:support@example.com" className="text-primary hover:underline font-medium">
								contact support
							</a>
						</p>
					</div>
				</div>
			</AuthCard>
		</div>
	);
}
