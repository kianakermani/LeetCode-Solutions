function maxNumOfSubstrings(s: string): string[] {
    const first: number[] = new Array(26).fill(-1);
    const last: number[] = new Array(26).fill(-1);
    const aCode = 'a'.charCodeAt(0);

    // ۱. ثبت اولین و آخرین اندیس هر کاراکتر
    for (let i = 0; i < s.length; i++) {
        const idx = s.charCodeAt(i) - aCode;
        if (first[idx] === -1) {
            first[idx] = i;
        }
        last[idx] = i;
    }

    // تابع کمکی برای یافتن انتهای بازه معتبر
    function getValidEnd(start: number): number {
        let end = last[s.charCodeAt(start) - aCode];
        for (let i = start; i <= end; i++) {
            const idx = s.charCodeAt(i) - aCode;
            // اگر کاراکتری زودتر از start شروع شده باشد، بازه نامعتبر است
            if (first[idx] < start) {
                return -1;
            }
            end = Math.max(end, last[idx]);
        }
        return end;
    }

    // ۲. استخراج تمام بازه‌های معتبر
    const validIntervals: [number, number][] = [];
    for (let i = 0; i < 26; i++) {
        if (first[i] !== -1) {
            const end = getValidEnd(first[i]);
            if (end !== -1) {
                validIntervals.push([first[i], end]);
            }
        }
    }

    // ۳. مرتب‌سازی بر اساس اندیس پایان
    validIntervals.sort((a, b) => a[1] - b[1]);

    // ۴. انتخاب حریصانه بازه‌های بدون تداخل
    const result: string[] = [];
    let prevEnd = -1;

    for (const [start, end] of validIntervals) {
        if (start > prevEnd) {
            result.push(s.substring(start, end + 1));
            prevEnd = end;
        }
    }

    return result;
}