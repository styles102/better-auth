import stylistic from "@stylistic/eslint-plugin";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import { defineConfig, globalIgnores } from "eslint/config";

const eslintConfig = defineConfig([
	...nextVitals,
	...nextTs,
	// Override default ignores of eslint-config-next.
	globalIgnores([
		// Default ignores of eslint-config-next:
		".next/**",
		"out/**",
		"build/**",
		"next-env.d.ts",
	]),
	{
		plugins: {
			"@stylistic": stylistic,
		},
		rules: {
			"@stylistic/no-extra-semi": "error",
			"@stylistic/indent": ["error", "tab"],
			"@stylistic/quotes": ["error", "double"],
		},
	},
]);

export default eslintConfig;
