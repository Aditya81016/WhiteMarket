<script lang="ts">
	import '../app.postcss';
	import values from '$lib/modules/values';

	import '../style.scss';

	import { auth, db } from '$lib/modules/firebase';
	import { onAuthStateChanged } from 'firebase/auth';
	import { onMount } from 'svelte';
	import { userData } from '$lib/modules/store';
	import { doc, onSnapshot } from 'firebase/firestore';

	onMount(() => {
		let unsubscribe: any;
		onAuthStateChanged(auth, async (user) => {
			if (user) {
				unsubscribe = onSnapshot(doc(db, 'users', user.uid), (snapshot: any) => {
					if (snapshot.exists) {
						$userData = snapshot.data();
						console.log($userData);
					} else {
						console.log('else', snapshot);
						// Document doesn't exist
					}
				});
			}
		});
		// Return an unsubscribe function to stop listening when the component is unmounted
		return unsubscribe;
	});
</script>

<div id="App" class="theme-{values.theme}" data-bs-theme={values.theme}>
	<slot />
</div>

<style lang="scss">
</style>
