<script lang="ts">
	import Divider from '$lib/assets/Divider.svelte';
	import InputGroup from '$lib/assets/InputGroup.svelte';
	import GoogleSvg from '$lib/svgs/GoogleSVG.svelte';
	import { onMount } from 'svelte';
	import j$ from 'jquery';
	import { goto } from '$app/navigation';
	import url from '$lib/modules/url';
	import { validateInput } from '$lib/modules/methods';
	import LoadingScreen from '$lib/assets/LoadingScreen.svelte';
	import { signInUser, signUpWithGoogle } from '$lib/backend/users';
	import { onAuthStateChanged } from 'firebase/auth';
	import { auth } from '$lib/modules/firebase';

	let email = '',
		emailFeedback = '',
		emailFeedbackColor = '#FF0000',
		emailIsValid = false;

	let password = '',
		passwordFeedback = '',
		passwordFeedbackColor = '#FF0000',
		passwordIsValid = false;

	let LoadingScreenIsHidden = true,
		isSubmitLoading = false;

	$: isSubmitDisabled = !(emailIsValid && passwordIsValid);

	onMount(() => {
		onAuthStateChanged(auth, (user) => {
			if (user) {
				goto(url.home);
			}
		});

		j$('#Login-Email-Input').on('input', () => {
			email = String(j$('#Login-Email-Input').val());

			const validatedData = validateInput(email, 'email');

			emailFeedback = validatedData.feedback;
			emailFeedbackColor = validatedData.feedbackColor;
			emailIsValid = validatedData.isValid;
		});

		j$('#Login-Password-Input').on('input', () => {
			password = String(j$('#Login-Password-Input').val());

			const validatedData = validateInput(password, 'password');

			passwordFeedback = validatedData.feedback;
			passwordFeedbackColor = validatedData.feedbackColor;
			passwordIsValid = validatedData.isValid;
		});

		j$('#Login-Submit-Button').on('click', async () => {
			isSubmitDisabled = true;
			isSubmitLoading = true;

			const response = await signInUser(email, password);

			isSubmitDisabled = false;
			isSubmitLoading = false;
			if (typeof response === 'string') {
				if (response.includes('password')) {
					passwordFeedback = response;
					passwordFeedbackColor = '#DD0000';
					passwordIsValid = false;
				} else {
					emailFeedback = response;
					emailFeedbackColor = '#DD0000';
					emailIsValid = false;
				}
			}
			// else if (typeof response === 'object') {
			// 	goto(url.home);
			// }
		});

		j$('#Login-Google-SignUp-Button').on('click', async () => {
			await signUpWithGoogle();
		});
	});
</script>

<div id="Login-LoadingScreen" class={LoadingScreenIsHidden ? 'hidden' : ''}>
	<LoadingScreen block />
</div>
<form
	id="Login-Form"
	on:submit={(e) => {
		e.preventDefault();
	}}
>
	<h1>Login</h1>
	<div class="inputs">
		<InputGroup
			id="Login-Email"
			title="Your Email"
			type="email"
			feedback={emailFeedback}
			feedbackColor={emailFeedbackColor}
		/>
		<InputGroup
			id="Login-Password"
			title="Your Password"
			type="password"
			feedback={passwordFeedback}
			feedbackColor={passwordFeedbackColor}
		/>
	</div>
	<button
		type="submit"
		class="btn btn-primary"
		id="Login-Submit-Button"
		disabled={isSubmitDisabled}
	>
		<div id="Login-Submit-LoadingScreen" class={isSubmitLoading ? '' : 'hidden'}>
			<LoadingScreen color="white" />
		</div>
		{isSubmitLoading ? '' : 'Submit'}
	</button>
</form>

<Divider />

<button type="button" class="btn btn-light" id="Login-Google-SignUp-Button">
	<GoogleSvg scale={0.09} />
</button>

<a href={url.register}>Register a new account</a>

<style lang="scss">
	@import '$lib/scss/mixins.scss';

	#Login-Form {
		@include flex($direction: column, $row-gap: 1rem);

		.inputs {
			@include flex($direction: column);
			width: 100%;
		}
	}

	#Login-Google-SignUp-Button,
	#Login-Submit-Button,
	#Login-Form {
		width: 100%;
	}
</style>
