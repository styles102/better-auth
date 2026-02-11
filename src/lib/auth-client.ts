import { createAuthClient } from "better-auth/react"
export const { signIn, signUp, requestPasswordReset, resetPassword, useSession } = createAuthClient({
	baseURL: "http://localhost:3000"
})
