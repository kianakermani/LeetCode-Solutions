function lexGreaterPermutation(s: string, target: string): string {
    const n = s.length;
    const count = new Array(26).fill(0);
    
    // شمارش تعداد هر کاراکتر در s
    for (let i = 0; i < n; i++) {
        count[s.charCodeAt(i) - 97]++;
    }

    // پیدا کردن طولانی‌ترین پیشوندی از target که با s قابل ساخت است
    let maxMatchLength = 0;
    const tempCount = [...count];
    
    for (let i = 0; i < n; i++) {
        const charIdx = target.charCodeAt(i) - 97;
        if (tempCount[charIdx] > 0) {
            tempCount[charIdx]--;
            maxMatchLength++;
        } else {
            break;
        }
    }

    // حرکت از انتهای پیشوند تطابق‌یافته به سمت عقب برای پیدا کردن نقطه تغییر (i)
    for (let i = maxMatchLength; i >= 0; i--) {
        // بازگرداندن کاراکتر target[i] به مخزن کاراکترها اگر i < maxMatchLength باشد
        const availableCount = [...count];
        for (let j = 0; j < i; j++) {
            availableCount[target.charCodeAt(j) - 97]--;
        }

        if (i < n) {
            const targetCharIdx = target.charCodeAt(i) - 97;
            
            // پیدا کردن کوچک‌ترین کاراکتری که از target[i] بزرگ‌تر است
            let greaterCharIdx = -1;
            for (let c = targetCharIdx + 1; c < 26; c++) {
                if (availableCount[c] > 0) {
                    greaterCharIdx = c;
                    break;
                }
            }

            // اگر کاراکتر بزرگ‌تری پیدا شد، جواب را می‌سازیم
            if (greaterCharIdx !== -1) {
                let result = target.substring(0, i);
                result += String.fromCharCode(97 + greaterCharIdx);
                availableCount[greaterCharIdx]--;

                // اضافه کردن باقی‌مانده کاراکترها به صورت مرتب‌شده (صعودی)
                for (let c = 0; c < 26; c++) {
                    while (availableCount[c] > 0) {
                        result += String.fromCharCode(97 + c);
                        availableCount[c]--;
                    }
                }

                return result;
            }
        }
    }

    return "";
}