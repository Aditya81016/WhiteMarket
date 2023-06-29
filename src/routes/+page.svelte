<script lang="ts">
	import { onMount } from 'svelte';
	import j$ from 'jquery';
	import { goto } from '$app/navigation';
	import url from '$lib/modules/url';
	import { onAuthStateChanged } from 'firebase/auth';
	import { auth } from '$lib/modules/firebase';
	import { currentPage } from '$lib/modules/store';

	$currentPage = 'Root';
	let forwardButtonText = 'Sign Up';

	onMount(() => {
		onAuthStateChanged(auth, (user) => {
			if (user) {
				forwardButtonText = 'Continue to App';
			} else {
				forwardButtonText = 'Sign Up';
			}
		});
		j$('#forward-button').on('click', () => {
			goto(url.login);
		});
	});
</script>

<button type="button" id="forward-button">{forwardButtonText}</button>

<style lang="scss">
	#forward-button {
		@apply bg-slate-900 text-slate-100 px-5 py-3 rounded-md hover:scale-105;
	}
</style>
