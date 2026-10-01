function isValid(s: string): boolean {
    const stack: string[] = [];
    const map: Record<string, string> = {
        ')': '(',
        '}': '{',
        ']': '['
    };

    for (const char of s) {
        if (char in map) {
            // کاراکتر یک پرانتز بسته‌کننده است
            const topElement = stack.pop();
            if (topElement !== map[char]) {
                return false;
            }
        } else {
            // کاراکتر یک پرانتز بازکننده است
            stack.push(char);
        }
    }

    return stack.length === 0;
}