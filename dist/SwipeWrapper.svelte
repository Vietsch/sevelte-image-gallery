<!--
  A component to wrap around another component that listens to all touch events.
  Raises two events:
  - slideoffsetchanged: if the user is currently doing a swipe and the offset should change
  - swipeprevious
  - swipenext

-->
<script>import { swipeable, UP, DOWN, LEFT, RIGHT } from "@react2svelte/swipeable";
import { createEventDispatcher } from "svelte";
let dispatch = createEventDispatcher();
export let disableSwipe;
export let stopPropagation;
export let swipeThreshold;
export let flickThreshold;
export let isRTL;
export let galleryWidth;
export let canSlideLeft;
export let canSlideRight;
export let isTransitioning;
let swipingLeftRight;
let swipingUpDown;
let currentSlideOffset;
$:
  dispatch("slideoffsetchanged", currentSlideOffset);
function handleSwiping({ event, absX, dir }) {
  if ((dir === UP || dir === DOWN || swipingUpDown) && !swipingLeftRight) {
    if (!swipingUpDown) {
      swipingUpDown = true;
    }
    return;
  }
  if ((dir === LEFT || dir === RIGHT) && !swipingLeftRight) {
    swipingLeftRight = true;
  }
  if (disableSwipe)
    return;
  if (stopPropagation) {
    event.preventDefault();
  }
  if (!isTransitioning) {
    const side = dir === RIGHT ? 1 : -1;
    let slideOffset = absX / galleryWidth * 100;
    if (Math.abs(slideOffset) >= 100) {
      slideOffset = 100;
    }
    currentSlideOffset = side * slideOffset;
  } else {
    currentSlideOffset = 0;
  }
}
function sufficientSwipe() {
  return Math.abs(currentSlideOffset) > swipeThreshold;
}
function resetSwipingDirection() {
  if (swipingUpDown) {
    swipingUpDown = false;
  }
  if (swipingLeftRight) {
    swipingLeftRight = false;
  }
}
function handleSwiped({ event, dir, velocity }) {
  if (disableSwipe)
    return;
  if (stopPropagation)
    event.stopPropagation();
  resetSwipingDirection();
  const swipeDirection = (dir === LEFT ? 1 : -1) * (isRTL ? -1 : 1);
  const isSwipeUpOrDown = dir === UP || dir === DOWN;
  const isLeftRightFlick = velocity > flickThreshold && !isSwipeUpOrDown;
  handleOnSwipedTo(swipeDirection, isLeftRightFlick);
}
function handleOnSwipedTo(swipeDirection, isLeftRightFlick) {
  let indexOffset = 0;
  if ((sufficientSwipe() || isLeftRightFlick) && !isTransitioning) {
    indexOffset += swipeDirection;
  }
  if (swipeDirection === -1 && !canSlideLeft || swipeDirection === 1 && !canSlideRight) {
    indexOffset = 0;
  }
  dispatch("swipeend");
  if (indexOffset < 0) {
    dispatch("swipeleft");
  } else if (indexOffset > 0) {
    dispatch("swiperight");
  }
}
</script>

<div
  class="image-gallery-swipe"
  use:swipeable={{ delta: 0 }}
  on:swiping={(e) => handleSwiping(e.detail)}
  on:swiped={(e) => handleSwiped(e.detail)}
>
  <slot />
</div>
