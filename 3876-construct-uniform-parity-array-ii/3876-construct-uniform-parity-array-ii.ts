function uniformArray(nums1: number[]): boolean {
    let minOdd = Infinity;
    let minEven = Infinity;

    for (const num of nums1) {
        if (num % 2 === 0) {
            minEven = Math.min(minEven, num);
        } else {
            minOdd = Math.min(minOdd, num);
        }
    }

    // اگر همه زوج یا همه فرد باشند، همیشه امکان‌پذیر است
    if (minOdd === Infinity || minEven === Infinity) {
        return true;
    }

    // اگر کوچک‌ترین عدد فرد بزرگ‌تر از کوچک‌ترین عدد زوج باشد، امکان‌‌پذیر نیست
    return minOdd < minEven;
};