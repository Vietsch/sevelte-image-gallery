import { SvelteComponentTyped } from "svelte";
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
};
export type FullscreenProps = typeof __propDef.props;
export type FullscreenEvents = typeof __propDef.events;
export type FullscreenSlots = typeof __propDef.slots;
export default class Fullscreen extends SvelteComponentTyped<FullscreenProps, FullscreenEvents, FullscreenSlots> {
}
export {};
