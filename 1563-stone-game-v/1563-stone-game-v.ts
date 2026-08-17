function stoneGameV(stoneValue: number[]): number {
    const n = stoneValue.length;

    // آرایه پیش‌جمع (Prefix Sum) برای محاسبه سریع مجموع هر بازه در O(1)
    const pref = new Array(n + 1).fill(0);
    for (let i = 0; i < n; i++) {
        pref[i + 1] = pref[i] + stoneValue[i];
    }

    const getSum = (l: number, r: number): number => {
        return pref[r + 1] - pref[l];
    };

    // جدول Memoization برای نگهداری نتایج زیرمسئله‌ها [l][r]
    const memo: number[][] = Array.from({ length: n }, () => new Array(n).fill(-1));

    function solve(l: number, r: number): number {
        // حالت پایه: اگر فقط یک سنگ باقی مانده باشد، امتیاز دیگری نمی‌توان گرفت
        if (l === r) return 0;

        if (memo[l][r] !== -1) return memo[l][r];

        let maxScore = 0;

        // تمام نقاط ممکن برای تقسیم آرایه از l تا r-1 را بررسی می‌کنیم
        for (let i = l; i < r; i++) {
            const leftSum = getSum(l, i);
            const rightSum = getSum(i + 1, r);

            if (leftSum < rightSum) {
                // بخش چپ کوچک‌تر است -> بخش چپ می‌ماند
                maxScore = Math.max(maxScore, leftSum + solve(l, i));
            } else if (rightSum < leftSum) {
                // بخش راست کوچک‌تر است -> بخش راست می‌ماند
                maxScore = Math.max(maxScore, rightSum + solve(i + 1, r));
            } else {
                // دو بخش برابرند -> بهترین حالت بین انتخاب چپ یا راست را می‌گیریم
                const takeLeft = leftSum + solve(l, i);
                const takeRight = rightSum + solve(i + 1, r);
                maxScore = Math.max(maxScore, takeLeft, takeRight);
            }
        }

        return memo[l][r] = maxScore;
    }

    return solve(0, n - 1);
}