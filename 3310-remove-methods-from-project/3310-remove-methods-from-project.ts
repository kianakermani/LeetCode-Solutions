function remainingMethods(n: number, k: number, invocations: number[][]): number[] {
    const graph: number[][] = Array.from({ length: n }, () => []);
    for (const [u, v] of invocations) {
        graph[u].push(v);
    }

    const suspicious: Set<number> = new Set();
    const queue: number[] = [k];
    suspicious.add(k);

    while (queue.length > 0) {
        const u = queue.shift()!;
        for (const v of graph[u]) {
            if (!suspicious.has(v)) {
                suspicious.add(v);
                queue.push(v);
            }
        }
    }

    let canRemove = true;
    for (const [u, v] of invocations) {
        if (!suspicious.has(u) && suspicious.has(v)) {
            canRemove = false;
            break;
        }
    }

    if (canRemove) {
        const result: number[] = [];
        for (let i = 0; i < n; i++) {
            if (!suspicious.has(i)) {
                result.push(i);
            }
        }
        return result;
    } else {
        const allMethods: number[] = [];
        for (let i = 0; i < n; i++) {
            allMethods.push(i);
        }
        return allMethods;
    }
};