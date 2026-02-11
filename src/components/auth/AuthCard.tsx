import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface AuthCardProps {
	children: ReactNode;
	className?: string;
}

export function AuthCard({ children, className }: AuthCardProps) {
	return (
		<div className={cn(
			"w-full max-w-md mx-auto",
			"bg-card border border-border rounded-lg",
			"p-8 shadow-sm",
			className
		)}>
			{children}
		</div>
	);
}