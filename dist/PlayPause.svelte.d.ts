import { SvelteComponentTyped } from "svelte";
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
};
export type PlayPauseProps = typeof __propDef.props;
export type PlayPauseEvents = typeof __propDef.events;
export type PlayPauseSlots = typeof __propDef.slots;
export default class PlayPause extends SvelteComponentTyped<PlayPauseProps, PlayPauseEvents, PlayPauseSlots> {
}
export {};
