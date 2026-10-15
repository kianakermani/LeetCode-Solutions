function sumCounts(nums: number[]): number {
    let totalSum = 0;
    const n = nums.length;

    // حلقه بیرونی برای شروع زیرآرایه
    for (let i = 0; i < n; i++) {
        const distinctSet = new Set<number>();
        // حلقه درونی برای پایان زیرآرایه
        for (let j = i; j < n; j++) {
            distinctSet.add(nums[j]);
            const distinctCount = distinctSet.size;
            totalSum += distinctCount * distinctCount;
        }
    }

    return totalSum;
}