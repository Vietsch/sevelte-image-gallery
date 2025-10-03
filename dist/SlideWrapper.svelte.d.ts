import { SvelteComponent } from "svelte";
import type { TItem } from './types';
declare const __propDef: {
    props: {
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
    };
    events: {
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
    };
    slots: {};
    exports?: {} | undefined;
    bindings?: string | undefined;
};
export type SlideWrapperProps = typeof __propDef.props;
export type SlideWrapperEvents = typeof __propDef.events;
export type SlideWrapperSlots = typeof __propDef.slots;
export default class SlideWrapper extends SvelteComponent<SlideWrapperProps, SlideWrapperEvents, SlideWrapperSlots> {
    get getElem(): () => HTMLElement;
}
export {};
