import type { TItem } from './types';
interface $$__sveltets_2_IsomorphicComponent<Props extends Record<string, any> = any, Events extends Record<string, any> = any, Slots extends Record<string, any> = any, Exports = {}, Bindings = string> {
    new (options: import('svelte').ComponentConstructorOptions<Props>): import('svelte').SvelteComponent<Props, Events, Slots> & {
        $$bindings?: Bindings;
    } & Exports;
    (internal: unknown, props: Props & {
        $$events?: Events;
        $$slots?: Slots;
    }): Exports & {
        $set?: any;
        $on?: any;
    };
    z_$$bindings?: Bindings;
}
declare const Thumbnail: $$__sveltets_2_IsomorphicComponent<{
    index: number;
    currentIndex: number;
    igThumbnailClass: string;
    item: TItem;
}, {
    mouseleave: CustomEvent<any>;
    mouseover: CustomEvent<any>;
    focus: CustomEvent<any>;
    keyup: CustomEvent<any>;
    click: CustomEvent<any>;
    imageerror: CustomEvent<any>;
} & {
    [evt: string]: CustomEvent<any>;
}, {}, {}, string>;
type Thumbnail = InstanceType<typeof Thumbnail>;
export default Thumbnail;
