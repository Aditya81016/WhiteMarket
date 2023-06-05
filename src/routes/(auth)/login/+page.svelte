<script>
	import Divider from '$lib/assets/Divider.svelte';
	import InputGroup from '$lib/assets/InputGroup.svelte';
	import GoogleSvg from '$lib/svgs/GoogleSVG.svelte';
</script>

<div id="Login" class="container">
	<button type="button" class="btn btn-light" id="GoogleSVG">
		<GoogleSvg scale={0.09} />
	</button>

	<Divider />

	<form id="Login-Form">
		<h1>Login</h1>
		<div class="inputs">
			<InputGroup id="Login-Email" title="Your Email" type="email" />
			<InputGroup id="Login-Password" title="Your Password" type="password" />
		</div>
		<button type="submit" class="btn btn-primary" id="Submit-Button">Submit</button>
	</form>
</div>

<style lang="scss">
	@import '$lib/scss/mixins.scss';
	#Login {
		@include flex($direction: column, $row-gap: 2rem);
		width: 500px;
		height: 100%;
		text-align: center;

		#Login-Form {
			@include flex($direction: column, $row-gap: 1rem);

			.inputs {
				@include flex($direction: column);
				width: 100%;
			}
		}

		#GoogleSVG,
		#Submit-Button,
		#Login-Form {
			width: 100%;
		}
	}

	@media screen and (max-width: 600px) {
		#Login {
			width: 100%;
		}
	}
</style>
