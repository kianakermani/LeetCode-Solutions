function countServers(n: number, logs: number[][], x: number, queries: number[]): number[] {
    // 1. مرتب‌سازی لوگ‌ها بر اساس زمان
    logs.sort((a, b) => a[1] - b[1]);

    // 2. ذخیره کوئری‌ها به همراه ایندکس اولیه و مرتب‌سازی بر اساس زمان
    const indexedQueries = queries.map((q, idx) => ({ time: q, originalIndex: idx }));
    indexedQueries.sort((a, b) => a.time - b.time);

    const result = new Array(queries.length);
    const serverCounts = new Map<number, number>();
    
    let left = 0;
    let right = 0;

    for (const query of indexedQueries) {
        const startTime = query.time - x;
        const endTime = query.time;

        // اضافه کردن درخواست‌هایی که در بازه زمان انتهایی کوئری (<= endTime) قرار دارند
        while (right < logs.length && logs[right][1] <= endTime) {
            const serverId = logs[right][0];
            serverCounts.set(serverId, (serverCounts.get(serverId) || 0) + 1);
            right++;
        }

        // حذف درخواست‌هایی که قبل از startTime هستند (< startTime)
        while (left < logs.length && logs[left][1] < startTime) {
            const serverId = logs[left][0];
            const currentCount = serverCounts.get(serverId)!;
            if (currentCount === 1) {
                serverCounts.delete(serverId);
            } else {
                serverCounts.set(serverId, currentCount - 1);
            }
            left++;
        }

        // تعداد سرورهای بدون درخواست = تعداد کل سرورها - سرورهای فعال در بازه
        const activeServersCount = serverCounts.size;
        result[query.originalIndex] = n - activeServersCount;
    }

    return result;
}