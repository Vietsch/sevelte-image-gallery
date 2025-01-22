<script>import { createEventDispatcher } from "svelte";
import Item from "./Item.svelte";
export let index;
export let alignment;
export let originalClass;
export let slideStyle;
export let showItem;
export let item;
export let isFullscreen;
const dispatch = createEventDispatcher();
function handleSlideKeyUp(event) {
  const key = event.code;
  let isEnterOrSpaceKey = key === "Enter" || key === "Space";
  if (isEnterOrSpaceKey) {
    dispatch("click", event);
  }
}
</script>

<div
  aria-label={`Go to Slide ${index + 1}`}
  tabIndex="0"
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
      on:imageload
      on:imageerror
    />
  {:else}
    <div style="height: 100%" />
  {/if}
</div>
