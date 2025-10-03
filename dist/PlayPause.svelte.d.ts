import { SvelteComponent } from "svelte";
declare const __propDef: {
    props: {
        isPlaying: boolean;
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
export type PlayPauseProps = typeof __propDef.props;
export type PlayPauseEvents = typeof __propDef.events;
export type PlayPauseSlots = typeof __propDef.slots;
export default class PlayPause extends SvelteComponent<PlayPauseProps, PlayPauseEvents, PlayPauseSlots> {
}
export {};
