import { SvelteComponent } from "svelte";
declare const __propDef: {
    props: {
        strokeWidth?: number;
        viewBox?: string;
        icon: "left" | "right" | "maximize" | "minimize" | "play" | "pause";
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
    exports?: {} | undefined;
    bindings?: string | undefined;
};
export type SvgProps = typeof __propDef.props;
export type SvgEvents = typeof __propDef.events;
export type SvgSlots = typeof __propDef.slots;
export default class Svg extends SvelteComponent<SvgProps, SvgEvents, SvgSlots> {
}
export {};
