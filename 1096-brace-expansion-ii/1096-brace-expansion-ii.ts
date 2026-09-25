function braceExpansionII(expression: string): string[] {
    let stack: (Set<string> | string)[] = [];
    let i = 0;

    function parse(): Set<string> {
        let resSet = new Set<string>();
        let curSet = new Set<string>([""]);

        while (i < expression.length) {
            let char = expression[i];

            if (char === '{') {
                i++; // رد شدن از '{'
                let subSet = parse(); // حل عبارات داخل آکولاد به صورت بازگشتی
                curSet = combine(curSet, subSet);
            } else if (char === '}') {
                i++; // رد شدن از '}'
                break;
            } else if (char === ',') {
                i++;
                // افزودن عبارت قبلی به مجموعه نهایی و شروع بخش جدید بعد از کاما
                for (let item of curSet) resSet.add(item);
                curSet = new Set<string>([""]);
            } else {
                // رشته تک‌حرفی
                let subSet = new Set<string>([char]);
                curSet = combine(curSet, subSet);
                i++;
            }
        }

        for (let item of curSet) resSet.add(item);
        return resSet;
    }

    // تابع کمکی برای ضرب دکارتی دو مجموعه رشته
    function combine(set1: Set<string>, set2: Set<string>): Set<string> {
        let result = new Set<string>();
        for (let s1 of set1) {
            for (let s2 of set2) {
                result.add(s1 + s2);
            }
        }
        return result;
    }

    let finalSet = parse();
    // خروجی باید به‌صورت صعودی مرتب (Sorted) و آرایه باشد
    return Array.from(finalSet).sort();
}