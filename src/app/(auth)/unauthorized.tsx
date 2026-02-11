import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function UnauthorizedPage() {
	return (
		<main>
			<h1>401 - Unauthorized</h1>
			<p>Please log in to access this page.</p>
			<Button variant="link">
				<Link href="/">
					Log in
				</Link>
			</Button>
		</main>
	)
}
