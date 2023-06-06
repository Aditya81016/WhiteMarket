<script lang="ts">
	export let data: any;
	const { email } = data;
</script>

<p>would you like to create a new user with the following email</p>
<p class="email">{email}</p>

<style lang="scss">
	.email {
		color: var(--bs-primary);
		text-decoration: underline;
	}
</style>
