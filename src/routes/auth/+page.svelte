<script lang="ts">
	import Divider from '$lib/assets/Divider.svelte';
	import InputGroup from '$lib/assets/InputGroup.svelte';
	import GoogleSvg from '$lib/svgs/GoogleSVG.svelte';
	import { onMount } from 'svelte';
	import j$ from 'jquery';
	import { goto } from '$app/navigation';
	import url from '$lib/modules/url';
	import { validateInput } from '$lib/modules/methods';
	import Modal from '$lib/assets/Modal.svelte';
	import LoadingScreen from '$lib/assets/LoadingScreen.svelte';
	import NoUserFoundModal from './NoUserFoundModal.svelte';
	import UserFoundModal from './UserFoundModal.svelte';
	import { findUser } from '$lib/backend/users';

	let emailFeedback = '',
		emailFeedbackColor = '#FF0000',
		emailIsValid = false;

	let modalTitle = 'Loading...',
		modalBody: typeof LoadingScreen | typeof UserFoundModal = LoadingScreen,
		username = '';

	$: isSubmitDisabled = !emailIsValid;

	onMount(() => {
		j$('#Auth-Email-Input').on('input', () => {
			const email = String(j$('#Auth-Email-Input').val());

			const validatedData = validateInput(email, 'email');

			emailFeedback = validatedData.feedback;
			emailFeedbackColor = validatedData.feedbackColor;
			emailIsValid = validatedData.isValid;
		});

		j$('#Auth-Submit-Button').on('click', async () => {
			const email = String(j$('#Auth-Email-Input').val());
			const users = await findUser('email', '==', email);
			console.log(users);

			if (users.length == 0) {
				modalTitle = 'No user found with that email';
				modalBody = NoUserFoundModal;
			} else {
				const userData = users[0].data();
				modalTitle = 'User with that email';
				modalBody = UserFoundModal;
				username = userData.fName + ' ' + userData.lName;
				console.log(userData);
			}
		});
	});
</script>

<Modal id="Auth-Modal" title={modalTitle} body={modalBody} data={{ name: username }} />
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
	</div>
	<button
		type="submit"
		class="btn btn-primary"
		data-bs-toggle="modal"
		data-bs-target="#Auth-Modal"
		id="Auth-Submit-Button"
		disabled={isSubmitDisabled}
	>
		Submit
	</button>
</form>

<Divider />

<button type="button" class="btn btn-light" id="GoogleSVG">
	<GoogleSvg scale={0.09} />
</button>

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
