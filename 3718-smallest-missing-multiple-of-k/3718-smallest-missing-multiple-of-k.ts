function missingMultiple(nums: number[], k: number): number {
    const numSet = new Set(nums);
    let candidate = k;

    while (numSet.has(candidate)) {
        candidate += k;
    }

    return candidate;
};