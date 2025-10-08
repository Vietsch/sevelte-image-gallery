<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import Item from './Item.svelte';
  import type { TItem } from './types';

  export let index: number;
  export let alignment: string;
  export let originalClass: string | undefined;
  export let slideStyle: string;
  export let showItem: boolean;
  export let item: TItem;
  export let isFullscreen: boolean;
  export let containInPage: boolean = false;

  const dispatch = createEventDispatcher();

  // Add logic to detect image orientation
  let isPortrait = false;

  function handleSlideKeyUp(event: KeyboardEvent) {
    // a11y support ^_^
    const key = event.code;
    let isEnterOrSpaceKey = key === 'Enter' || key === 'Space';
    if (isEnterOrSpaceKey) {
      dispatch('click', event);
    }
  }

  function handleImageLoad(event: CustomEvent<Event>) {
    const loadEvent = event.detail as Event | undefined;
    const target = (loadEvent?.target ?? event.target) as EventTarget | null;
    if (!(target instanceof HTMLImageElement)) {
      return;
    }
    isPortrait = target.naturalHeight > target.naturalWidth;
  }
</script>

<div
  aria-label={`Go to Slide ${index + 1}`}
  tabindex="0"
  class={`image-gallery-slide ${alignment} ${originalClass ?? ''}`}
  style={slideStyle}
  on:click={(e) => dispatch('click', e)}
  on:keyup={handleSlideKeyUp}
  on:touchmove={() => dispatch('touchmove')}
  on:touchend={() => dispatch('touchend')}
  on:touchstart={() => dispatch('touchstart')}
  on:mouseover={() => dispatch('mouseover')}
  on:focus={() => dispatch('focus')}
  on:mouseleave={() => dispatch('mouseleave')}
  role="button"
  class:portrait={isPortrait}
  class:landscape={!isPortrait}
>
  {#if showItem}
    <Item
      description={item.description}
      fullscreen={item.fullscreen}
      {isFullscreen}
      original={item.original}
      originalAlt={item.originalAlt}
      originalHeight={item.originalHeight}
      originalWidth={item.originalWidth}
      originalTitle={item.originalTitle}
      sizes={item.sizes}
      loading={item.loading}
      srcset={item.srcset}
      contain={containInPage}
      on:imageload={handleImageLoad}
      on:imageerror
    />
  {:else}
    <div style="height: 100%"></div>
  {/if}
</div>

<style>
  /* Portrait specific handling */
  .portrait :global(.image-gallery-image.contain) {
    max-height: 100%;
    width: auto;
  }

  /* Landscape specific handling */
  .landscape :global(.image-gallery-image.contain) {
    max-width: 100%;
    height: auto;
  }
</style>
