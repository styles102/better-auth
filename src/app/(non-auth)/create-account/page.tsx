import { SignUpForm } from "@/components/sign-in-form";
import { cn } from "@/lib/utils";

export default function CreateAccountPage() {
	return (
		<div className={cn("place-items-center")}>
			<SignUpForm />
		</div>
	)
}
