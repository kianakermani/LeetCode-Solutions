function maximumWeight(intervals: number[][]): number[] {
    const n = intervals.length;

    // ذخیره بازه‌ها همراه با ایندکس اصلی آن‌ها
    // [l, r, weight, originalIndex]
    const sortedIntervals: [number, number, number, number][] = intervals.map(
        (val, idx) => [val[0], val[1], val[2], idx]
    );

    // مرتب‌سازی بر اساس نقطه پایان (r)
    sortedIntervals.sort((a, b) => a[1] - b[1]);

    // استخراج نقاط پایان برای جستجوی ثنایی
    const endTimes = sortedIntervals.map(item => item[1]);

    // تابعی برای پیدا کردن آخرین بازه‌ای که نقطه پایان آن اکیداً کمتر از l است
    function binarySearch(l: number): number {
        let left = 0;
        let right = endTimes.length - 1;
        let ans = -1;
        while (left <= right) {
            const mid = (left + right) >> 1;
            if (endTimes[mid] < l) {
                ans = mid;
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
        return ans;
    }

    // dp[k][i]: وضعیت برای انتخاب k بازه از بین i بازه اول مرتب شده
    // هر درایه شامل: [sumWeight, indicesArray]
    type State = { weight: number; indices: number[] };

    const dp: State[][] = Array.from({ length: 5 }, () =>
        Array.from({ length: n + 1 }, () => ({ weight: 0, indices: [] }))
    );

    // مقایسه دو وضعیت جهت انتخاب حالت بهتر با رعایت شرط Lexicographical
    function isBetter(candidate: State, current: State): boolean {
        if (candidate.weight !== current.weight) {
            return candidate.weight > current.weight;
        }
        // اگر وزن‌ها برابر بودند، آرایه با ترتیب الفبایی/عددی کوچک‌تر ترجیح داده می‌شود
        const a = candidate.indices;
        const b = current.indices;
        const len = Math.min(a.length, b.length);
        for (let i = 0; i < len; i++) {
            if (a[i] !== b[i]) {
                return a[i] < b[i];
            }
        }
        return a.length < b.length;
    }

    for (let i = 1; i <= n; i++) {
        const [l, r, weight, origIdx] = sortedIntervals[i - 1];
        const prevIdx = binarySearch(l) + 1; // نگاشت به اندیس ۱-برپایه DP

        for (let k = 1; k <= 4; k++) {
            // حالت اول: بازه i-ام را ندیده بگیریم
            let bestState: State = { ...dp[k][i - 1] };

            // حالت دوم: بازه i-ام را انتخاب کنیم
            const prevDp = dp[k - 1][prevIdx];
            const newWeight = prevDp.weight + weight;
            const newIndices = [...prevDp.indices, origIdx].sort((a, b) => a - b);
            const candidateState: State = { weight: newWeight, indices: newIndices };

            if (isBetter(candidateState, bestState)) {
                bestState = candidateState;
            }

            dp[k][i] = bestState;
        }
    }

    // یافتن بهترین حالت کلی بین ۱ تا ۴ بازه
    let resultState: State = { weight: 0, indices: [] };
    for (let k = 1; k <= 4; k++) {
        if (isBetter(dp[k][n], resultState)) {
            resultState = dp[k][n];
        }
    }

    return resultState.indices;
}