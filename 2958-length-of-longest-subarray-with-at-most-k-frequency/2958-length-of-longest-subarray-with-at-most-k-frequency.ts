function maxSubarrayLength(nums: number[], k: number): number {
    const counts = new Map<number, number>();
    let left = 0;
    let maxLength = 0;

    for (let right = 0; right < nums.length; right++) {
        const num = nums[right];
        counts.set(num, (counts.get(num) || 0) + 1);

        while (counts.get(num)! > k) {
            const leftNum = nums[left];
            counts.set(leftNum, counts.get(leftNum)! - 1);
            left++;
        }

        maxLength = Math.max(maxLength, right - left + 1);
    }

    return maxLength;
};