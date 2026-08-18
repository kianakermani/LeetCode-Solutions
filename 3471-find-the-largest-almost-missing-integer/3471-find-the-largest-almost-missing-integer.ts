function largestInteger(nums: number[], k: number): number {
    const n = nums.length;
    const subarrayCount = new Map<number, number>();

    // پیمایش تمام زیرآرایه‌های به طول k
    for (let i = 0; i <= n - k; i++) {
        // برای هر زیرآرایه، عناصر یکتا (Unique) آن را مشخص می‌کنیم
        const uniqueInSubarray = new Set<number>();
        for (let j = i; j < i + k; j++) {
            uniqueInSubarray.add(nums[j]);
        }

        // تعداد زیرآرایه‌هایی که هر عدد در آن حضور دارد را ثبت می‌کنیم
        for (const num of uniqueInSubarray) {
            subarrayCount.set(num, (subarrayCount.get(num) || 0) + 1);
        }
    }

    let maxVal = -1;

    // پیدا کردن بزرگ‌ترین عددی که دقیقا در ۱ زیرآرایه آمده است
    for (const [num, count] of subarrayCount.entries()) {
        if (count === 1) {
            maxVal = Math.max(maxVal, num);
        }
    }

    return maxVal;
}