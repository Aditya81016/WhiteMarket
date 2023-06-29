<script lang="ts" >
	import CircularIconButton from "$lib/assets/CircularIconButton.svelte";
  import url from "$lib/modules/url"
</script>

<main id="Leftbar">
  <div class="top">
    <CircularIconButton icon="fa-brands fa-gripfire fa-xl" bg="bg-indigo-600" color="text-indigo-50" hover="" />
  </div>
  <div class="middle">
    <CircularIconButton icon="fa-solid fa-house fa-lg" />
    <CircularIconButton icon="fa-solid fa-chart-line fa-lg" />
    <CircularIconButton icon="fa-solid fa-user-group fa-lg" />
    <CircularIconButton icon="fa-solid fa-wallet fa-lg" />
    <CircularIconButton icon="fa-solid fa-cart-shopping fa-lg" />
    <CircularIconButton icon="fa-solid fa-gear fa-xl" />
  </div>
  <div class="bottom">
    <CircularIconButton icon="fa-solid fa-arrow-right-from-bracket fa-xl" color="text-slate-400" hover="hover:bg-slate-200" href={url.signout} style="self-end" />
  </div>
</main>

<style lang="scss">
  #Leftbar {
    @apply p-5 flex flex-col justify-between;

    .middle {
      @apply flex flex-col gap-2 
    }
  }
</style>
