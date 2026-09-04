function firstStableIndex(nums: number[], k: number): number {
    const n = nums.length;
    
    // آرایه‌ای برای ذخیره حداقل مقدار از اندیس i تا n - 1
    const minSuffix = new Array(n);
    minSuffix[n - 1] = nums[n - 1];
    
    for (let i = n - 2; i >= 0; i--) {
        minSuffix[i] = Math.min(nums[i], minSuffix[i + 1]);
    }
    
    let maxPrefix = nums[0];
    
    // پیمایش برای پیدا کردن اولین اندیس پایدار
    for (let i = 0; i < n; i++) {
        maxPrefix = Math.max(maxPrefix, nums[i]);
        
        const instabilityScore = maxPrefix - minSuffix[i];
        
        if (instabilityScore <= k) {
            return i;
        }
    }
    
    return -1;
}