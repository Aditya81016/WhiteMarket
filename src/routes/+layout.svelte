<script lang="ts">
	import settings from '$lib/modules/settings';

	import '../style.scss';
</script>

<div id="App" class="theme-{settings.theme}" data-bs-theme={settings.theme}>
	<slot />
</div>

<style lang="scss">
</style>
