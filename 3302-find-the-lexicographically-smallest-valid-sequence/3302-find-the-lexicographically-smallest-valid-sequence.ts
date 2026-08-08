function validSequence(word1: string, word2: string): number[] {
    const n = word1.length;
    const m = word2.length;
    
    const last: number[] = new Array(m + 1).fill(-1);
    last[m] = n;
    
    let ptr = n - 1;
    for (let j = m - 1; j >= 0; j--) {
        while (ptr >= 0 && word1[ptr] !== word2[j]) {
            ptr--;
        }
        last[j] = ptr;
        if (ptr >= 0) {
            ptr--;
        }
    }
    
    const result: number[] = [];
    let changed = false;
    let i = 0;
    
    for (let j = 0; j < m; j++) {
        let found = false;
        
        while (i < n) {
            if (word1[i] === word2[j]) {
                result.push(i);
                i++;
                found = true;
                break;
            } 
            else if (!changed && last[j + 1] > i) {
                result.push(i);
                changed = true;
                i++;
                found = true;
                break;
            }
            i++;
        }
        
        if (!found) {
            return [];
        }
    }
    
    return result;
}