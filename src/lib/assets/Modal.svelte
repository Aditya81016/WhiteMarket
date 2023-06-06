<script lang="ts">
	export let id: string,
		backdrop: string = 'static',
		title: string,
		body: any,
		closeText = 'Close',
		submitText = 'Proceed',
		data: any;
</script>

<div
	class="modal fade"
	{id}
	data-bs-backdrop={backdrop}
	data-bs-keyboard="false"
	tabindex="-1"
	aria-labelledby="staticBackdropLabel"
	aria-hidden="true"
>
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<h1 class="modal-title fs-5" id="staticBackdropLabel">{title}</h1>
				<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" />
			</div>
			<div class="modal-body">
				<svelte:component this={body} {data} />
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">{closeText}</button>
				<button type="button" class="btn btn-primary">{submitText}</button>
			</div>
		</div>
	</div>
</div>
