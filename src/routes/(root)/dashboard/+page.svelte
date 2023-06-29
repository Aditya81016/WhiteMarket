<script lang="ts">
	import { onMount } from 'svelte';
	import UpgradePlan from './UpgradePlan.svelte';
	import type { DocumentData } from 'firebase/firestore';
	import Dashboard from './Dashboard.svelte';
	import LoadingScreen from '$lib/assets/LoadingScreen.svelte';
	import { currentPage, userData } from '$lib/modules/store';

	$currentPage = 'Dashboard';
	onMount(() => {});
</script>

<Dashboard />

<!-- 
{#if $userData?.plan === undefined}
	<LoadingScreen />
{:else if $userData.plan === 'Basic'}
	<UpgradePlan />
{:else}
	<Dashboard />
{/if} -->
