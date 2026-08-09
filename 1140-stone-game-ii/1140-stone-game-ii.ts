function stoneGameII(piles: number[]): number {
    const n = piles.length;
    
    const suffixSum = new Array(n).fill(0);
    suffixSum[n - 1] = piles[n - 1];
    for (let i = n - 2; i >= 0; i--) {
        suffixSum[i] = suffixSum[i + 1] + piles[i];
    }

    const memo = new Map<string, number>();

    function dp(i: number, m: number): number {
        if (i >= n) return 0;
        
        if (i + 2 * m >= n) return suffixSum[i];

        const key = `${i},${m}`;
        if (memo.has(key)) return memo.get(key)!;

        let maxStones = 0;

        for (let x = 1; x <= 2 * m; x++) {
            const currentM = Math.max(m, x);
            const stones = suffixSum[i] - dp(i + x, currentM);
            maxStones = Math.max(maxStones, stones);
        }

        memo.set(key, maxStones);
        return maxStones;
    }

    return dp(0, 1);
}