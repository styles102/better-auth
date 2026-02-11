import { SignInForm } from "@/components/auth/SignInForm";
import { cn } from "@/lib/utils";

export default function Home() {
	return (
		<div className={cn("place-items-center")}>
			<SignInForm />
		</div>
	);
}
