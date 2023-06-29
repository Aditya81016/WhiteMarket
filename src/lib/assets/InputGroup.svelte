<script lang="ts">
	import { dangerColor, successColor } from '$lib/modules/store';

	export let id: string,
		title: string,
		type = 'text',
		feedback = 'Wrong Input',
		feedbackColor = $dangerColor,
		name = '';
</script>

<div class="Input-Group" {id}>
	<input {type} id="{id}-Input" placeholder={title} {name} />
	<i
		class="fa-solid fa-xl {feedbackColor === $successColor
			? 'fa-circle-check'
			: 'fa-circle-exclamation'} icon"
		style="color: {feedbackColor}"
	/>
	<p class="feedback" style="color: {feedbackColor}">{feedback}</p>
</div>

<style lang="scss">
	.Input-Group {
		@apply w-full flex;

		input {
			@apply w-full border-2 border-slate-400 px-5 py-3 rounded-full outline-none 
				bg-slate-50 focus:bg-slate-200 focus:border-slate-950
				border-r-0 rounded-r-none;
		}

		i {
			@apply p-3 border-2 border-slate-400 bg-slate-50 border-l-0 rounded-r-full flex items-center;
		}

		input:focus + i {
			@apply bg-slate-200 border-slate-950;
		}

		.feedback {
			@apply text-sm px-5 absolute translate-x-1 translate-y-[3.2rem];
		}
	}

	@media screen and (max-width: 800px) {
		.feedback {
			@apply text-xs px-5;
		}
	}
</style>
