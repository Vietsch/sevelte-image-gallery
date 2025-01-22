import { SvelteComponentTyped } from "svelte";
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
};
export type RightNavProps = typeof __propDef.props;
export type RightNavEvents = typeof __propDef.events;
export type RightNavSlots = typeof __propDef.slots;
export default class RightNav extends SvelteComponentTyped<RightNavProps, RightNavEvents, RightNavSlots> {
}
export {};
