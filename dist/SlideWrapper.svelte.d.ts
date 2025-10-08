import type { TItem } from './types';
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
declare const SlideWrapper: $$__sveltets_2_IsomorphicComponent<{
    slideWrapperClass: string;
    items: TItem[];
    showNav: boolean;
    showBullets: boolean;
    showIndex: boolean;
    previousIndex: number;
    currentIndex: number;
    isTransitioning: boolean;
    infinite: boolean;
    isRTL: boolean;
    isPlaying: boolean;
    showPlayButton: boolean;
    isFullscreen: boolean;
    showFullscreenButton: boolean;
    disableSwipe: boolean;
    stopPropagation: boolean;
    currentSlideOffset: number;
    galleryWidth: number;
    indexSeparator: string;
    lazyLoad: boolean;
    lazyLoaded: boolean[];
    swipeThreshold: number;
    flickThreshold: number;
    transitionStyle: string;
    swipingTransitionStyle: string;
    useTranslate3D: boolean;
    containInPage?: boolean;
    getElem?: () => HTMLElement;
}, {
    click: CustomEvent<any>;
    slideleft: CustomEvent<any>;
    slideright: CustomEvent<any>;
    imageload: CustomEvent<any>;
    imageerror: CustomEvent<any>;
    playtoggle: CustomEvent<any>;
    slidejump: CustomEvent<any>;
    fullscreentoggle: CustomEvent<any>;
    lazyload: CustomEvent<any>;
} & {
    [evt: string]: CustomEvent<any>;
}, {}, {
    getElem: () => HTMLElement;
}, string>;
type SlideWrapper = InstanceType<typeof SlideWrapper>;
export default SlideWrapper;
