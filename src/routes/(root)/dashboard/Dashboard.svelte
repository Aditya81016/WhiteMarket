<script lang="ts">
	import Chart from './Chart.svelte';
</script>

<div id="Dashboard">
	<h3>Dashboard</h3>
	<Chart id="Product-Line-Chart" type="line" />
	<div class="col">
		<div id="Products">
			<header>
				<h4 class="title">Products</h4>
				<button class="btn btn-dark btn-sm">Add +</button>
			</header>
			<main>
				<div class="center">Its empty...</div>
			</main>
		</div>
		<Chart id="Product-Pie-Chart" type="pie" />
	</div>
</div>

<style lang="scss">
	@import '$lib/scss/mixins.scss';

	#Dashboard {
		padding: 2rem;
		width: 100%;
		height: 100%;

		:global(#Product-Line-Chart-Parent) {
			width: 100%;
			height: 40%;
		}

		.col {
			@include flex;
			width: 100vw;
			position: relative;
			transform: translate(0 -2rem);
			height: 50%;
			padding: 2rem;
			background-color: white;
		}

		#Products {
			width: 100%;
			height: 100%;
			> header {
				@include flex($content: space-between);
				// background-color: var(--bs-dark);
				// color: var(--bs-light);
				padding: 0.5rem 1rem;
				border: 3px solid var(--bs-dark);
				border-bottom: 0;
				border-radius: 0.5rem 0.5rem 0 0;
				background-color: var(--bs-primary);
				color: white;
				> .title {
					margin: 0;
				}
			}

			main {
				width: 100%;
				padding: 0.5rem 1rem;
				border: 3px solid var(--bs-dark);
				border-top: 0;
				border-radius: 0 0 0.5rem 0.5rem;

				.center {
					width: 100%;
					height: 100%;
					@include flex();
				}
			}
		}

		:global(#Product-Pie-Chart-Parent) {
			width: 100%;
			height: 100%;
		}
	}
</style>
