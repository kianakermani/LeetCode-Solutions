function nodesBetweenCriticalPoints(head: ListNode | null): number[] {
    if (!head || !head.next || !head.next.next) {
        return [-1, -1];
    }

    let prev = head;
    let curr = head.next;
    let currentIndex = 1;

    let firstCriticalIndex = -1;
    let prevCriticalIndex = -1;
    let minDistance = Infinity;

    while (curr.next !== null) {
        const nextNode = curr.next;

        // بررسی اینکه آیا گره فعلی نقطه بحرانی است یا خیر
        const isLocalMaxima = curr.val > prev.val && curr.val > nextNode.val;
        const isLocalMinima = curr.val < prev.val && curr.val < nextNode.val;

        if (isLocalMaxima || isLocalMinima) {
            if (firstCriticalIndex === -1) {
                firstCriticalIndex = currentIndex;
            } else {
                minDistance = Math.min(minDistance, currentIndex - prevCriticalIndex);
            }
            prevCriticalIndex = currentIndex;
        }

        // حرکت به گره بعدی
        prev = curr;
        curr = nextNode;
        currentIndex++;
    }

    // اگر کمتر از ۲ نقطه بحرانی پیدا شد
    if (minDistance === Infinity) {
        return [-1, -1];
    }

    const maxDistance = prevCriticalIndex - firstCriticalIndex;

    return [minDistance, maxDistance];
}