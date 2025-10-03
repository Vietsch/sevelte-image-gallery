<script>import "./app.css";
import SlideWrapper from "./SlideWrapper.svelte";
import ThumbnailWrapper from "./ThumbnailWrapper.svelte";
import { createEventDispatcher, onMount } from "svelte";
import { debounce } from "throttle-debounce";
import { getIgClass, getIgContentClass, getSlideWrapperClass } from "./styling";
import Slide from "./Slide.svelte";
export let flickThreshold = 0.4;
export let items;
export let showNav = true;
export let autoPlay = false;
export let lazyLoad = false;
export let infinite = true;
export let showIndex = false;
export let showBullets = true;
export let showThumbnails = true;
export let showPlayButton = true;
export let showFullscreenButton = true;
export let disableThumbnailScroll = false;
export let disableKeyDown = false;
export let disableSwipe = false;
export let disableThumbnailSwipe = false;
export let useBrowserFullscreen = true;
export let onErrorImageURL = void 0;
export let indexSeparator = "/";
export let thumbnailPosition = "bottom";
export let startIndex = 0;
export let slideDuration = 450;
export let slideInterval = 3e3;
export let slideOnThumbnailOver = false;
export let swipeThreshold = 30;
export let swipingTransitionDuration = 0;
export let swipingThumbnailTransitionDuration = 0;
export let stopPropagation = false;
export let additionalClass = "";
export let useTranslate3D = true;
export let isRTL = false;
export let useWindowKeyDown = true;
export let containInPage = false;
let hardTransition = false;
$:
  defaultTransitionStyle = `transform ${slideDuration}ms ease-out`;
let noneTransitionStyle = "none";
$:
  swipingTransitionStyle = `transform ${swipingTransitionDuration}ms ease-out`;
$:
  transitionStyle = hardTransition ? noneTransitionStyle : defaultTransitionStyle;
let currentIndex = startIndex;
let direction = "";
$: {
  hardTransition = true;
  currentIndex = startIndex;
  setTimeout(() => {
    hardTransition = false;
  }, 50);
}
let previousIndex = startIndex;
let playPauseIntervalId = null;
let isPlaying = false;
let isFullscreen = false;
let modalFullscreen = false;
let isTransitioning = false;
let currentSlideOffset = 0;
let transitionTimer = null;
let galleryWidth = 1e3;
let gallerySlideWrapperHeight = 1e3;
let resizeSlideWrapperObserver;
let resizeThumbnailWrapperObserver;
let thumbnailMouseOverTimer = null;
let lazyLoaded = [];
let imageLoaded = [];
let currentlyUsingMouseOrKeyboard = "mouse";
$:
  canSlidePrevious = currentIndex > 0;
$:
  canSlideNext = currentIndex < items.length - 1;
$:
  canSlideLeft = infinite || (isRTL ? canSlideNext : canSlidePrevious);
$:
  canSlideRight = infinite || (isRTL ? canSlidePrevious : canSlideNext);
let imageGallery;
let slideWrapper;
let thumbnailWrapper;
const dispatch = createEventDispatcher();
let containerHeight;
let parentElement;
let screenOrientation = "";
function handleOrientationChange() {
  if (isFullscreen) {
    updateContainerHeight();
    handleResize();
  }
}
$:
  if (typeof window !== "undefined") {
    screenOrientation = window.screen.orientation?.type || (window.innerHeight > window.innerWidth ? "portrait" : "landscape");
  }
function slideLeft() {
  slideTo(isRTL ? "right" : "left");
}
function slideRight() {
  slideTo(isRTL ? "left" : "right");
}
function slideTo(direction2) {
  const nextIndex = currentIndex + (direction2 === "left" ? -1 : 1);
  slideToIndex(nextIndex);
}
export function slideToIndex(index) {
  if (!isTransitioning) {
    if (playPauseIntervalId) {
      _pause(false);
      _play(false);
    }
    const slideCount = items.length - 1;
    let nextIndex = index;
    if (index < 0) {
      nextIndex = slideCount;
    } else if (index > slideCount) {
      nextIndex = 0;
    }
    if (nextIndex !== currentIndex) {
      dispatch("beforeslide", { nextIndex });
    }
    isTransitioning = nextIndex !== currentIndex;
    previousIndex = currentIndex;
    currentIndex = nextIndex;
    thumbnailWrapper.slideThumbnailBar(currentIndex);
    currentSlideOffset = 0;
    onSliding();
  }
}
export function play() {
  _play();
}
export function pause() {
  _pause();
}
export function fullScreen() {
  _fullScreen();
}
export function exitFullScreen() {
  _exitFullScreen();
}
export function getCurrentIndex() {
  return currentIndex;
}
$:
  onSliding = () => {
    transitionTimer = window.setTimeout(() => {
      if (isTransitioning) {
        isTransitioning = false;
        thumbnailWrapper.resetSwipingThumbnail();
        dispatch("slide", { currentIndex });
      }
    }, slideDuration + 50);
  };
