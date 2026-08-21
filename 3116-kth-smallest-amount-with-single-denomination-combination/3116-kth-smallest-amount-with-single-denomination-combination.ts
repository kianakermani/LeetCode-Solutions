function findKthSmallest(coins: number[], k: number): number {
    const n = coins.length;

    // توابع کمکی برای محاسبات ب.م.م (GCD) و ک.م.م (LCM) به صورت BigInt
    const gcd = (a: bigint, b: bigint): bigint => (b === 0n ? a : gcd(b, a % b));
    const lcm = (a: bigint, b: bigint): bigint => (a / gcd(a, b)) * b;

    // شمارش تعداد اعداد <= x که مضرب حداقل یکی از سکه‌ها هستند
    const countLessOrEqual = (target: bigint): bigint => {
        let count = 0n;
        const totalSubsets = 1 << n;

        for (let mask = 1; mask < totalSubsets; mask++) {
            let currentLcm = 1n;
            let bitsCount = 0;

            for (let i = 0; i < n; i++) {
                if ((mask & (1 << i)) !== 0) {
                    bitsCount++;
                    currentLcm = lcm(currentLcm, BigInt(coins[i]));
                    if (currentLcm > target) break; // بهینه‌سازی: اگر LCM از target بزرگتر شد، نیازی به ادامه نیست
                }
            }

            if (currentLcm <= target) {
                const multiples = target / currentLcm;
                if (bitsCount % 2 === 1) {
                    count += multiples;
                } else {
                    count -= multiples;
                }
            }
        }

        return count;
    };

    // تعیین محدوده Binary Search
    const minCoin = BigInt(Math.min(...coins));
    let left = 1n;
    let right = minCoin * BigInt(k);
    let ans = right;

    const targetK = BigInt(k);

    while (left <= right) {
        const mid = left + (right - left) / 2n;

        if (countLessOrEqual(mid) >= targetK) {
            ans = mid;
            right = mid - 1n; // تلاش برای پیدا کردن پاسخ کوچک‌تر
        } else {
            left = mid + 1n;
        }
    }

    return Number(ans);
}