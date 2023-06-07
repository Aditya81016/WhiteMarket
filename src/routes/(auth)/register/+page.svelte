<script lang="ts">
	import InputGroup from '$lib/assets/InputGroup.svelte';
	import { onMount } from 'svelte';
	import j$ from 'jquery';
	import { validateInput } from '$lib/modules/methods';
	import url from '$lib/modules/url';
	import LoadingScreen from '$lib/assets/LoadingScreen.svelte';
	import { createUser } from '$lib/backend/users';
	import { goto } from '$app/navigation';
	import { onAuthStateChanged } from 'firebase/auth';
	import { auth } from '$lib/modules/firebase';

	let fName = '',
		fNameFeedback = '',
		fNameFeedbackColor = '',
		fNameIsValid = false;

	let lName = '',
		lNameFeedback = '',
		lNameFeedbackColor = '',
		lNameIsValid = false;

	let email = '',
		EmailFeedback = '',
		EmailFeedbackColor = '',
		EmailIsValid = false;

	let password = '',
		PasswordFeedback = '',
		PasswordFeedbackColor = '',
		PasswordIsValid = false;

	let confirm = '',
		ConfirmFeedback = '',
		ConfirmFeedbackColor = '',
		ConfirmIsValid = false;

	$: isSubmitDisabled = !(
		fNameIsValid &&
		lNameIsValid &&
		EmailIsValid &&
		PasswordIsValid &&
		ConfirmIsValid
	);

	let isSubmitLoading = false;

	onMount(() => {
		onAuthStateChanged(auth, (user) => {
			if (user) {
				goto(url.home);
			}
		});

		j$('input').on('input', (event) => {
			const element = event?.currentTarget as HTMLInputElement;
			const value = element.value;
			const name = element.name;

			const validatedData = validateInput(value, name);

			switch (name) {
				case 'fName':
					fName = value;
					fNameFeedback = validatedData.feedback;
					fNameFeedbackColor = validatedData.feedbackColor;
					fNameIsValid = validatedData.isValid;
					break;
				case 'lName':
					lName = value;
					lNameFeedback = validatedData.feedback;
					lNameFeedbackColor = validatedData.feedbackColor;
					lNameIsValid = validatedData.isValid;
					break;
				case 'email':
					email = value;
					EmailFeedback = validatedData.feedback;
					EmailFeedbackColor = validatedData.feedbackColor;
					EmailIsValid = validatedData.isValid;
					break;
				case 'password':
					password = value;
					PasswordFeedback = validatedData.feedback;
					PasswordFeedbackColor = validatedData.feedbackColor;
					PasswordIsValid = validatedData.isValid;
					break;
				case 'confirm':
					confirm = value;
					ConfirmFeedback = validatedData.feedback;
					ConfirmFeedbackColor = validatedData.feedbackColor;
					ConfirmIsValid = validatedData.isValid;
					break;
			}

			if ((name === 'confirm' || name === 'password') && confirm !== '') {
				if (confirm !== password) {
					ConfirmFeedback = "Password didn't match.";
				} else if (confirm === password) {
					ConfirmFeedback = 'Great! password matched!';
					ConfirmFeedbackColor = '#00DD00';
					ConfirmIsValid = true;
				}
			}
		});

		j$('#Register-Submit-Button').on('click', async () => {
			isSubmitDisabled = true;
			isSubmitLoading = true;

			const response = await createUser({ email, password, fName, lName });

			isSubmitDisabled = false;
			isSubmitLoading = false;
			if (typeof response === 'string') {
				if (response.includes('password')) {
					PasswordFeedback = response;
					PasswordFeedbackColor = '#DD0000';
					PasswordIsValid = false;
				} else {
					EmailFeedback = response;
					EmailFeedbackColor = '#DD0000';
					EmailIsValid = false;
				}
			}
			// else if (typeof response === 'object') {
			// 	goto(url.home);
			// }
		});
	});
</script>

<form id="Register-Form">
	<h1>Register</h1>
	<div class="inputs mb-4">
		<div class="row">
			<InputGroup
				name="fName"
				id="Register-First-Name"
				title="Your First Name"
				feedback={fNameFeedback}
				feedbackColor={fNameFeedbackColor}
			/>
			<InputGroup
				name="lName"
				id="Register-Last-Name"
				title="Your Last Name"
				feedback={lNameFeedback}
				feedbackColor={lNameFeedbackColor}
			/>
		</div>
		<InputGroup
			name="email"
			id="Register-Email"
			title="Your Email"
			type="email"
			feedback={EmailFeedback}
			feedbackColor={EmailFeedbackColor}
		/>
		<div class="row">
			<InputGroup
				name="password"
				id="Register-Password"
				title="Your Password"
				type="password"
				feedback={PasswordFeedback}
				feedbackColor={PasswordFeedbackColor}
			/>
			<InputGroup
				name="confirm"
				id="Register-Confim"
				title="Confirm Password"
				placeholder="confirm your password here..."
				feedback={ConfirmFeedback}
				feedbackColor={ConfirmFeedbackColor}
			/>
		</div>
	</div>

	<button
		type="submit"
		class="btn btn-primary"
		id="Register-Submit-Button"
		disabled={isSubmitDisabled}
	>
		<div id="Login-Submit-LoadingScreen" class={isSubmitLoading ? '' : 'hidden'}>
			<LoadingScreen color="white" />
		</div>
		{isSubmitLoading ? '' : 'Submit'}
	</button>
</form>

<a href={url.login}>Login to an existing account</a>

<style lang="scss">
	#Register-Form {
		width: 800px;

		.btn {
			width: 100%;
		}
	}

	@media screen and (max-width: 800px) {
		#Register-Form {
			width: 100%;

			#Register-Submit-Button {
				margin-top: 2rem;
			}
		}
	}
</style>
