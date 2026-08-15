function longestSubsequence(nums: number[]): number {
    let totalXOR = 0;
    let hasNonZero = false;

    for (const num of nums) {
        totalXOR ^= num;
        if (num !== 0) {
            hasNonZero = true;
        }
    }

    // حالت ۱: همه عناصر صفر هستند
    if (!hasNonZero) {
        return 0;
    }

    // حالت ۲: XOR کل آرایه مخالف صفر است
    if (totalXOR !== 0) {
        return nums.length;
    }

    // حالت ۳: XOR کل آرایه صفر است، ولی حداقل یک عنصر غیرصفر داریم
    return nums.length - 1;
};