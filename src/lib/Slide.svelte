<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import Item from '$lib/Item.svelte';
  import type { TItem } from '$lib/types';

  export let index: number;
  export let alignment: string;
  export let originalClass: string | undefined;
  export let slideStyle: string;
  export let showItem: boolean;
  export let item: TItem;
  export let isFullscreen: boolean;
  export let active = false;
  export let direction = '';
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

  function handleImageLoad(event: Event) {
    const img = event.target as HTMLImageElement;
    isPortrait = img.naturalHeight > img.naturalWidth;
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
  class:active
  class:slide-next={active && direction === 'next'}
  class:slide-prev={active && direction === 'prev'}
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
  .image-gallery-slide {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    transition: opacity 0.5s ease;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .image-gallery-slide.active {
    opacity: 1;
  }

  .image-gallery-slide.slide-next {
    animation: slideFromRight 0.5s ease;
  }

  .image-gallery-slide.slide-prev {
    animation: slideFromLeft 0.5s ease;
  }

  @keyframes slideFromRight {
    from { transform: translateX(100%); }
    to { transform: translateX(0); }
  }

  @keyframes slideFromLeft {
    from { transform: translateX(-100%); }
    to { transform: translateX(0); }
  }

  :global(.image-gallery-slide .image-gallery-image) {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  :global(.image-gallery-slide .image-gallery-image.contain) {
    object-fit: contain;
    height: auto;
    width: auto;
    max-height: 100%;
    max-width: 100%;
  }

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
