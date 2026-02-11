import { twoFactorClient } from "better-auth/plugins";
import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
	baseURL: "http://localhost:3000",
	plugins: [
		twoFactorClient({
			onTwoFactorRedirect() {
				// Redirect to 2FA verification page when 2FA is required
				window.location.href = "/verify-2fa";
			},
		})
	]
})
