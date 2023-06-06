<script>
	import Divider from '$lib/assets/Divider.svelte';
	import InputGroup from '$lib/assets/InputGroup.svelte';
	import GoogleSvg from '$lib/svgs/GoogleSVG.svelte';
	import { onMount } from 'svelte';
	import j$ from 'jquery';
	import { goto } from '$app/navigation';
	import url from '$lib/modules/url';
	import { validateInput } from '$lib/modules/methods';

	let emailFeedback = '',
		emailFeedbackColor = '#FF0000',
		emailIsValid = false;

	let passwordFeedback = '',
		passwordFeedbackColor = '#FF0000',
		passwordIsValid = false;

	$: isSubmitDisabled = !(emailIsValid && passwordIsValid);

	onMount(() => {
		j$('#Auth-Email-Input').on('input', () => {
			const email = String(j$('#Auth-Email-Input').val());

			const validatedData = validateInput(email, 'email');

			emailFeedback = validatedData.feedback;
			emailFeedbackColor = validatedData.feedbackColor;
			emailIsValid = validatedData.isValid;
		});

		j$('#Auth-Password-Input').on('input', () => {
			const password = String(j$('#Auth-Password-Input').val());

			const validatedData = validateInput(password, 'password');

			passwordFeedback = validatedData.feedback;
			passwordFeedbackColor = validatedData.feedbackColor;
			passwordIsValid = validatedData.isValid;
		});

		j$('#Auth-Submit-Button').on('click', () => {
			goto('/home');
		});
	});
</script>

<button type="button" class="btn btn-light" id="GoogleSVG">
	<GoogleSvg scale={0.09} />
</button>

<Divider />

<form id="Auth-Form">
	<h1>Sign Up</h1>
	<div class="inputs">
		<InputGroup
			id="Auth-Email"
			title="Your Email"
			type="email"
			feedback={emailFeedback}
			feedbackColor={emailFeedbackColor}
		/>
		<InputGroup
			id="Auth-Password"
			title="Your Password"
			type="password"
			feedback={passwordFeedback}
			feedbackColor={passwordFeedbackColor}
		/>
	</div>
	<button type="submit" class="btn btn-primary" id="Auth-Submit-Button" disabled={isSubmitDisabled}
		>Submit</button
	>
</form>

<style lang="scss">
	@import '$lib/scss/mixins.scss';

	#Auth-Form {
		@include flex($direction: column, $row-gap: 1rem);

		.inputs {
			@include flex($direction: column);
			width: 100%;
		}
	}

	#GoogleSVG,
	#Auth-Submit-Button,
	#Auth-Form {
		width: 100%;
	}
</style>
