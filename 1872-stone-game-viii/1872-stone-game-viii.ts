function stoneGameVIII(stones: number[]): number {
    const n = stones.length;

    // ۱. محاسبه مجموع پیشوندی (Prefix Sums)
    const pref: number[] = new Array(n);
    pref[0] = stones[0];
    for (let i = 1; i < n; i++) {
        pref[i] = pref[i - 1] + stones[i];
    }

    // ۲. پایه DP: اگر آخرین حرکت ممکن (اندیس n-1) انجام بشه
    let maxScore = pref[n - 1];

    // ۳. حرکت از آخر به اول برای انتخاب بهترین حرکت
    for (let i = n - 2; i >= 1; i--) {
        maxScore = Math.max(maxScore, pref[i] - maxScore);
    }

    return maxScore;
}