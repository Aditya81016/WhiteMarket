<script lang="ts">
	import InputGroup from '$lib/assets/InputGroup.svelte';
	import { onMount } from 'svelte';
	import j$ from 'jquery';
	import { validateInput } from '$lib/modules/methods';

	let fNameFeedback = '',
		fNameFeedbackColor = '',
		fNameIsValid = false;

	let lNameFeedback = '',
		lNameFeedbackColor = '',
		lNameIsValid = false;

	let EmailFeedback = '',
		EmailFeedbackColor = '',
		EmailIsValid = false;

	let password = '',
		PasswordFeedback = '',
		PasswordFeedbackColor = '',
		PasswordIsValid = false;

	let ConfirmFeedback = '',
		ConfirmFeedbackColor = '',
		ConfirmIsValid = false;

	let AddressFeedback = '',
		AddressFeedbackColor = '',
		AddressIsValid = false;

	$: isSubmitDisable = !(
		fNameIsValid &&
		lNameIsValid &&
		EmailIsValid &&
		PasswordIsValid &&
		ConfirmIsValid &&
		AddressIsValid
	);

	onMount(() => {
		j$('input').on('input', (event) => {
			const element = event?.currentTarget as HTMLInputElement;
			const value = element.value;
			const name = element.name;

			const validatedData = validateInput(value, name);

			if (name === 'password') password = value;

			switch (name) {
				case 'fName':
					fNameFeedback = validatedData.feedback;
					fNameFeedbackColor = validatedData.feedbackColor;
					fNameIsValid = validatedData.isValid;
					break;
				case 'lName':
					lNameFeedback = validatedData.feedback;
					lNameFeedbackColor = validatedData.feedbackColor;
					lNameIsValid = validatedData.isValid;
					break;
				case 'email':
					EmailFeedback = validatedData.feedback;
					EmailFeedbackColor = validatedData.feedbackColor;
					EmailIsValid = validatedData.isValid;
					break;
				case 'password':
					PasswordFeedback = validatedData.feedback;
					PasswordFeedbackColor = validatedData.feedbackColor;
					PasswordIsValid = validatedData.isValid;
					break;
				case 'confirm':
					ConfirmFeedback = validatedData.feedback;
					ConfirmFeedbackColor = validatedData.feedbackColor;
					ConfirmIsValid = validatedData.isValid;
					break;
				case 'address':
					AddressFeedback = validatedData.feedback;
					AddressFeedbackColor = validatedData.feedbackColor;
					AddressIsValid = validatedData.isValid;
					break;
			}

			if (name === 'confirm') {
				if (value !== password) {
					ConfirmFeedback = "Password didn't match.";
				} else if (value === password && value !== '') {
					ConfirmFeedback = 'Great! password matched!';
					ConfirmFeedbackColor = '#00DD00';
					ConfirmIsValid = true;
				}
			}
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
		<InputGroup
			name="address"
			id="Register-Address"
			title="Your Address"
			feedback={AddressFeedback}
			feedbackColor={AddressFeedbackColor}
		/>
	</div>

	<button type="submit" class="btn btn-primary" id="Register-Submit" disabled={isSubmitDisable}
		>Submit</button
	>
</form>

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

			#Register-Submit {
				margin-top: 2rem;
			}
		}
	}
</style>
