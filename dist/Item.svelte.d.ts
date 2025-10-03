import { SvelteComponent } from "svelte";
declare const __propDef: {
    props: {
        [x: string]: any;
        original: string | undefined;
        fullscreen: string | undefined;
        description?: string | undefined;
        isFullscreen?: boolean | undefined;
        originalAlt?: string | undefined;
        originalHeight: number | undefined;
        originalWidth: number | undefined;
        originalTitle?: string | undefined;
        sizes?: string | undefined;
        srcset?: string | undefined;
        loading?: "eager" | "lazy" | undefined;
        contain?: boolean | undefined;
    };
    events: {
        imageload: CustomEvent<any>;
        imageerror: CustomEvent<any>;
    } & {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
    exports?: undefined;
    bindings?: undefined;
};
export type ItemProps = typeof __propDef.props;
export type ItemEvents = typeof __propDef.events;
export type ItemSlots = typeof __propDef.slots;
export default class Item extends SvelteComponent<ItemProps, ItemEvents, ItemSlots> {
}
export {};
