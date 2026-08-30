function minimumDeletions(nums: number[]): number {
    const n = nums.length;
    if (n === 1) return 1;

    let minIndex = 0;
    let maxIndex = 0;

    for (let k = 0; k < n; k++) {
        if (nums[k] < nums[minIndex]) minIndex = k;
        if (nums[k] > nums[maxIndex]) maxIndex = k;
    }

    const i = Math.min(minIndex, maxIndex);
    const j = Math.max(minIndex, maxIndex);

    // ۳ حالت ممکن:
    const option1 = j + 1;             // هر دو از چپ
    const option2 = n - i;             // هر دو از راست
    const option3 = (i + 1) + (n - j); // یکی از چپ، یکی از راست

    return Math.min(option1, option2, option3);
}