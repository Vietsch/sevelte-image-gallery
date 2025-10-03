import { SvelteComponent } from "svelte";
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
        src?: string;
        alt?: string;
        active?: boolean;
        direction?: string;
        containInPage?: boolean;
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
    exports?: {} | undefined;
    bindings?: string | undefined;
};
export type SlideProps = typeof __propDef.props;
export type SlideEvents = typeof __propDef.events;
export type SlideSlots = typeof __propDef.slots;
export default class Slide extends SvelteComponent<SlideProps, SlideEvents, SlideSlots> {
}
export {};
