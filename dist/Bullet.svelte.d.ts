import { SvelteComponent } from "svelte";
declare const __propDef: {
    props: {
        igBulletClass: string;
        currentIndex: number;
        index: number;
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
export type BulletProps = typeof __propDef.props;
export type BulletEvents = typeof __propDef.events;
export type BulletSlots = typeof __propDef.slots;
export default class Bullet extends SvelteComponent<BulletProps, BulletEvents, BulletSlots> {
}
export {};
