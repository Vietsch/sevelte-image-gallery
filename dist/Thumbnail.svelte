<script>import { createEventDispatcher } from "svelte";
export let index;
export let currentIndex;
export let igThumbnailClass;
export let item;
``;
const dispatch = createEventDispatcher();
</script>

<button
  type="button"
  tabIndex="0"
  aria-pressed={currentIndex === index}
  aria-label={`Go to Slide ${index + 1}`}
  class={igThumbnailClass}
  on:mouseleave={(event) => dispatch('mouseleave', event)}
  on:mouseover={(event) => dispatch('mouseover', event)}
  on:focus={(event) => dispatch('focus', event)}
  on:keyup={(event) => dispatch('keyup', event)}
  on:click={(event) => dispatch('click', event)}
>
  <span class="image-gallery-thumbnail-inner">
    <img
      class="image-gallery-thumbnail-image"
      src={item.thumbnail}
      height={item.thumbnailHeight}
      width={item.thumbnailWidth}
      alt={item.thumbnailAlt}
      title={item.thumbnailTitle}
      loading={item.thumbnailLoading}
      on:error={(event) => dispatch('imageerror', event)}
    />
    {#if item.thumbnailLabel}
      <div class="image-gallery-thumbnail-label">
        {item.thumbnailLabel}
      </div>
    {/if}
  </span>
</button>
