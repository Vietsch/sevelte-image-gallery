export function createSwipeable(element, options = {}, callbacks = {}) {
    const { delta = 10, preventDefault = false, stopPropagation = false } = options;
    let startX = 0;
    let startY = 0;
    let startTime = 0;
    let isSwiping = false;
    let lastX = 0;
    let lastY = 0;
    let lastTime = 0;
    function getDirection(deltaX, deltaY) {
        const absX = Math.abs(deltaX);
        const absY = Math.abs(deltaY);
        if (absX > absY) {
            return deltaX > 0 ? 'RIGHT' : 'LEFT';
        }
        else {
            return deltaY > 0 ? 'DOWN' : 'UP';
        }
    }
    function calculateVelocity(deltaX, deltaY, deltaTime) {
        if (deltaTime === 0)
            return 0;
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        return distance / deltaTime;
    }
    function handleStart(event) {
        const touch = 'touches' in event ? event.touches[0] : event;
        startX = touch.clientX;
        startY = touch.clientY;
        startTime = Date.now();
        lastX = startX;
        lastY = startY;
        lastTime = startTime;
        isSwiping = false;
        if (preventDefault) {
            event.preventDefault();
        }
        if (stopPropagation) {
            event.stopPropagation();
        }
    }
    function handleMove(event) {
        if (!startX && !startY)
            return;
        const touch = 'touches' in event ? event.touches[0] : event;
        const deltaX = touch.clientX - startX;
        const deltaY = touch.clientY - startY;
        const currentTime = Date.now();
        const deltaTime = currentTime - lastTime;
        // Check if we've moved enough to start swiping
        if (!isSwiping && (Math.abs(deltaX) > delta || Math.abs(deltaY) > delta)) {
            isSwiping = true;
        }
        if (isSwiping) {
            const direction = getDirection(deltaX, deltaY);
            const velocity = calculateVelocity(touch.clientX - lastX, touch.clientY - lastY, deltaTime);
            const swipeData = {
                event,
                absX: Math.abs(deltaX),
                absY: Math.abs(deltaY),
                dir: direction,
                velocity
            };
            callbacks.onSwiping?.(swipeData);
        }
        lastX = touch.clientX;
        lastY = touch.clientY;
        lastTime = currentTime;
        if (preventDefault) {
            event.preventDefault();
        }
        if (stopPropagation) {
            event.stopPropagation();
        }
    }
    function handleEnd(event) {
        if (!isSwiping) {
            startX = 0;
            startY = 0;
            return;
        }
        const touch = 'changedTouches' in event ? event.changedTouches[0] : event;
        const deltaX = touch.clientX - startX;
        const deltaY = touch.clientY - startY;
        const deltaTime = Date.now() - startTime;
        const direction = getDirection(deltaX, deltaY);
        const velocity = calculateVelocity(deltaX, deltaY, deltaTime);
        const swipeData = {
            event,
            absX: Math.abs(deltaX),
            absY: Math.abs(deltaY),
            dir: direction,
            velocity
        };
        callbacks.onSwiped?.(swipeData);
        // Reset
        startX = 0;
        startY = 0;
        isSwiping = false;
        if (preventDefault) {
            event.preventDefault();
        }
        if (stopPropagation) {
            event.stopPropagation();
        }
    }
    // Touch events
    element.addEventListener('touchstart', handleStart, { passive: !preventDefault });
    element.addEventListener('touchmove', handleMove, { passive: !preventDefault });
    element.addEventListener('touchend', handleEnd, { passive: !preventDefault });
    // Mouse events (for desktop testing)
    element.addEventListener('mousedown', handleStart);
    element.addEventListener('mousemove', handleMove);
    element.addEventListener('mouseup', handleEnd);
    // Cleanup function
    return function destroy() {
        element.removeEventListener('touchstart', handleStart);
        element.removeEventListener('touchmove', handleMove);
        element.removeEventListener('touchend', handleEnd);
        element.removeEventListener('mousedown', handleStart);
        element.removeEventListener('mousemove', handleMove);
        element.removeEventListener('mouseup', handleEnd);
    };
}
// Svelte action for easy use in components
export function swipeable(node, options = {}) {
    const { onSwiping, onSwiped, ...swipeOptions } = options;
    const destroy = createSwipeable(node, swipeOptions, {
        onSwiping,
        onSwiped
    });
    return {
        destroy,
        update(newOptions) {
            destroy();
            const { onSwiping: newOnSwiping, onSwiped: newOnSwiped, ...newSwipeOptions } = newOptions;
            return createSwipeable(node, newSwipeOptions, {
                onSwiping: newOnSwiping,
                onSwiped: newOnSwiped
            });
        }
    };
}
