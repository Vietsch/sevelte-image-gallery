import './app.css';
import type { Position, TItem } from './types';
interface $$__sveltets_2_IsomorphicComponent<Props extends Record<string, any> = any, Events extends Record<string, any> = any, Slots extends Record<string, any> = any, Exports = {}, Bindings = string> {
    new (options: import('svelte').ComponentConstructorOptions<Props>): import('svelte').SvelteComponent<Props, Events, Slots> & {
        $$bindings?: Bindings;
    } & Exports;
    (internal: unknown, props: Props & {
        $$events?: Events;
        $$slots?: Slots;
    }): Exports & {
        $set?: any;
        $on?: any;
    };
    z_$$bindings?: Bindings;
}
declare const ImageGallery: $$__sveltets_2_IsomorphicComponent<{
    flickThreshold?: number;
    items: TItem[];
    showNav?: boolean;
    autoPlay?: boolean;
    lazyLoad?: boolean;
    infinite?: boolean;
    showIndex?: boolean;
    showBullets?: boolean;
    showThumbnails?: boolean;
    showPlayButton?: boolean;
    showFullscreenButton?: boolean;
    disableThumbnailScroll?: boolean;
    disableKeyDown?: boolean;
    disableSwipe?: boolean;
    disableThumbnailSwipe?: boolean;
    useBrowserFullscreen?: boolean;
    onErrorImageURL?: string | undefined;
    indexSeparator?: string;
    thumbnailPosition?: Position;
    startIndex?: number;
    slideDuration?: number;
    slideInterval?: number;
    slideOnThumbnailOver?: boolean;
    swipeThreshold?: number;
    swipingTransitionDuration?: number;
    swipingThumbnailTransitionDuration?: number;
    /** TODO
      export let onClick: Function = null;
      export let onTouchMove: Function = null;
      export let onTouchEnd: Function = null;
      export let onTouchStart: Function = null;
      export let onMouseOver: Function = null;
      export let onMouseLeave: Function = null;
      export let onThumbnailError: Function = null;
      export let onThumbnailClick: Function = null;
      */ stopPropagation?: boolean;
    additionalClass?: string;
    useTranslate3D?: boolean;
    isRTL?: boolean;
    useWindowKeyDown?: boolean;
    containInPage?: boolean;
    slideToIndex?: (index: number) => void;
    play?: () => void;
    pause?: () => void;
    fullScreen?: () => void;
    exitFullScreen?: () => void;
    getCurrentIndex?: () => number;
}, {
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
}, {}, {
    slideToIndex: (index: number) => void;
    play: () => void;
    pause: () => void;
    fullScreen: () => void;
    exitFullScreen: () => void;
    getCurrentIndex: () => number;
}, string>;
type ImageGallery = InstanceType<typeof ImageGallery>;
export default ImageGallery;
