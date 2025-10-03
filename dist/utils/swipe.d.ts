export type SwipeDirection = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';
export interface SwipeEventData {
    event: TouchEvent | MouseEvent;
    absX: number;
    absY: number;
    dir: SwipeDirection;
    velocity: number;
}
export interface SwipeOptions {
    delta?: number;
    preventDefault?: boolean;
    stopPropagation?: boolean;
}
export declare function createSwipeable(element: HTMLElement, options?: SwipeOptions, callbacks?: {
    onSwiping?: (data: SwipeEventData) => void;
    onSwiped?: (data: SwipeEventData) => void;
}): () => void;
export declare function swipeable(node: HTMLElement, options?: SwipeOptions & {
    onSwiping?: (data: SwipeEventData) => void;
    onSwiped?: (data: SwipeEventData) => void;
}): {
    destroy: () => void;
    update(newOptions: typeof options): () => void;
};
