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
declare const Item: $$__sveltets_2_IsomorphicComponent<{
    [x: string]: any;
    original: string | undefined;
    fullscreen: string | undefined;
    description?: string | undefined;
    isFullscreen?: boolean | undefined;
    originalAlt?: string | undefined;
    originalHeight: number | undefined;
    originalWidth: number | undefined;
    originalTitle?: string | undefined;
    sizes?: string | undefined;
    srcset?: string | undefined;
    loading?: "eager" | "lazy" | undefined;
    contain?: boolean | undefined;
}, {
    imageload: CustomEvent<any>;
    imageerror: CustomEvent<any>;
} & {
    [evt: string]: CustomEvent<any>;
}, {}, {}, string>;
type Item = InstanceType<typeof Item>;
export default Item;
