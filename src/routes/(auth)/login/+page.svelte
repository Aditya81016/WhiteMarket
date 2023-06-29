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
	import { currentPage } from '$lib/modules/store';

	$currentPage = "Login Form"

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
	<button type="submit" id="Login-Submit-Button" disabled={isSubmitDisabled}>
		<div id="Login-Submit-LoadingScreen" class={isSubmitLoading ? '' : 'hidden'}>Loading...</div>
		{isSubmitLoading ? '' : 'Submit'}
	</button>
</form>

<Divider width="500px" />

<button type="button" class="btn btn-light" id="Login-Google-SignUp-Button">
	<GoogleSvg scale={0.07} />
</button>

<a href={url.register}>Create a new account</a>

<style lang="scss">
	// * {
	// 	outline: auto;
	// }

	form {
		@apply w-[400px] flex flex-col justify-center items-center gap-5;

		h1 {
			@apply text-3xl font-bold text-center;
		}

		.inputs {
			@apply w-full flex flex-col gap-5;
		}

		#Login-Submit-Button {
			@apply w-full px-5 py-3 border-2 border-slate-400 rounded-full bg-slate-50
			enabled:hover:bg-slate-950 enabled:border-slate-950 enabled:hover:text-slate-50 enabled:hover:font-bold disabled:opacity-50 disabled:text-slate-950;
		}
	}

	a {
		@apply text-blue-500 font-bold hover:underline;
	}

	#Login-Google-SignUp-Button {
		@apply w-[400px] px-5 py-3 border-2 border-slate-400 rounded-full
			flex justify-center bg-slate-50 hover:border-slate-950 hover:bg-slate-200;
	}

	@media screen and (max-width: 800px) {
		#Login-Form,
		#Login-Google-SignUp-Button {
			@apply w-full;
		}
	}
</style>