function handleKeyDown(event) {
  currentlyUsingMouseOrKeyboard = "keyboard";
  if (disableKeyDown)
    return;
  switch (event.code) {
    case "ArrowLeft":
      if (canSlideLeft) {
        slideLeft();
      }
      break;
    case "ArrowRight":
      if (canSlideRight) {
        slideRight();
      }
      break;
    case "Escape":
      if (isFullscreen && !useBrowserFullscreen) {
        _exitFullScreen();
      }
      break;
    default:
      break;
  }
}
function handleMouseDown() {
  currentlyUsingMouseOrKeyboard = "mouse";
}
$:
  togglePlay = () => {
    if (playPauseIntervalId) {
      _pause();
    } else {
      _play();
    }
  };
$:
  pauseOrPlay = () => {
    if (!infinite && !canSlideRight) {
      _pause();
    } else {
      slideToIndex(currentIndex + 1);
    }
  };
$:
  _play = (shouldCallOnPlay = true) => {
    if (!playPauseIntervalId) {
      isPlaying = true;
      playPauseIntervalId = window.setInterval(pauseOrPlay, Math.max(slideInterval, slideDuration));
      if (shouldCallOnPlay) {
        dispatch("play", { currentIndex });
      }
    }
  };
$:
  _pause = (shouldCallOnPause = true) => {
    if (playPauseIntervalId) {
      window.clearInterval(playPauseIntervalId);
      playPauseIntervalId = null;
      isPlaying = false;
      if (shouldCallOnPause) {
        dispatch("pause", { currentIndex });
      }
    }
  };
$:
  toggleFullscreen = () => {
    if (isFullscreen) {
      _exitFullScreen();
    } else {
      _fullScreen();
    }
  };
$:
  _requestFullscreenAPI = (element) => {
    if (element.requestFullscreen) {
      element.requestFullscreen();
    } else if (element.mozRequestFullScreen) {
      element.mozRequestFullScreen();
    } else if (element.webkitRequestFullscreen) {
      element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) {
      element.msRequestFullscreen();
    }
  };
$:
  _exitFullScreenAPI = () => {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }
  };
$:
  _fullScreen = () => {
    if (useBrowserFullscreen) {
      _requestFullscreenAPI(imageGallery);
    } else {
      modalFullscreen = true;
    }
    isFullscreen = true;
    if (thumbnailWrapper) {
      thumbnailWrapper.slideThumbnailBar(currentIndex);
    }
    dispatch("screenchange", { fullscreen: true });
  };
$:
  _exitFullScreen = () => {
    if (isFullscreen) {
      if (useBrowserFullscreen) {
        _exitFullScreenAPI();
      } else {
        modalFullscreen = false;
      }
      isFullscreen = false;
      slideToIndex(0);
      dispatch("screenchange", { fullscreen: false });
    }
  };
$:
  handleImageLoad = (customEvent) => {
    const index = customEvent.detail.index;
    const event = customEvent.detail.event;
    const imageExists = imageLoaded[index];
    if (!imageExists) {
      imageLoaded[index] = true;
      dispatch("imageload", { index, event });
    }
  };
$:
  handleImageError = (customEvent) => {
    const index = customEvent.detail.index;
    const event = customEvent.detail.event;
    if (onErrorImageURL && !event.target.src.includes(onErrorImageURL)) {
      event.target.src = onErrorImageURL;
    }
    dispatch("imageerror", { index, event });
  };
