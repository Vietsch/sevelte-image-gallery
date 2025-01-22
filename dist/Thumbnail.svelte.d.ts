import { SvelteComponentTyped } from "svelte";
import type { TItem } from './types';
declare const __propDef: {
    props: {
        index: number;
        currentIndex: number;
        igThumbnailClass: string;
        item: TItem;
    };
    events: {
        mouseleave: CustomEvent<any>;
        mouseover: CustomEvent<any>;
        focus: CustomEvent<any>;
        keyup: CustomEvent<any>;
        click: CustomEvent<any>;
        imageerror: CustomEvent<any>;
    } & {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export type ThumbnailProps = typeof __propDef.props;
export type ThumbnailEvents = typeof __propDef.events;
export type ThumbnailSlots = typeof __propDef.slots;
export default class Thumbnail extends SvelteComponentTyped<ThumbnailProps, ThumbnailEvents, ThumbnailSlots> {
}
export {};
