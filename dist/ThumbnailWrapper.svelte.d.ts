import { SvelteComponent } from "svelte";
import type { Position, TItem } from './types';
declare const __propDef: {
    props: {
        items: TItem[];
        currentIndex: number;
        useTranslate3D: boolean;
        isRTL: boolean;
        thumbnailPosition: Position;
        stopPropagation: boolean;
        disableThumbnailScroll: boolean;
        disableThumbnailSwipe: boolean;
        slideDuration: number;
        swipingThumbnailTransitionDuration: number;
        gallerySlideWrapperHeight: number;
        getElem?: () => Element;
        resetSwipingThumbnail?: () => void;
        handleResizeWidth?: (newWidth: number) => void;
        handleResizeHeight?: (newHeight: number) => void;
        slideThumbnailBar?: (newIndex: number) => void;
        resetThumbnailPosition?: () => void;
    };
    events: {
        slidejump: CustomEvent<any>;
        thumbnailmouseover: CustomEvent<any>;
        thumbnailmouseleave: CustomEvent<any>;
        imageerror: CustomEvent<any>;
    } & {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
    exports?: {} | undefined;
    bindings?: string | undefined;
};
export type ThumbnailWrapperProps = typeof __propDef.props;
export type ThumbnailWrapperEvents = typeof __propDef.events;
export type ThumbnailWrapperSlots = typeof __propDef.slots;
export default class ThumbnailWrapper extends SvelteComponent<ThumbnailWrapperProps, ThumbnailWrapperEvents, ThumbnailWrapperSlots> {
    get getElem(): () => Element;
    get resetSwipingThumbnail(): () => void;
    get handleResizeWidth(): (newWidth: number) => void;
    get handleResizeHeight(): (newHeight: number) => void;
    get slideThumbnailBar(): (newIndex: number) => void;
    get resetThumbnailPosition(): () => void;
}
export {};
