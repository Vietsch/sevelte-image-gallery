import { SvelteComponent } from "svelte";
import type { Position } from './types';
declare const __propDef: {
    props: {
        disableThumbnailSwipe: boolean;
        stopPropagation: boolean;
        isThumbnailVertical: boolean;
        thumbnailPosition: Position;
        isRTL: boolean;
        thumbnailsWrapperHeight: number;
        thumbnailsWrapperWidth: number;
        thumbsElementScrollHeight: number;
        thumbsElementScrollWidth: number;
        thumbsSwipedTranslate: number;
    };
    events: {
        thumbsslideoffset: CustomEvent<any>;
        thumbnailswiped: CustomEvent<any>;
    } & {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {};
    };
    exports?: {} | undefined;
    bindings?: string | undefined;
};
export type ThumbnailSwipeWrapperProps = typeof __propDef.props;
export type ThumbnailSwipeWrapperEvents = typeof __propDef.events;
export type ThumbnailSwipeWrapperSlots = typeof __propDef.slots;
export default class ThumbnailSwipeWrapper extends SvelteComponent<ThumbnailSwipeWrapperProps, ThumbnailSwipeWrapperEvents, ThumbnailSwipeWrapperSlots> {
}
export {};
