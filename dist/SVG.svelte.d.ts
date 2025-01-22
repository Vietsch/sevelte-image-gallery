import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        strokeWidth?: number | undefined;
        viewBox?: string | undefined;
        icon: 'left' | 'right' | 'maximize' | 'minimize' | 'play' | 'pause';
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export type SvgProps = typeof __propDef.props;
export type SvgEvents = typeof __propDef.events;
export type SvgSlots = typeof __propDef.slots;
export default class Svg extends SvelteComponentTyped<SvgProps, SvgEvents, SvgSlots> {
}
export {};
