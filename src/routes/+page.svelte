<script lang="ts">
	import { onMount } from 'svelte';
	import j$ from 'jquery';
	import { goto } from '$app/navigation';
	import url from '$lib/modules/url';
	import { onAuthStateChanged } from 'firebase/auth';
	import { auth } from '$lib/modules/firebase';

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
			goto(url.auth);
		});
	});
</script>

<button type="button" class="btn btn-light" id="forward-button">{forwardButtonText}</button>
