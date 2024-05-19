import { defineConfig } from 'drizzle-kit';
export default defineConfig({
	schema: './src/lib/server/db/schema.ts',
	dialect: 'postgresql',
	dbCredentials: {
		url: process.env.AUTH_DRIZZLE_URL ?? ''
	},
	verbose: true,
	strict: true
});
