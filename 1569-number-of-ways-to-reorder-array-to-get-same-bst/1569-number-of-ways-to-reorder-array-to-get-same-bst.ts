function numOfWays(nums: number[]): number {
    const MOD = BigInt(10**9 + 7);
    const n = nums.length;

    // پیش‌محاسبه‌ی ترکیب‌ها با استفاده از مثلث پاسکال
    const comb: bigint[][] = Array.from({ length: n + 1 }, () => Array(n + 1).fill(0n));
    for (let i = 0; i <= n; i++) {
        comb[i][0] = 1n;
        for (let j = 1; j <= i; j++) {
            comb[i][j] = (comb[i - 1][j - 1] + comb[i - 1][j]) % MOD;
        }
    }

    // تابع بازگشتی برای محاسبه تعداد حالت‌ها
    function dfs(arr: number[]): bigint {
        if (arr.length <= 2) return 1n;

        const root = arr[0];
        const left: number[] = [];
        const right: number[] = [];

        for (let i = 1; i < arr.length; i++) {
            if (arr[i] < root) {
                left.push(arr[i]);
            } else {
                right.push(arr[i]);
            }
        }

        const leftWays = dfs(left);
        const rightWays = dfs(right);

        const totalWays = (comb[left.length + right.length][left.length] * leftWays) % MOD;
        return (totalWays * rightWays) % MOD;
    }

    // کم کردن یک واحد (آرایه‌ی اولیه) از پاسخ کل
    const result = (dfs(nums) - 1n + MOD) % MOD;
    return Number(result);
}