<script>import Thumbnail from "./Thumbnail.svelte";
import { createEventDispatcher } from "svelte";
import { getIgThumbnailClass, getThumbnailStyle, getThumbsTranslate } from "./styling";
import ThumbnailSwipeWrapper from "./ThumbnailSwipeWrapper.svelte";
export let items;
export let currentIndex;
export let useTranslate3D;
export let isRTL;
export let thumbnailPosition;
export let stopPropagation;
export let disableThumbnailScroll;
export let disableThumbnailSwipe;
export let slideDuration;
export let swipingThumbnailTransitionDuration;
export let gallerySlideWrapperHeight;
let isSwipingThumbnail = false;
let isSwipedThumbnail = false;
export function getElem() {
  return elem;
}
let elem;
let thumbnails;
let thumbnailsWrapperWidth;
let thumbnailsWrapperHeight;
let thumbsElementScrollHeight;
let thumbsElementScrollWidth;
$:
  isThumbnailVertical = thumbnailPosition === "left" || thumbnailPosition === "right";
let thumbsTranslate = 0;
let thumbsSwipedTranslate = 0;
$:
  thumbsStyle = `transition: all ${isSwipingThumbnail ? swipingThumbnailTransitionDuration : slideDuration}ms ease-out;`;
$:
  thumbnailStyle = getThumbnailStyle(
    isRTL,
    thumbsTranslate,
    isThumbnailVertical,
    useTranslate3D,
    thumbsStyle
  );
export function resetSwipingThumbnail() {
  isSwipedThumbnail = false;
}
export function handleResizeWidth(newWidth) {
  thumbnailsWrapperWidth = newWidth;
  handleResize();
}
export function handleResizeHeight(newHeight) {
  thumbnailsWrapperHeight = newHeight;
  handleResize();
}
function handleResize() {
  thumbsTranslate = getThumbsTranslate(
    thumbnails,
    currentIndex,
    disableThumbnailScroll,
    thumbnailsWrapperWidth,
    thumbnailsWrapperHeight,
    isThumbnailVertical,
    items.length
  );
  thumbsElementScrollWidth = thumbnails.scrollWidth;
  thumbsElementScrollHeight = thumbnails.scrollHeight;
}
export function slideThumbnailBar(newIndex) {
  const nextTranslate = -getThumbsTranslate(
    thumbnails,
    newIndex,
    disableThumbnailScroll,
    thumbnailsWrapperWidth,
    thumbnailsWrapperHeight,
    isThumbnailVertical,
    items.length
  );
  if (isSwipedThumbnail) {
    return;
  }
  if (newIndex === 0) {
    thumbsTranslate = 0;
    thumbsSwipedTranslate = 0;
  } else {
    thumbsTranslate = nextTranslate;
    thumbsSwipedTranslate = nextTranslate;
  }
}
$:
  getThumbnailBarHeight = () => {
    if (isThumbnailVertical) {
      return `height: ${gallerySlideWrapperHeight}px;`;
    }
    return "";
  };
$:
  igThumbnailClasses = items.map(
    (item, index) => getIgThumbnailClass(index, currentIndex, item.thumbnailClass)
  );
const dispatch = createEventDispatcher();
export function resetThumbnailPosition() {
  if (thumbnails) {
    thumbsTranslate = 0;
    thumbsSwipedTranslate = 0;
  }
}
</script>

<ThumbnailSwipeWrapper
  {stopPropagation}
  {isThumbnailVertical}
  {isRTL}
  {thumbnailPosition}
  {thumbnailsWrapperHeight}
  {thumbnailsWrapperWidth}
  {thumbsElementScrollHeight}
  {thumbsElementScrollWidth}
  {thumbsSwipedTranslate}
  {disableThumbnailSwipe}
  on:thumbsslideoffset={(e) => {
    isSwipingThumbnail = true;
    thumbsTranslate = thumbsSwipedTranslate + e.detail;
  }}
  on:thumbnailswiped={() => {
    isSwipingThumbnail = false;
    isSwipedThumbnail = true;
    thumbsSwipedTranslate = thumbsTranslate;
  }}
>
  <div class="image-gallery-thumbnails" bind:this={elem} style={getThumbnailBarHeight()}>
    <nav
      bind:this={thumbnails}
      class="image-gallery-thumbnails-container"
      style={thumbnailStyle}
      aria-label="Thumbnail Navigation"
    >
      <!-- These HTML ids are used to determine the width and height of the elements from another
      component.
      -->
      {#each items as item, index}
        <Thumbnail
          {index}
          {currentIndex}
          igThumbnailClass={igThumbnailClasses[index]}
          {item}
          on:click={() => dispatch('slidejump', index)}
          on:mouseover={() => dispatch('thumbnailmouseover', index)}
          on:mouseleave={() => dispatch('thumbnailmouseleave', index)}
          on:imageerror={(event) => dispatch('imageerror', { index, event: event.detail })}
        />
      {/each}
    </nav>
  </div>
</ThumbnailSwipeWrapper>
