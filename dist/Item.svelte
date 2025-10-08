<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  export let original: string | undefined;
  export let fullscreen: string | undefined; // img source for fullscreen
  export let description = '';
  export let isFullscreen = false;
  export let originalAlt = '';
  export let originalHeight: number | undefined;
  export let originalWidth: number | undefined;
  export let originalTitle = '';
  export let sizes = '';
  export let srcset = '';
  export let loading: 'eager' | 'lazy' = 'eager';
  export let contain = false;

  const itemSrc = isFullscreen ? fullscreen || original : original;

  const dispatch = createEventDispatcher();

  // Combine the base class with any additional classes from $$restProps
  $: combinedClass = `image-gallery-image ${contain ? 'contain' : ''} ${$$restProps.class || ''}`.trim();
</script>

<img
  class={combinedClass}
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
