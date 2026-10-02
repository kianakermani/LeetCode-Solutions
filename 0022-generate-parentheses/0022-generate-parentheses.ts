function generateParenthesis(n: number): string[] {
    const result: string[] = [];

    function backtrack(current: string, openCount: number, closeCount: number): void {
        // اگر طول رشته به 2 * n رسید، یک پاسخ معتبر پیدا شده است
        if (current.length === 2 * n) {
            result.push(current);
            return;
        }

        // اگر هنوز می‌توانیم پرانتز باز اضافه کنیم
        if (openCount < n) {
            backtrack(current + '(', openCount + 1, closeCount);
        }

        // اگر تعداد پرانتزهای بسته کمتر از باز است، می‌توانیم پرانتز بسته اضافه کنیم
        if (closeCount < openCount) {
            backtrack(current + ')', openCount, closeCount + 1);
        }
    }

    backtrack('', 0, 0);
    return result;
}