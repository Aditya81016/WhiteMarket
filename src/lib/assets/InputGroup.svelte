<script lang="ts">
	export let id: string,
		title: string,
		placeholder = '',
		type = 'text',
		warning = '';

	if (placeholder === '') {
		placeholder = `enter ${title.toLowerCase()} here...`;
	}
</script>

<div class="mb-3 Input-Group my-3" {id}>
	<label for="{id}-Input" id="{id}-Label" class="form-label">{title}</label>
	<input {type} class="form-control" id="{id}-Input" {placeholder} />
	<p class="warning px-1">{warning}</p>
</div>

<style lang="scss">
	.Input-Group {
		width: 100%;
		text-align: left;

		.warning {
			position: fixed;
			color: red;
		}
	}
</style>
