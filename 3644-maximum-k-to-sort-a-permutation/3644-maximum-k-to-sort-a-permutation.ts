function sortPermutation(nums: number[]): number {
    let isSorted = true;
    let k = -1;

    for (let i = 0; i < nums.length; i++) {
        if (nums[i] !== i) {
            isSorted = false;
            if (k === -1) {
                k = nums[i];
            } else {
                k &= nums[i];
            }
        }
    }

    // اگر آرایه از قبل مرتب بود، طبق صورت مسئله 0 برمی‌گردانیم
    return isSorted ? 0 : k;
}