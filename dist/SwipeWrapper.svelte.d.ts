import { SvelteComponent } from "svelte";
declare const __propDef: {
    props: {
        disableSwipe: boolean;
        stopPropagation: boolean;
        swipeThreshold: number;
        flickThreshold: number;
        isRTL: boolean;
        galleryWidth: number;
        canSlideLeft: boolean;
        canSlideRight: boolean;
        isTransitioning: boolean;
    };
    events: {
        slideoffsetchanged: CustomEvent<any>;
        swipeend: CustomEvent<any>;
        swipeleft: CustomEvent<any>;
        swiperight: CustomEvent<any>;
    } & {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {};
    };
    exports?: {} | undefined;
    bindings?: string | undefined;
};
export type SwipeWrapperProps = typeof __propDef.props;
export type SwipeWrapperEvents = typeof __propDef.events;
export type SwipeWrapperSlots = typeof __propDef.slots;
export default class SwipeWrapper extends SvelteComponent<SwipeWrapperProps, SwipeWrapperEvents, SwipeWrapperSlots> {
}
export {};
