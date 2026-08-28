function lexPalindromicPermutation(s: string, target: string): string {
    const n = s.length;
    const halfLen = Math.floor(n / 2);
    const count: Record<string, number> = {};

    for (const char of s) {
        count[char] = (count[char] || 0) + 1;
    }

    let oddCount = 0;
    let midChar = "";
    const halfCounts: Record<string, number> = {};

    for (const char in count) {
        if (count[char] % 2 !== 0) {
            oddCount++;
            midChar = char;
        }
        halfCounts[char] = Math.floor(count[char] / 2);
    }

    // اگر بیش از یک کاراکتر با تعداد فرد داشته باشیم، ساخت پالیندروم غیرممکن است
    if (oddCount > 1) return "";

    // تلاش برای یافتن اولین نقطه‌ای که می‌توان نیمه اول را از target بزرگ‌تر ساخت
    // $i$ از halfLen شروع می‌شود تا شامل حالت‌های جایگزینی مستقیم یا تغییر از نمایه $i$ باشد.
    for (let i = halfLen; i >= 0; i--) {
        // ساخت پیشوند تا نمایه i-1 بر اساس target
        const prefixCounts: Record<string, number> = { ...halfCounts };
        let validPrefix = true;
        let prefixStr = "";

        for (let j = 0; j < i; j++) {
            const char = target[j];
            if (!prefixCounts[char] || prefixCounts[char] <= 0) {
                validPrefix = false;
                break;
            }
            prefixCounts[char]--;
            prefixStr += char;
        }

        if (!validPrefix) continue;

        // تعیین حداقل کاراکتر جایگزین در موقعیت i
        // اگر i == halfLen باشد یعنی پیشوند تا نیمه کاملاً با target برابر است
        // و باید بررسی کنیم آیا بخش وسط/نیمه دوم می‌تواند target را شکست دهد یا خیر.
        const startChar = i < halfLen ? String.fromCharCode(target.charCodeAt(i) + 1) : 'a';

        for (let c = startChar.charCodeAt(0); c <= 'z'.charCodeAt(0); c++) {
            const char = String.fromCharCode(c);
            
            // اگر هنوز در نیمه اول هستیم و کاراکتر char در دسترس نیست
            if (i < halfLen && (!prefixCounts[char] || prefixCounts[char] <= 0)) {
                continue;
            }

            const currentHalfCounts = { ...prefixCounts };
            let currentPrefix = prefixStr;

            if (i < halfLen) {
                currentHalfCounts[char]--;
                currentPrefix += char;
            }

            // پر کردن مابقی نیمه اول به صورت صعودی (کوچک‌ترین حالت ممکن)
            for (let code = 'a'.charCodeAt(0); code <= 'z'.charCodeAt(0); code++) {
                const fillChar = String.fromCharCode(code);
                while (currentHalfCounts[fillChar] && currentHalfCounts[fillChar] > 0) {
                    currentPrefix += fillChar;
                    currentHalfCounts[fillChar]--;
                }
            }

            // ساخت کامل رشته پالیندروم
            const suffix = currentPrefix.split("").reverse().join("");
            const candidate = currentPrefix + (n % 2 !== 0 ? midChar : "") + suffix;

            // بررسی اینکه رشته ساخته‌شده اکیداً بزرگ‌تر از target باشد
            if (candidate > target) {
                return candidate;
            }
        }
    }

    return "";
}