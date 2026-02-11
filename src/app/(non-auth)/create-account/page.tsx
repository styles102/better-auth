import { SignUpForm } from "@/components/auth/SignUpForm";
import { cn } from "@/lib/utils";

export default function CreateAccountPage() {
	return (
		<div className={cn("place-items-center")}>
			<SignUpForm />
		</div>
	)
}
