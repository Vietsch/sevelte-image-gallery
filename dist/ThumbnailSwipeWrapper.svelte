<!--
  Dispatched events:
  - thumbnailswiped
  - thumbsslideoffset
-->
<script>import { swipeable } from "./utils/swipe";
import { createEventDispatcher } from "svelte";
import clsx from "clsx";
import { getThumbnailPositionClassName } from "./styling";
const UP = "UP";
const DOWN = "DOWN";
const LEFT = "LEFT";
const RIGHT = "RIGHT";
let dispatch = createEventDispatcher();
export let disableThumbnailSwipe;
export let stopPropagation;
export let isThumbnailVertical;
export let thumbnailPosition;
export let isRTL;
export let thumbnailsWrapperHeight;
export let thumbnailsWrapperWidth;
export let thumbsElementScrollHeight;
export let thumbsElementScrollWidth;
let swipingUpDown;
let swipingLeftRight;
export let thumbsSwipedTranslate;
function resetSwipingDirection() {
  if (swipingUpDown) {
    swipingUpDown = false;
  }
  if (swipingLeftRight) {
    swipingLeftRight = false;
  }
}
function handleThumbnailSwiping({ event, absX, absY, dir }) {
  if (disableThumbnailSwipe)
    return;
  if (isThumbnailVertical) {
    if ((dir === LEFT || dir === RIGHT || swipingLeftRight) && !swipingUpDown) {
      if (!swipingLeftRight) {
        swipingLeftRight = true;
      }
      return;
    }
    if ((dir === UP || dir === DOWN) && !swipingUpDown) {
      swipingUpDown = true;
    }
  } else {
    if ((dir === UP || dir === DOWN || swipingUpDown) && !swipingLeftRight) {
      if (!swipingUpDown) {
        swipingUpDown = true;
      }
      return;
    }
    if ((dir === LEFT || dir === RIGHT) && !swipingLeftRight) {
      swipingLeftRight = true;
    }
  }
  const emptySpaceMargin = 20;
  let thumbsTranslate;
  let totalSwipeableLength;
  let hasSwipedPassedEnd;
  let hasSwipedPassedStart;
  let isThumbnailBarSmallerThanContainer;
  const slideY = dir === DOWN ? absY : -absY;
  const slideX = dir === RIGHT ? absX : -absX;
  if (isThumbnailVertical) {
    thumbsTranslate = thumbsSwipedTranslate + slideY;
    totalSwipeableLength = thumbsElementScrollHeight - thumbnailsWrapperHeight + emptySpaceMargin;
    hasSwipedPassedEnd = Math.abs(thumbsTranslate) > totalSwipeableLength;
    hasSwipedPassedStart = thumbsTranslate > emptySpaceMargin;
    isThumbnailBarSmallerThanContainer = thumbsElementScrollHeight <= thumbnailsWrapperHeight;
  } else {
    thumbsTranslate = thumbsSwipedTranslate + slideX;
    totalSwipeableLength = thumbsElementScrollWidth - thumbnailsWrapperWidth + emptySpaceMargin;
    hasSwipedPassedEnd = Math.abs(thumbsTranslate) > totalSwipeableLength;
    hasSwipedPassedStart = thumbsTranslate > emptySpaceMargin;
    isThumbnailBarSmallerThanContainer = thumbsElementScrollWidth <= thumbnailsWrapperWidth;
  }
  if (isThumbnailBarSmallerThanContainer) {
    return;
  }
  if ((dir === LEFT || dir === UP) && hasSwipedPassedEnd) {
    return;
  }
  if ((dir === RIGHT || dir === DOWN) && hasSwipedPassedStart) {
    return;
  }
  if (stopPropagation)
    event.stopPropagation();
  if (isThumbnailVertical) {
    dispatch("thumbsslideoffset", slideY);
  } else {
    dispatch("thumbsslideoffset", slideX);
  }
}
function handleOnThumbnailSwiped() {
  if (disableThumbnailSwipe)
    return;
  resetSwipingDirection();
  dispatch("thumbnailswiped");
}
$:
  cls = clsx(
    "image-gallery-thumbnails-wrapper",
    getThumbnailPositionClassName(thumbnailPosition),
    { "thumbnails-wrapper-rtl": !isThumbnailVertical && isRTL },
    { "thumbnails-swipe-horizontal": !isThumbnailVertical && !disableThumbnailSwipe },
    { "thumbnails-swipe-vertical": isThumbnailVertical && !disableThumbnailSwipe }
  );
</script>

<div
  class={cls}
  use:swipeable={{ 
    delta: 0,
    onSwiping: handleThumbnailSwiping,
    onSwiped: handleOnThumbnailSwiped
  }}
>
  <slot />
</div>
