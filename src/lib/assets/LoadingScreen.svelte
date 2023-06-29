<script lang="ts">
	export let block = false;
</script>

<div class={block ? 'block' : ''}>
	<div class="loading">loading</div>
</div>

<style lang="scss">
	@import '$lib/scss/mixins.scss';
	.block {
		@include flex;
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		z-index: 10;
		background-color: rgba($color: #000000, $alpha: 0.5);
	}
</style>
