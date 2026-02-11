import { ResetPasswordForm } from "@/components/auth/ResetPasswordForm";
import { cn } from "@/lib/utils";

export default function ResetPasswordPage() {
	return (
		<div className={cn("place-items-center")}>
			<ResetPasswordForm />
		</div>
	)
}
