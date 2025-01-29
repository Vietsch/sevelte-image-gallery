import { SvelteComponentTyped } from "svelte";
import './app.css';
import type { Position, TItem } from './types';
declare const __propDef: {
    props: {
        flickThreshold?: number | undefined;
        items: TItem[];
        showNav?: boolean | undefined;
        autoPlay?: boolean | undefined;
        lazyLoad?: boolean | undefined;
        infinite?: boolean | undefined;
        showIndex?: boolean | undefined;
        showBullets?: boolean | undefined;
        showThumbnails?: boolean | undefined;
        showPlayButton?: boolean | undefined;
        showFullscreenButton?: boolean | undefined;
        disableThumbnailScroll?: boolean | undefined;
        disableKeyDown?: boolean | undefined;
        disableSwipe?: boolean | undefined;
        disableThumbnailSwipe?: boolean | undefined;
        useBrowserFullscreen?: boolean | undefined;
        onErrorImageURL?: string | undefined;
        indexSeparator?: string | undefined;
        thumbnailPosition?: Position | undefined;
        startIndex?: number | undefined;
        slideDuration?: number | undefined;
        slideInterval?: number | undefined;
        slideOnThumbnailOver?: boolean | undefined;
        swipeThreshold?: number | undefined;
        swipingTransitionDuration?: number | undefined;
        swipingThumbnailTransitionDuration?: number | undefined;
        /** TODO
          export let onClick: Function = null;
          export let onTouchMove: Function = null;
          export let onTouchEnd: Function = null;
          export let onTouchStart: Function = null;
          export let onMouseOver: Function = null;
          export let onMouseLeave: Function = null;
          export let onThumbnailError: Function = null;
          export let onThumbnailClick: Function = null;
          */ stopPropagation?: boolean | undefined;
        additionalClass?: string | undefined;
        useTranslate3D?: boolean | undefined;
        isRTL?: boolean | undefined;
        useWindowKeyDown?: boolean | undefined;
        containInPage?: boolean | undefined;
        slideToIndex?: ((index: number) => void) | undefined;
        play?: (() => void) | undefined;
        pause?: (() => void) | undefined;
        fullScreen?: (() => void) | undefined;
        exitFullScreen?: (() => void) | undefined;
        getCurrentIndex?: (() => number) | undefined;
    };
    events: {
        click: CustomEvent<any>;
        beforeslide: CustomEvent<any>;
        slide: CustomEvent<any>;
        play: CustomEvent<any>;
        pause: CustomEvent<any>;
        screenchange: CustomEvent<any>;
        imageload: CustomEvent<any>;
        imageerror: CustomEvent<any>;
    } & {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export type ImageGalleryProps = typeof __propDef.props;
export type ImageGalleryEvents = typeof __propDef.events;
export type ImageGallerySlots = typeof __propDef.slots;
export default class ImageGallery extends SvelteComponentTyped<ImageGalleryProps, ImageGalleryEvents, ImageGallerySlots> {
    get slideToIndex(): (index: number) => void;
    get play(): () => void;
    get pause(): () => void;
    get fullScreen(): () => void;
    get exitFullScreen(): () => void;
    get getCurrentIndex(): () => number;
}
export {};
