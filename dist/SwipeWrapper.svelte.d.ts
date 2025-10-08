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
type $$__sveltets_2_PropsWithChildren<Props, Slots> = Props & (Slots extends {
    default: any;
} ? Props extends Record<string, never> ? any : {
    children?: any;
} : {});
declare const SwipeWrapper: $$__sveltets_2_IsomorphicComponent<$$__sveltets_2_PropsWithChildren<{
    disableSwipe: boolean;
    stopPropagation: boolean;
    swipeThreshold: number;
    flickThreshold: number;
    isRTL: boolean;
    galleryWidth: number;
    canSlideLeft: boolean;
    canSlideRight: boolean;
    isTransitioning: boolean;
}, {
    default: {};
}>, {
    slideoffsetchanged: CustomEvent<any>;
    swipeend: CustomEvent<any>;
    swipeleft: CustomEvent<any>;
    swiperight: CustomEvent<any>;
} & {
    [evt: string]: CustomEvent<any>;
}, {
    default: {};
}, {}, string>;
type SwipeWrapper = InstanceType<typeof SwipeWrapper>;
export default SwipeWrapper;
