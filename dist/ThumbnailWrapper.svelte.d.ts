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
declare const ThumbnailWrapper: $$__sveltets_2_IsomorphicComponent<{
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
}, {
    slidejump: CustomEvent<any>;
    thumbnailmouseover: CustomEvent<any>;
    thumbnailmouseleave: CustomEvent<any>;
    imageerror: CustomEvent<any>;
} & {
    [evt: string]: CustomEvent<any>;
}, {}, {
    getElem: () => Element;
    resetSwipingThumbnail: () => void;
    handleResizeWidth: (newWidth: number) => void;
    handleResizeHeight: (newHeight: number) => void;
    slideThumbnailBar: (newIndex: number) => void;
    resetThumbnailPosition: () => void;
}, string>;
type ThumbnailWrapper = InstanceType<typeof ThumbnailWrapper>;
export default ThumbnailWrapper;
