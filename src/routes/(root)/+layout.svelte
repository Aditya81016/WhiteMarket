<script lang="ts">
	import Leftbar from '$lib/components/Leftbar.svelte';
	import Topbar from '$lib/components/Topbar.svelte';
</script>

<div id="Root-Layout">
  <Leftbar />
  <div class="col">
    <Topbar />
    <div id="Main">
      <slot />
    </div>
  </div>
</div>

<style lang="scss">
	@import '$lib/scss/mixins.scss';

  #Root-Layout {
    @apply flex w-screen h-screen;

    .col {
      @apply flex flex-col w-full h-full;
      #Main {
        @apply w-full h-full flex flex-col gap-5 justify-center items-center
      }
    }
  }
   
</style>
