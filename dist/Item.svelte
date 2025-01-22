<script>import { createEventDispatcher } from "svelte";
export let original;
export let fullscreen;
export let description = "";
export let isFullscreen = false;
export let originalAlt = "";
export let originalHeight;
export let originalWidth;
export let originalTitle = "";
export let sizes = "";
export let srcset = "";
export let loading = "eager";
const itemSrc = isFullscreen ? fullscreen || original : original;
const dispatch = createEventDispatcher();
</script>

<img
  class="image-gallery-image"
  src={itemSrc}
  alt={originalAlt}
  {srcset}
  height={originalHeight}
  width={originalWidth}
  {sizes}
  title={originalTitle}
  on:load={(event) => dispatch('imageload', event)}
  on:error={(event) => dispatch('imageerror', event)}
  {loading}
/>
{#if description}
  <span class="image-gallery-description">
    {description}
  </span>
{/if}
