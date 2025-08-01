import clsx from 'clsx';
export const getThumbnailPositionClassName = (thumbnailPosition) => {
    return ` image-gallery-thumbnails-${thumbnailPosition}`;
};
export const getThumbsTranslate = (thumbsElement, indexDifference, disableThumbnailScroll, thumbnailsWrapperWidth, thumbnailsWrapperHeight, isThumbnailVertical, numberItems) => {
    // the scroll space that is hidden on the left & right / top & bottom
    // when the screen is not large enough to fit all thumbnails
    let hiddenScroll;
    if (disableThumbnailScroll)
        return 0;
    if (thumbsElement) {
        // total scroll required to see the last thumbnail
        if (isThumbnailVertical) {
            if (thumbsElement.scrollHeight <= thumbnailsWrapperHeight) {
                return 0;
            }
            hiddenScroll = thumbsElement.scrollHeight - thumbnailsWrapperHeight;
        }
        else {
            if (thumbsElement.scrollWidth <= thumbnailsWrapperWidth || thumbnailsWrapperWidth <= 0) {
                return 0;
            }
            hiddenScroll = thumbsElement.scrollWidth - thumbnailsWrapperWidth;
        }
        // scroll-x or y required per index change
        const perIndexScroll = hiddenScroll / (numberItems - 1);
        return indexDifference * perIndexScroll;
    }
    return 0;
};
export const getTranslateXForTwoSlide = (index, currentIndex, currentSlideOffset, previousIndex) => {
    // For taking care of infinite swipe when there are only two slides\
    const indexChanged = currentIndex !== previousIndex;
    const firstSlideWasPrevSlide = index === 0 && previousIndex === 0;
    const secondSlideWasPrevSlide = index === 1 && previousIndex === 1;
    const firstSlideIsNextSlide = index === 0 && currentIndex === 1;
    const secondSlideIsNextSlide = index === 1 && currentIndex === 0;
    const swipingEnded = currentSlideOffset === 0;
    const baseTranslateX = -100 * currentIndex;
    let translateX = baseTranslateX + index * 100 + currentSlideOffset;
    // keep track of user swiping direction
    // important to understand how to translateX based on last direction
    let direction;
    if (currentSlideOffset > 0) {
        direction = 'left';
    }
    else {
        // TODO The original code stores the direction in a class variable
        //    and sets the direction only to right if currentSlideOffset < 0
        direction = 'right';
    }
    // when swiping between two slides make sure the next and prev slides
    // are on both left and right
    if (secondSlideIsNextSlide && currentSlideOffset > 0) {
        // swiping right
        translateX = -100 + currentSlideOffset;
    }
    if (firstSlideIsNextSlide && currentSlideOffset < 0) {
        // swiping left
        translateX = 100 + currentSlideOffset;
    }
    if (indexChanged) {
        // when indexChanged move the slide to the correct side
        if (firstSlideWasPrevSlide && swipingEnded && direction === 'left') {
            translateX = 100;
        }
        else if (secondSlideWasPrevSlide && swipingEnded && direction === 'right') {
            translateX = -100;
        }
    }
    else {
        // keep the slide on the correct side if the swipe was not successful
        if (secondSlideIsNextSlide && swipingEnded && direction === 'left') {
            translateX = -100;
        }
        if (firstSlideIsNextSlide && swipingEnded && direction === 'right') {
            translateX = 100;
        }
    }
    return translateX;
};
export const getIgClass = (modalFullscreen, additionalClass, currentlyUsingMouseOrKeyboard) => {
    return clsx('image-gallery', additionalClass, {
        'fullscreen-modal': modalFullscreen,
        'image-gallery-using-mouse': currentlyUsingMouseOrKeyboard === 'mouse'
    });
};
export const getIgContentClass = (isFullscreen, thumbnailPosition) => {
    return clsx('image-gallery-content', getThumbnailPositionClassName(thumbnailPosition), {
        fullscreen: isFullscreen
    });
};
export const getSlideWrapperClass = (isRTL, thumbnailPosition) => {
    return clsx('image-gallery-slide-wrapper', getThumbnailPositionClassName(thumbnailPosition), {
        'image-gallery-rtl': isRTL
    });
};
export const getSlideStyle = (index, currentIndex, previousIndex, numberItems, isRTL, currentSlideOffset, infinite, isSlideVisible, transitionStyle, useTranslate3D) => {
    const baseTranslateX = -100 * currentIndex;
    const totalSlides = numberItems - 1;
    // calculates where the other slides belong based on currentIndex
    // if it is RTL the base line should be reversed
    let translateX = (baseTranslateX + index * 100) * (isRTL ? -1 : 1) + currentSlideOffset;
    if (infinite && numberItems > 2) {
        if (currentIndex === 0 && index === totalSlides) {
            // make the last slide the slide before the first
            // if it is RTL the base line should be reversed
            translateX = -100 * (isRTL ? -1 : 1) + currentSlideOffset;
        }
        else if (currentIndex === totalSlides && index === 0) {
            // make the first slide the slide after the last
            // if it is RTL the base line should be reversed
            translateX = 100 * (isRTL ? -1 : 1) + currentSlideOffset;
        }
    }
    // Special case when there are only 2 items with infinite on
    if (infinite && numberItems === 2) {
        translateX = getTranslateXForTwoSlide(index, currentIndex, currentSlideOffset, previousIndex);
    }
    let translate = `translate(${translateX}%, 0)`;
    if (useTranslate3D) {
        translate = `translate3d(${translateX}%, 0, 0)`;
    }
    return `
      display: ${isSlideVisible ? 'inherit' : 'none'};
      WebkitTransform: ${translate};
      MozTransform: ${translate};
      msTransform: ${translate};
      OTransform: ${translate};
      transform: ${translate};
      transition: ${transitionStyle};
    `;
};
export const getBulletStyle = (index, currentIndex, itemBulletClass) => {
    return clsx('image-gallery-bullet', itemBulletClass, { active: currentIndex === index });
};
export const getAlignmentClassName = (index, currentIndex, infinite, numberItems) => {
    // Necessary for lazing loading
    let alignment = '';
    const leftClassName = 'image-gallery-left';
    const centerClassName = 'image-gallery-center';
    const rightClassName = 'image-gallery-right';
    switch (index) {
        case currentIndex - 1:
            alignment = ` ${leftClassName}`;
            break;
        case currentIndex:
            alignment = ` ${centerClassName}`;
            break;
        case currentIndex + 1:
            alignment = ` ${rightClassName}`;
            break;
        default:
            break;
    }
    if (numberItems >= 3 && infinite) {
        if (index === 0 && currentIndex === numberItems - 1) {
            // set first slide as right slide if were sliding right from last slide
            alignment = ` ${rightClassName}`;
        }
        else if (index === numberItems - 1 && currentIndex === 0) {
            // set last slide as left slide if were sliding left from first slide
            alignment = ` ${leftClassName}`;
        }
    }
    return alignment;
};
export const getThumbnailStyle = (isRTL, thumbsTranslate, isThumbnailVertical, useTranslate3D, thumbsStyle) => {
    let translate;
    const verticalTranslateValue = isRTL ? thumbsTranslate * -1 : thumbsTranslate;
    if (isThumbnailVertical) {
        translate = `translate(0, ${thumbsTranslate}px)`;
        if (useTranslate3D) {
            translate = `translate3d(0, ${thumbsTranslate}px, 0)`;
        }
    }
    else {
        translate = `translate(${verticalTranslateValue}px, 0)`;
        if (useTranslate3D) {
            translate = `translate3d(${verticalTranslateValue}px, 0, 0)`;
        }
    }
    return `
      WebkitTransform: ${translate};
      MozTransform: ${translate};
      msTransform: ${translate};
      OTransform: ${translate};
      transform: ${translate};
      ${thumbsStyle}
    `;
};
export const getIgThumbnailClass = (index, currentIndex, thumbnailClass) => {
    return clsx('image-gallery-thumbnail', thumbnailClass, { active: currentIndex === index });
};
