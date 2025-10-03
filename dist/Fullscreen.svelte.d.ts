import { SvelteComponent } from "svelte";
declare const __propDef: {
    props: {
        isFullscreen: boolean;
    };
    events: {
        click: CustomEvent<any>;
    } & {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
    exports?: {} | undefined;
    bindings?: string | undefined;
};
export type FullscreenProps = typeof __propDef.props;
export type FullscreenEvents = typeof __propDef.events;
export type FullscreenSlots = typeof __propDef.slots;
export default class Fullscreen extends SvelteComponent<FullscreenProps, FullscreenEvents, FullscreenSlots> {
}
export {};
