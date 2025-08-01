import { SvelteComponentTyped } from "svelte";
import type { TItem } from './types';
declare const __propDef: {
    props: {
        index: number;
        alignment: string;
        originalClass: string | undefined;
        slideStyle: string;
        showItem: boolean;
        item: TItem;
        isFullscreen: boolean;
        src?: string | undefined;
        alt?: string | undefined;
        active?: boolean | undefined;
        direction?: string | undefined;
        containInPage?: boolean | undefined;
    };
    events: {
        imageerror: CustomEvent<any>;
        click: CustomEvent<any>;
        touchmove: CustomEvent<any>;
        touchend: CustomEvent<any>;
        touchstart: CustomEvent<any>;
        mouseover: CustomEvent<any>;
        focus: CustomEvent<any>;
        mouseleave: CustomEvent<any>;
    } & {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export type SlideProps = typeof __propDef.props;
export type SlideEvents = typeof __propDef.events;
export type SlideSlots = typeof __propDef.slots;
export default class Slide extends SvelteComponentTyped<SlideProps, SlideEvents, SlideSlots> {
}
export {};
