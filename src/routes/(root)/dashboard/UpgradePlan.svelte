<script>
	import LoadingScreen from '$lib/assets/LoadingScreen.svelte';
	import { updateUserData } from '$lib/backend/users';
	import { auth, db } from '$lib/modules/firebase';
	import { userData } from '$lib/modules/store';
	import MarketingSvg from '$lib/svgs/MarketingSVG.svelte';
	import { doc, updateDoc } from 'firebase/firestore';

	let isLoading = false;

	async function upgradePlan() {
		isLoading = true;
		let response = updateUserData({ plan: 'Seller' });
		console.log(response);
		isLoading = false;
	}
</script>

<main>
	<div class="svg">
		<MarketingSvg />
	</div>
	<section>
		<h4 class="text">You need to upgrade to seller plan to see dashboard</h4>
		<button class="btn btn-dark" id="Upgrade-Plan-Button" on:click={upgradePlan}>
			{#if isLoading}
				<LoadingScreen size="sm" />
			{:else}
				Upgrade Plan
			{/if}
		</button>
	</section>
</main>

<style lang="scss">
	section {
		transform: translate(25rem, -8rem);
		max-width: 22rem;
		text-align: right;
	}

	@media screen and (max-width: 800px) {
		.svg {
			display: none;
		}

		section {
			transform: translate(0px, 0px);
			text-align: center;
			width: 100%;
		}
	}
</style>
