function lexicographicallySmallestArray(nums: number[], limit: number): number[] {
    const n = nums.length;
    
    // ذخیره مقادیر اولیه به همراه اندیس اصلی آن‌ها
    const sortedNums = nums.map((val, idx) => ({ val, idx }));
    // مرتب‌سازی بر اساس مقدار
    sortedNums.sort((a, b) => a.val - b.val);

    const result = new Array<number>(n);
    
    let i = 0;
    while (i < n) {
        let j = i;
        // یافتن تمام عناصری که در یک گروه قرار می‌گیرند (اختلاف متوالی <= limit)
        while (j + 1 < n && sortedNums[j + 1].val - sortedNums[j].val <= limit) {
            j++;
        }
        
        // استخراج اندیس‌های اصلی این گروه و مرتب‌سازی آن‌ها
        const indices: number[] = [];
        for (let k = i; k <= j; k++) {
            indices.push(sortedNums[k].idx);
        }
        indices.sort((a, b) => a - b);
        
        // جای‌گذاری مقادیر مرتب‌شده در اندیس‌های مرتب‌شده
        for (let k = 0; k < indices.length; k++) {
            result[indices[k]] = sortedNums[i + k].val;
        }
        
        // رفتن به گروه بعدی
        i = j + 1;
    }
    
    return result;
}