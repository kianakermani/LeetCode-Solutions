function smallestNumber(num: string, t: number): string {
    let req2 = 0, req3 = 0, req5 = 0, req7 = 0;
    let temp = BigInt(t);

    // 1. Prime Factorization
    while (temp % 2n === 0n) { temp /= 2n; req2++; }
    while (temp % 3n === 0n) { temp /= 3n; req3++; }
    while (temp % 5n === 0n) { temp /= 5n; req5++; }
    while (temp % 7n === 0n) { temp /= 7n; req7++; }

    if (temp > 1n) return "-1";

    // 2. DP Table for factors 2 and 3
    // dp[i][j] = min digits needed to cover i factors of 2 and j factors of 3
    const INF = 1e9;
    const dp: number[][] = Array.from({ length: 60 }, () => Array(40).fill(INF));
    dp[0][0] = 0;

    // Transitions corresponding to digits {2, 3, 4, 6, 8, 9}
    const trans = [[1, 0], [0, 1], [2, 0], [1, 1], [3, 0], [0, 2]];

    for (let i = 0; i < 60; ++i) {
        for (let j = 0; j < 40; ++j) {
            if (dp[i][j] === INF) continue;
            for (const [tr2, tr3] of trans) {
                const ni = Math.min(59, i + tr2);
                const nj = Math.min(39, j + tr3);
                dp[ni][nj] = Math.min(dp[ni][nj], dp[i][j] + 1);
            }
        }
    }

    // Suffix min optimization
    for (let i = 59; i >= 0; --i) {
        for (let j = 39; j >= 0; --j) {
            if (i < 59) dp[i][j] = Math.min(dp[i][j], dp[i + 1][j]);
            if (j < 39) dp[i][j] = Math.min(dp[i][j], dp[i][j + 1]);
        }
    }

    // Digit prime factor count arrays
    const F2 = [0, 0, 1, 0, 2, 0, 1, 0, 3, 0];
    const F3 = [0, 0, 0, 1, 0, 0, 1, 0, 0, 2];
    const F5 = [0, 0, 0, 0, 0, 1, 0, 0, 0, 0];
    const F7 = [0, 0, 0, 0, 0, 0, 0, 1, 0, 0];

    const n = num.length;
    let hasZero = false;
    let firstZero = n;

    for (let i = 0; i < n; ++i) {
        if (num[i] === '0') {
            hasZero = true;
            firstZero = i;
            break;
        }
    }

    // Case 0: num itself is valid
    if (!hasZero) {
        let r2 = req2, r3 = req3, r5 = req5, r7 = req7;
        for (let i = 0; i < n; i++) {
            const d = num.charCodeAt(i) - 48;
            r2 = Math.max(0, r2 - F2[d]);
            r3 = Math.max(0, r3 - F3[d]);
            r5 = Math.max(0, r5 - F5[d]);
            r7 = Math.max(0, r7 - F7[d]);
        }
        if (r2 === 0 && r3 === 0 && r5 === 0 && r7 === 0) return num;
    }

    // Case 1: Matching prefix with num
    const limit = Math.min(n - 1, firstZero);
    let p2 = 0, p3 = 0, p5 = 0, p7 = 0;

    for (let i = 0; i < limit; ++i) {
        const d = num.charCodeAt(i) - 48;
        p2 += F2[d];
        p3 += F3[d];
        p5 += F5[d];
        p7 += F7[d];
    }

    for (let i = limit; i >= 0; --i) {
        const startD = (num.charCodeAt(i) - 48) + 1;
        for (let d = startD; d <= 9; ++d) {
            const n2 = Math.max(0, req2 - p2 - F2[d]);
            const n3 = Math.max(0, req3 - p3 - F3[d]);
            const n5 = Math.max(0, req5 - p5 - F5[d]);
            const n7 = Math.max(0, req7 - p7 - F7[d]);
            const L = n - 1 - i;

            if (n7 + n5 + dp[n2][n3] <= L) {
                let ans = num.substring(0, i) + d.toString();
                let rem2 = n2, rem3 = n3, rem5 = n5, rem7 = n7;

                for (let pos = 0; pos < L; ++pos) {
                    for (let x = 1; x <= 9; ++x) {
                        const nn2 = Math.max(0, rem2 - F2[x]);
                        const nn3 = Math.max(0, rem3 - F3[x]);
                        const nn5 = Math.max(0, rem5 - F5[x]);
                        const nn7 = Math.max(0, rem7 - F7[x]);

                        if (nn7 + nn5 + dp[nn2][nn3] <= L - 1 - pos) {
                            ans += x.toString();
                            rem2 = nn2; rem3 = nn3; rem5 = nn5; rem7 = nn7;
                            break;
                        }
                    }
                }
                return ans;
            }
        }
        if (i > 0) {
            const d = num.charCodeAt(i - 1) - 48;
            p2 -= F2[d];
            p3 -= F3[d];
            p5 -= F5[d];
            p7 -= F7[d];
        }
    }

    // Case 2: Greater length needed
    const minLenNeeded = req7 + req5 + dp[req2][req3];
    const M = Math.max(n + 1, minLenNeeded);
    let ans = "";
    let rem2 = req2, rem3 = req3, rem5 = req5, rem7 = req7;

    for (let pos = 0; pos < M; ++pos) {
        for (let x = 1; x <= 9; ++x) {
            const nn2 = Math.max(0, rem2 - F2[x]);
            const nn3 = Math.max(0, rem3 - F3[x]);
            const nn5 = Math.max(0, rem5 - F5[x]);
            const nn7 = Math.max(0, rem7 - F7[x]);

            if (nn7 + nn5 + dp[nn2][nn3] <= M - 1 - pos) {
                ans += x.toString();
                rem2 = nn2; rem3 = nn3; rem5 = nn5; rem7 = nn7;
                break;
            }
        }
    }

    return ans;
}