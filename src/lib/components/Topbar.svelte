<script lang="ts">
	import { currentPage, userData } from '$lib/modules/store';

	console.log($userData);
</script>

<div id="Topbar">
	<div class="User-Details Mobile">
		<div class="User-PFP">{$userData.fName === undefined ? '@' : $userData.fName[0]}</div>
		<div class="col">
			<div class="User-Name">{$userData.fName || 'loading...'}</div>
			<div class="User-Plan">{$userData.plan || 'loading...'}</div>
		</div>
	</div>

	<div class="Current-Page">{$currentPage}</div>

	<div class="Search-Section">
		<i class="fa-solid fa-magnifying-glass" />
		<input type="text" placeholder="Search..." class="Search-Input" />
		<!-- <button class="Search-Button">Go</button> -->
	</div>

	<div class="User-Details Desktop">
		<div class="User-PFP">{$userData.fName === undefined ? '@' : $userData.fName[0]}</div>
		<div class="col">
			<div class="User-Name">{$userData.fName || 'loading...'}</div>
			<div class="User-Plan">{$userData.plan || 'loading...'}</div>
		</div>
	</div>
</div>

<style lang="scss">
	#Topbar {
		@apply w-full p-5 py-3 flex justify-between items-center text-slate-800;

		.Current-Page {
			@apply text-3xl font-bold;
		}

		.Search-Section {
			@apply flex items-center;
			i {
				@apply p-3 flex items-center bg-slate-100 rounded-tl-xl rounded-bl-xl text-base;
			}
			.Search-Input {
				@apply p-3 w-full bg-slate-100 rounded-tr-xl rounded-br-xl outline-none focus:bg-slate-200;
			}
		}

		.User-Details {
			@apply flex gap-3 justify-center items-center hover:bg-slate-100 px-5 py-3 rounded-xl;

			&.Mobile {
				@apply hidden;
			}

			.User-PFP {
				@apply w-[2.5rem] h-[2.5rem] rounded-full flex justify-center items-center bg-slate-800 text-slate-50;
			}

			.col {
				.User-Name {
					@apply text-lg font-bold text-slate-800;
				}
				.User-Plan {
					@apply -mt-1 text-sm;
				}
			}
		}
	}

	@media screen and (max-width: 800px) {
		#Topbar {
			@apply px-2;

			.Current-Page {
				@apply hidden;
			}

			.Search-Section {
				@apply pr-5;
			}

			.User-Details {
				&.Desktop {
					@apply hidden;
				}
				&.Mobile {
					@apply flex;
				}

				.col {
					@apply hidden;
				}
			}
		}
	}
</style>
