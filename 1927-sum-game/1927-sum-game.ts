function sumGame(num: string): boolean {
    const n = num.length;
    const half = n / 2;
    
    let leftSum = 0;
    let rightSum = 0;
    let leftQ = 0;
    let rightQ = 0;

    for (let i = 0; i < n; i++) {
        const char = num[i];
        if (i < half) {
            if (char === '?') {
                leftQ++;
            } else {
                leftSum += Number(char);
            }
        } else {
            if (char === '?') {
                rightQ++;
            } else {
                rightSum += Number(char);
            }
        }
    }

    if ((leftQ + rightQ) % 2 !== 0) {
        return true;
    }

    const sumDiff = leftSum - rightSum;
    const qDiff = leftQ - rightQ;

    return sumDiff + (qDiff / 2) * 9 !== 0;
}