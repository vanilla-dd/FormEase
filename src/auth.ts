import { SvelteKitAuth } from '@auth/sveltekit';
import { DrizzleAdapter } from '@auth/drizzle-adapter';
import { db } from '$lib/server/db';
import github from '@auth/sveltekit/providers/github';
import { AUTH_GITHUB_ID, AUTH_GITHUB_SECRET } from '$env/static/private';

export const { handle, signIn, signOut } = SvelteKitAuth({
	adapter: DrizzleAdapter(db),
	providers: [github({ clientId: AUTH_GITHUB_ID, clientSecret: AUTH_GITHUB_SECRET })],
	pages: { signIn: '/signin' },
	callbacks: {
		session({ session, user }) {
			session.user.id = user.id;
			return session;
		}
	}
});