$:
  handleScreenChange = () => {
    const fullScreenElement = document.fullscreenElement;
    const _isFullscreen = imageGallery === fullScreenElement;
    dispatch("screenchange", { fullscreen: _isFullscreen });
    if (useBrowserFullscreen) {
      isFullscreen = _isFullscreen;
    }
  };
$:
  igClass = getIgClass(modalFullscreen, additionalClass, currentlyUsingMouseOrKeyboard);
$:
  igContentClass = getIgContentClass(isFullscreen, thumbnailPosition);
$:
  slideWrapperClass = getSlideWrapperClass(isRTL, thumbnailPosition);
onMount(async () => {
  initSlideWrapperResizeObserver();
  initThumbnailWrapperResizeObserver();
  if (autoPlay) {
    _play();
  }
  parentElement = imageGallery.parentElement;
  if (parentElement) {
    updateContainerHeight();
  }
  const resizeObserver = new ResizeObserver(() => {
    updateContainerHeight();
  });
  resizeObserver.observe(parentElement);
  return () => {
    resizeObserver.disconnect();
  };
});
function initSlideWrapperResizeObserver() {
  if (!slideWrapper) {
    return;
  }
  resizeSlideWrapperObserver = new ResizeObserver(
    debounce(50, (entries) => {
      if (!entries)
        return;
      entries.forEach((entry) => {
        thumbnailWrapper.handleResizeWidth(entry.contentRect.width);
        handleResize();
      });
    })
  );
  resizeSlideWrapperObserver.observe(slideWrapper.getElem());
}
function initThumbnailWrapperResizeObserver() {
  if (!thumbnailWrapper) {
    return;
  }
  resizeThumbnailWrapperObserver = new ResizeObserver(
    debounce(50, (entries) => {
      if (!entries)
        return;
      entries.forEach((entry) => {
        thumbnailWrapper.handleResizeHeight(entry.contentRect.height);
        handleResize();
      });
    })
  );
  resizeThumbnailWrapperObserver.observe(thumbnailWrapper.getElem());
}
$:
  handleResize = () => {
    if (!imageGallery) {
      return;
    }
    if (imageGallery) {
      galleryWidth = imageGallery.offsetWidth;
    }
    const slideWrapperDiv = slideWrapper.getElem();
    if (slideWrapperDiv) {
      gallerySlideWrapperHeight = slideWrapperDiv.offsetHeight;
    }
  };
$:
  onThumbnailMouseOver = (event) => {
    const index = event.detail;
    if (thumbnailMouseOverTimer) {
      window.clearTimeout(thumbnailMouseOverTimer);
      thumbnailMouseOverTimer = null;
    }
    thumbnailMouseOverTimer = window.setTimeout(() => {
      slideToIndex(index);
      _pause();
    }, 300);
  };
$:
  onThumbnailMouseLeave = () => {
    if (thumbnailMouseOverTimer) {
      window.clearTimeout(thumbnailMouseOverTimer);
      thumbnailMouseOverTimer = null;
      if (autoPlay) {
        _play();
      }
    }
  };
$:
  onLazyLoad = (event) => {
    lazyLoaded[event.detail] = true;
  };
function updateContainerHeight() {
  if (containInPage && parentElement) {
    const parentRect = parentElement.getBoundingClientRect();
    const computedStyle = window.getComputedStyle(parentElement);
    const verticalMargins = parseFloat(computedStyle.marginTop) + parseFloat(computedStyle.marginBottom);
    containerHeight = parentRect.height - verticalMargins;
  } else {
    containerHeight = 0;
  }
}
</script>

<div
  class={igClass}
  aria-live="polite"
  role="region"
  bind:this={imageGallery}
  style={containInPage ? `max-height: ${containerHeight}px;` : ''}
  class:contain-in-page={containInPage || isFullscreen}
  class:fullscreen-portrait={isFullscreen && screenOrientation.includes('portrait')}
  class:fullscreen-landscape={isFullscreen && screenOrientation.includes('landscape')}
  on:keydown={!useWindowKeyDown ? handleKeyDown : undefined}
  on:mousedown={handleMouseDown}
