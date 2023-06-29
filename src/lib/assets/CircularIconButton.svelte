<script lang="ts">
  export let icon="", bg = "bg-white", color = "text-indigo-600", hover = "hover:bg-indigo-200", href="/#", style = ""
</script>

<a {href} class="{style}">
  <button class="CircularButton {bg} {hover}" > 
    <i class="{icon} {color}"></i>
  </button>
</a>

<style lang="scss">
  button {
    @apply w-[3rem] h-[3rem] rounded-full
  }
</style>
