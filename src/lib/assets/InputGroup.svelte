<script lang="ts">
	export let id: string,
		title: string,
		placeholder = '',
		type = 'text',
		feedback = '',
		feedbackColor = '#FF0000';

	if (placeholder === '') {
		placeholder = `enter ${title.toLowerCase()} here...`;
	}
</script>

<div class="mb-3 Input-Group my-3" {id}>
	<label for="{id}-Input" id="{id}-Label" class="form-label">{title}</label>
	<input {type} class="form-control" id="{id}-Input" {placeholder} />
	<p class="feedback px-1" style="color: {feedbackColor}">{feedback}</p>
</div>

<style lang="scss">
	.Input-Group {
		width: 100%;
		text-align: left;

		.feedback {
			position: fixed;
			font-size: 0.8rem;
			font-weight: bolder;
		}
	}
</style>
