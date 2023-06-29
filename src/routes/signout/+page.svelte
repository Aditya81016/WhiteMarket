<script lang="ts">
	import LoadingScreen from '$lib/assets/LoadingScreen.svelte';
	import { signOutUser } from '$lib/backend/users';
	import { onMount } from 'svelte';
	import url from '$lib/modules/url';
	import { currentPage, userData } from '$lib/modules/store';

	$currentPage = 'Sign Out';
	let response: any = 'Signing Out...';
	let isLoading = true;
	onMount(async () => {
		await signOutUser();
		$userData = {};
		response = 'Successfully signed out';
		isLoading = false;
	});
</script>

<div id="Sign-Out">
	<h1>{response}</h1>
	{#if isLoading}
		<div id="Loading">
			<LoadingScreen />
		</div>
	{:else}
		<a href={url.root}>
			<button class="btn btn-dark">Go back to root page</button>
		</a>
	{/if}
</div>

<style lang="scss">
	@import '$lib/scss/mixins.scss';

	#Sign-Out {
		@include flex($direction: column, $row-gap: 1rem);
		height: 100%;
	}

	#Loading {
		@include flex;
	}
</style>
