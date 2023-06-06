<script lang="ts">
	export let id: string,
		title: string,
		placeholder = '',
		type = 'text',
		feedback = 'Wrong Input',
		feedbackColor = '#FF0000',
		name = '';

	if (placeholder === '') {
		placeholder = `enter ${title.toLowerCase()} here...`;
	}
</script>

<div class="mb-3 Input-Group my-3 col" {id}>
	<label for="{id}-Input" id="{id}-Label" class="form-label">{title}</label>
	<input {type} class="form-control" id="{id}-Input" {placeholder} {name} />
	<p class="feedback px-1" style="color: {feedbackColor}">{feedback}</p>
</div>

<style lang="scss">
	.Input-Group {
		width: 100%;
		text-align: left;

		.feedback {
			position: absolute;
			font-size: 0.8rem;
			font-weight: bolder;
		}
	}

	@media screen and (max-width: 800px) {
		.feedback {
			// width: 50%;
			position: static !important;
			margin-bottom: -1.5rem;
		}
	}
</style>
