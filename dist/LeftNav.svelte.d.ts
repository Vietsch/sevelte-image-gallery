import { SvelteComponent } from "svelte";
declare const __propDef: {
    props: {
        disabled: boolean;
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
export type LeftNavProps = typeof __propDef.props;
export type LeftNavEvents = typeof __propDef.events;
export type LeftNavSlots = typeof __propDef.slots;
export default class LeftNav extends SvelteComponent<LeftNavProps, LeftNavEvents, LeftNavSlots> {
}
export {};
