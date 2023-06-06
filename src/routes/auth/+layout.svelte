<div id="Auth" class="container">
	<slot />
</div>

<style lang="scss">
	@import '$lib/scss/mixins.scss';
	#Auth {
		@include flex($direction: column, $row-gap: 2rem);
		width: 500px;
		height: 100%;
		text-align: center;
	}

	@media screen and (max-width: 600px) {
		#Auth {
			width: 100%;
		}
	}
</style>
