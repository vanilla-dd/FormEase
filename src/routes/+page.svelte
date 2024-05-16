<script lang="ts">
	import { page } from '$app/stores';
	import { SignIn, SignOut } from '@auth/sveltekit/components';
</script>

<SignIn provider="github" signInPage="signin" />

<SignOut />

{JSON.stringify($page.data.session?.user)}
