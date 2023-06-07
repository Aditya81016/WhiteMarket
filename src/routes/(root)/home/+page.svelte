<script lang="ts">
	import { goto } from '$app/navigation';
	import { signOutUser } from '$lib/backend/users';
	import { auth } from '$lib/modules/firebase';
	import url from '$lib/modules/url';
	import { onAuthStateChanged } from 'firebase/auth';
	import { onMount } from 'svelte';

	onMount(() => {
		onAuthStateChanged(auth, (user) => {
			if (user) {
			} else {
				goto(url.root);
			}
		});
	});
</script>

<button class="btn btn-dark" id="Home-SignOut-Button" on:click={signOutUser}>Sign Out</button>
