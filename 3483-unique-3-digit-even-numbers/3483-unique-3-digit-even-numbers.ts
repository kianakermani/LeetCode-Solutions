function totalNumbers(digits: number[]): number {
    // شمارش تعداد هر رقم موجود در ورودی
    const count = new Array(10).fill(0);
    for (const d of digits) {
        count[d]++;
    }

    let result = 0;

    // بررسی تمام اعداد ۳ رقمی زوج
    for (let num = 100; num <= 998; num += 2) {
        const d1 = Math.floor(num / 100);       // رقم صدگان
        const d2 = Math.floor((num / 10) % 10);  // رقم دهگان
        const d3 = num % 10;                     // رقم یکان

        // شمارش ارقام مورد نیاز برای ساخت num
        const currentCount = new Array(10).fill(0);
        currentCount[d1]++;
        currentCount[d2]++;
        currentCount[d3]++;

        // بررسی اینکه آیا ارقام موجود پاسخگوی نیاز هستند یا خیر
        let isValid = true;
        for (let i = 0; i < 10; i++) {
            if (currentCount[i] > count[i]) {
                isValid = false;
                break;
            }
        }

        if (isValid) {
            result++;
        }
    }

    return result;
}