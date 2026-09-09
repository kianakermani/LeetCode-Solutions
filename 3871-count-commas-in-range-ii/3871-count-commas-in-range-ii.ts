function countCommas(n: number): number {
    let totalCommas = 0n;
    const bigN = BigInt(n);
    let threshold = 1000n; // 10^3

    while (bigN >= threshold) {
        totalCommas += bigN - threshold + 1n;
        threshold *= 1000n; // رفتن به آستانه بعدی (10^6, 10^9, ...)
    }

    return Number(totalCommas);
};