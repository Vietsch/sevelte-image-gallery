<script>import SVG from "./SVG.svelte";
import { createEventDispatcher } from "svelte";
export let isPlaying;
const dispatch = createEventDispatcher();
</script>

<button
  type="button"
  class="image-gallery-icon image-gallery-play-button"
  on:click={() => dispatch('click')}
  aria-label="Play or Pause Slideshow"
>
  <SVG strokeWidth={2} icon={isPlaying ? 'pause' : 'play'} />
</button>