>
  <div class={igContentClass}>
    {#if thumbnailPosition === 'bottom' || thumbnailPosition === 'right'}
      <SlideWrapper
        bind:this={slideWrapper}
        {slideWrapperClass}
        {items}
        {containInPage}
        {showNav}
        {showBullets}
        {showIndex}
        {currentIndex}
        {previousIndex}
        {infinite}
        {isRTL}
        {isFullscreen}
        {showFullscreenButton}
        {isPlaying}
        {showPlayButton}
        {currentSlideOffset}
        {isTransitioning}
        {galleryWidth}
        {disableSwipe}
        {stopPropagation}
        {indexSeparator}
        {lazyLoad}
        {lazyLoaded}
        {swipeThreshold}
        {flickThreshold}
        {transitionStyle}
        {swipingTransitionStyle}
        {useTranslate3D}
        on:slideleft={() => slideLeft()}
        on:slideright={() => slideRight()}
        on:slidejump={(event) => {
          slideToIndex(event.detail);
        }}
        on:playtoggle={togglePlay}
        on:fullscreentoggle={toggleFullscreen}
        on:lazyload={onLazyLoad}
        on:imageload={handleImageLoad}
        on:imageerror={handleImageError}
        on:click
      />
    {/if}
    {#if showThumbnails}
      <ThumbnailWrapper
        bind:this={thumbnailWrapper}
        {items}
        {currentIndex}
        {useTranslate3D}
        {isRTL}
        {thumbnailPosition}
        {slideDuration}
        {disableThumbnailScroll}
        {stopPropagation}
        {swipingThumbnailTransitionDuration}
        {disableThumbnailSwipe}
        {gallerySlideWrapperHeight}
        on:slidejump={(event) => {
          slideToIndex(event.detail);
        }}
        on:thumbnailmouseover={slideOnThumbnailOver ? onThumbnailMouseOver : undefined}
        on:thumbnailmouseleave={slideOnThumbnailOver ? onThumbnailMouseLeave : undefined}
        on:imageerror={handleImageError}
      />
    {/if}
    {#if thumbnailPosition === 'top' || thumbnailPosition === 'left'}
      <SlideWrapper
        bind:this={slideWrapper}
        {slideWrapperClass}
        {items}
        {containInPage}
        {showNav}
        {showBullets}
        {showIndex}
        {currentIndex}
        {previousIndex}
        {infinite}
        {isRTL}
        {isFullscreen}
        {showFullscreenButton}
        {isPlaying}
        {showPlayButton}
        {currentSlideOffset}
        {isTransitioning}
        {galleryWidth}
        {disableSwipe}
        {stopPropagation}
        {indexSeparator}
        {lazyLoad}
        {lazyLoaded}
        {swipeThreshold}
        {flickThreshold}
        {transitionStyle}
        {swipingTransitionStyle}
        {useTranslate3D}
        on:slideleft={() => slideLeft()}
        on:slideright={() => slideRight()}
        on:slidejump={(event) => {
          slideToIndex(event.detail);
        }}
        on:playtoggle={togglePlay}
        on:fullscreentoggle={toggleFullscreen}
        on:lazyload={onLazyLoad}
        on:imageload={handleImageLoad}
        on:imageerror={handleImageError}
        on:click
      />
    {/if}
  </div>
</div>

<style>
  /* Fullscreen mobile styles */
  .fullscreen-portrait :global(img) {
    max-height: 100vh !important;
    max-width: 100vw !important;
    width: auto !important;
    height: auto !important;
    object-fit: contain !important;
  }
  
  .fullscreen-landscape :global(img) {
    max-width: 100vw !important;
    max-height: 100vh !important;
    width: auto !important;
    height: auto !important;
    object-fit: contain !important;
  }
  
  /* Ensure fullscreen container takes full viewport */
  .fullscreen-portrait,
  .fullscreen-landscape {
    width: 100vw !important;
    height: 100vh !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    background: black !important;
    margin: 0 !important;
    padding: 0 !important;
  }
  
  /* Ensure content fills available space */
  .fullscreen-portrait :global(.image-gallery-content),
  .fullscreen-landscape :global(.image-gallery-content) {
    width: 100% !important;
    height: 100% !important;
  }
</style>

<svelte:window
  on:keydown={useWindowKeyDown ? handleKeyDown : undefined}
  on:fullscreenchange={handleScreenChange}
  on:orientationchange={handleOrientationChange}
  on:resize={handleOrientationChange}
/>
