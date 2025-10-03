<script>import LeftNav from "./LeftNav.svelte";
import RightNav from "./RightNav.svelte";
import { createEventDispatcher } from "svelte";
import Slide from "./Slide.svelte";
import Bullet from "./Bullet.svelte";
import Fullscreen from "./Fullscreen.svelte";
import PlayPause from "./PlayPause.svelte";
import SwipeWrapper from "./SwipeWrapper.svelte";
import { getAlignmentClassName, getBulletStyle, getSlideStyle } from "./styling";
export let slideWrapperClass;
export let items;
export let showNav;
export let showBullets;
export let showIndex;
export let previousIndex;
export let currentIndex;
export let isTransitioning;
export let infinite;
export let isRTL;
export let isPlaying;
export let showPlayButton;
export let isFullscreen;
export let showFullscreenButton;
export let disableSwipe;
export let stopPropagation;
export let currentSlideOffset;
export let galleryWidth;
export let indexSeparator;
export let lazyLoad;
export let lazyLoaded;
export let swipeThreshold;
export let flickThreshold;
export let transitionStyle;
export let swipingTransitionStyle;
export let useTranslate3D;
export let containInPage = false;
let isSwiping = false;
$:
  currentTransitionStyle = isSwiping ? swipingTransitionStyle : transitionStyle;
$:
  canSlide = items.length >= 2;
$:
  canSlidePrevious = currentIndex > 0;
$:
  canSlideNext = currentIndex < items.length - 1;
$:
  canSlideLeft = infinite || (isRTL ? canSlideNext : canSlidePrevious);
$:
  canSlideRight = infinite || (isRTL ? canSlidePrevious : canSlideNext);
let elem;
export function getElem() {
  return elem;
}
const dispatch = createEventDispatcher();
$:
  slideIsTransitioning = (index) => {
    const indexIsNotPreviousOrNextSlide = !(index === previousIndex || index === currentIndex);
    return isTransitioning && indexIsNotPreviousOrNextSlide;
  };
$:
  ignoreIsTransitioning = () => {
    const totalSlides = items.length - 1;
    const slidingMoreThanOneSlideLeftOrRight = Math.abs(previousIndex - currentIndex) > 1;
    const notGoingFromFirstToLast = !(previousIndex === 0 && currentIndex === totalSlides);
    const notGoingFromLastToFirst = !(previousIndex === totalSlides && currentIndex === 0);
    return slidingMoreThanOneSlideLeftOrRight && notGoingFromFirstToLast && notGoingFromLastToFirst;
  };
$:
  isFirstOrLastSlide = (index) => {
    const totalSlides = items.length - 1;
    const isLastSlide = index === totalSlides;
    const isFirstSlide = index === 0;
    return isLastSlide || isFirstSlide;
  };
$:
  isSlideVisible = (index) => {
    return !slideIsTransitioning(index) || ignoreIsTransitioning() && !isFirstOrLastSlide(index);
  };
$:
  alignmentClasses = items.map(
    (_, index) => getAlignmentClassName(index, currentIndex, infinite, items.length)
  );
$:
  slideStyles = items.map(
    (_, index) => getSlideStyle(
      index,
      currentIndex,
      previousIndex,
      items.length,
      isRTL,
      currentSlideOffset,
      infinite,
      isSlideVisible(index),
      currentTransitionStyle,
      useTranslate3D
    )
  );
$:
  bulletStyles = items.map(
    (item, index) => getBulletStyle(index, currentIndex, item.bulletClass)
  );
$:
  showItems = items.map((_, index) => {
    const showItem = !lazyLoad || !!alignmentClasses[index] || lazyLoaded[index];
    if (showItem && lazyLoad && !lazyLoaded[index]) {
      dispatch("lazyload", index);
    }
    return showItem;
  });
</script>

<div class={slideWrapperClass} bind:this={elem}>
  <!-- TODO: render custom controls -->

  <!-- Slides -->
  {#if canSlide}
    {#if showNav}
      <LeftNav on:click={() => dispatch('slideleft')} disabled={!canSlideLeft} />
      <RightNav on:click={() => dispatch('slideright')} disabled={!canSlideRight} />
    {/if}
    <SwipeWrapper
      {canSlideLeft}
      {canSlideRight}
      {isTransitioning}
      {galleryWidth}
      {disableSwipe}
      {stopPropagation}
      {isRTL}
      {swipeThreshold}
      {flickThreshold}
      on:slideoffsetchanged={(e) => {
        isSwiping = true;
        currentSlideOffset = e.detail;
      }}
      on:swipeend={() => {
        isSwiping = false;
        currentSlideOffset = 0;
      }}
      on:swipeleft={() => {
        dispatch('slideleft');
      }}
      on:swiperight={() => {
        dispatch('slideright');
      }}
    >
      <div class="image-gallery-slides">
        {#each items as item, index}
          <Slide
            {index}
            alignment={alignmentClasses[index]}
            originalClass={item.originalClass}
            slideStyle={slideStyles[index]}
            showItem={showItems[index]}
            {item}
            isFullscreen={false}
            {containInPage}
            on:imageload={(event) => dispatch('imageload', { index, event })}
            on:imageerror={(event) => dispatch('imageerror', { index, event })}
            on:click
          />
        {/each}
      </div>
    </SwipeWrapper>
  {:else}
    <div class="image-gallery-slides">
      {#each items as item, index}
        <Slide
          {index}
          alignment={alignmentClasses[index]}
          originalClass={item.originalClass}
          slideStyle={slideStyles[index]}
          showItem={showItems[index]}
          {item}
          isFullscreen={false}
          {containInPage}
          on:imageload={(event) => dispatch('imageload', { index, event })}
          on:imageerror={(event) => dispatch('imageerror', { index, event })}
          on:click
        />
      {/each}
    </div>
  {/if}

  <!-- Play/pause button -->
  {#if showPlayButton}
    <PlayPause on:click={() => dispatch('playtoggle')} {isPlaying} />
  {/if}

  <!--  Bullets -->
  {#if showBullets}
    <div class="image-gallery-bullets">
      <div class="image-gallery-bullets-container" role="navigation" aria-label="Bullet Navigation">
        {#each items as _, index}
          <Bullet
            igBulletClass={bulletStyles[index]}
            {currentIndex}
            {index}
            on:click={() => dispatch('slidejump', index)}
          />
        {/each}
      </div>
    </div>
  {/if}

  <!-- Fullscreen button -->
  {#if showFullscreenButton}
    <Fullscreen on:click={() => dispatch('fullscreentoggle')} {isFullscreen} />
  {/if}

  <!-- Index -->
  {#if showIndex}
    <div class="image-gallery-index">
      <span class="image-gallery-index-current">
        {currentIndex + 1}
      </span>
      <span class="image-gallery-index-separator">
        {indexSeparator}
      </span>
      <span class="image-gallery-index-total">
        {items.length}
      </span>
    </div>
  {/if}
</div>
