<script lang="ts">
	export let text = 'Or,',
		width = '100%';
</script>

<div class="divider" style="width: {width}">
	<hr />
	<span>{text}</span>
	<hr />
</div>

<style lang="scss">
	@import '$lib/scss/mixins.scss';

	.divider {
		@include flex($column-gap: 1rem);

		hr {
			// outline: 2px solid white;
			width: 100%;
		}
	}
</style>
