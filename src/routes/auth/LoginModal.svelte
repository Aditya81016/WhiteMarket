<script lang="ts">
	export let data: any;

	import InputGroup from '$lib/assets/InputGroup.svelte';
	import { validateInput } from '$lib/modules/methods';
	import j$ from 'jquery';
	import { onMount } from 'svelte';

	let feedback = '',
		feedbackColor = '';

	const { setProceedDisabled } = data;

	console.log(data);

	onMount(() => {
		j$('#Login-Modal-Input').on('input', () => {
			const password = String(j$('#Login-Modal-Input').val());
			const validatedData = validateInput(password, 'password');

			feedback = validatedData.feedback;
			feedbackColor = validatedData.feedbackColor;
			setProceedDisabled(!validatedData.isValid);
		});
	});
</script>

<InputGroup title="Your Password" id="Login-Modal" type="password" {feedback} {feedbackColor} />
