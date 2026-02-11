import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { unauthorized } from "next/navigation";

export default async function Dashboard() {
	const session = await auth.api.getSession({
		headers: await headers()
	})
	
	if(!session) {
		unauthorized();
	}

	return (
		<div>
			<h1>Welcome to the Dashboard</h1>
			<p>Hi, {session!.user.name}</p>
		</div>
	)
}
