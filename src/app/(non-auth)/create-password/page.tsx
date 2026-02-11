import { CreatePasswordForm } from "@/components/auth/CreatePasswordForm";
import { cn } from "@/lib/utils";

export default function CreateAccountPage() {
	return (
		<div className={cn("place-items-center")}>
			<CreatePasswordForm />
		</div>
	)
}
