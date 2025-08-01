<script>import { createEventDispatcher } from "svelte";
export let igBulletClass;
export let currentIndex;
export let index;
const dispatch = createEventDispatcher();
</script>

<button
  type="button"
  class={igBulletClass}
  on:click={(event) => dispatch('click', event)}
  aria-pressed={currentIndex === index}
  aria-label={`Go to Slide ${index + 1}`}
/>
