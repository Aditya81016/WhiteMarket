<script lang="ts">
	import { goto } from '$app/navigation';
	import { signOutUser } from '$lib/backend/users';
	import { auth } from '$lib/modules/firebase';
	import { currentPage } from '$lib/modules/store';
	import url from '$lib/modules/url';
	import { onAuthStateChanged } from 'firebase/auth';
	import { onMount } from 'svelte';

	$currentPage = 'White Market';

	onMount(() => {
		onAuthStateChanged(auth, (user) => {
			if (user) {
			} else {
				goto(url.root);
			}
		});
	});
</script>

<a href={url.signout}>
	<button>sign out</button>
</a>

<style lang="scss">
	button {
		@apply px-5 py-3 bg-slate-950 text-slate-50 hover:scale-110 rounded-lg;
	}
</style>
