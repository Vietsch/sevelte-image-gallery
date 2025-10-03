<script>import { createEventDispatcher } from "svelte";
import Item from "./Item.svelte";
export let index;
export let alignment;
export let originalClass;
export let slideStyle;
export let showItem;
export let item;
export let isFullscreen;
export let src = "";
export let alt = "";
export let active = false;
export let direction = "";
export let containInPage = false;
const dispatch = createEventDispatcher();
let isPortrait = false;
function handleSlideKeyUp(event) {
  const key = event.code;
  let isEnterOrSpaceKey = key === "Enter" || key === "Space";
  if (isEnterOrSpaceKey) {
    dispatch("click", event);
  }
}
function handleImageLoad(event) {
  const img = event.target;
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
    <div style="height: 100%" />
  {/if}
</div>

<style>
  .slide {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    transition: opacity 0.5s ease;
  }

  .slide.active {
    opacity: 1;
  }

  .slide img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .slide-next {
    animation: slideFromRight 0.5s ease;
  }

  .slide-prev {
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

  .image-gallery-slide {
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  img {
    max-width: 100%;
  }
  
  img.contain {
    object-fit: contain;
    height: auto;
    width: auto;
    max-height: 100%;
  }
  
  /* Portrait specific handling */
  .portrait img.contain {
    max-height: 100%;
    width: auto;
  }
  
  /* Landscape specific handling */
  .landscape img.contain {
    max-width: 100%;
    height: auto;
  }
</style>
