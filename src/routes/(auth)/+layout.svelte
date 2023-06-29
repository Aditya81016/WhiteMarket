<div id="Auth">
	<slot />
</div>

<style lang="scss">
	#Auth {
		@apply w-screen h-screen flex justify-center items-center flex-col gap-5;
	}

	@media screen and (max-width: 800px) {
		#Auth {
			@apply px-5;
		}
	}
</style>
