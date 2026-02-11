import { SignInForm } from "@/components/auth/SignInForm";

export default function Home() {
	return (
		<div className="flex min-h-[calc(100vh-8rem)] items-center justify-center">
			<SignInForm />
		</div>
	);
}
