function minSwaps(nums: number[]): number {
    const n = nums.length;

    // ۱. تابع محاسبه مجموع ارقام یک عدد
    const getDigitSum = (num: number): number => {
        let sum = 0;
        while (num > 0) {
            sum += num % 10;
            num = Math.floor(num / 10);
        }
        return sum;
    };

    // ۲. ذخیره مقادیر به همراه نمایه اولیه آن‌ها
    // هر عنصر شامل: [مقدار اصلی, مجموع ارقام, نمایه اولیه]
    const indexedNums = nums.map((val, idx) => ({
        val,
        sum: getDigitSum(val),
        originalIdx: idx
    }));

    // ۳. مرتب‌سازی طبق قوانین مسئله
    indexedNums.sort((a, b) => {
        if (a.sum !== b.sum) {
            return a.sum - b.sum; // اولویت با مجموع ارقام کمتر
        }
        return a.val - b.val; // در صورت برابر بودن مجموع ارقام، اولویت با عدد کوچک‌تر
    });

    // ۴. محاسبه تعداد جابه‌جایی‌ها با استفاده از آرایه visited و الگوریتم دورها (Cycles)
    const visited = new Array<boolean>(n).fill(false);
    let totalSwaps = 0;

    for (let i = 0; i < n; i++) {
        // اگر عنصر قبلاً بررسی شده یا در جای درست خود قرار دارد
        if (visited[i] || indexedNums[i].originalIdx === i) {
            continue;
        }

        // محاسبه طول دور (Cycle Length)
        let cycleSize = 0;
        let curr = i;

        while (!visited[curr]) {
            visited[curr] = true;
            curr = indexedNums[curr].originalIdx;
            cycleSize++;
        }

        // اضافه کردن (طول دور - ۱) به تعداد جابه‌جایی‌ها
        if (cycleSize > 0) {
            totalSwaps += cycleSize - 1;
        }
    }

    return totalSwaps;
}