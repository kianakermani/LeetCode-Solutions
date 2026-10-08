function removeOuterParentheses(s: string): string {
    let result = '';
    let depth = 0;

    for (const char of s) {
        if (char === '(') {
            if (depth > 0) {
                result += char;
            }
            depth++;
        } else {
            depth--;
            if (depth > 0) {
                result += char;
            }
        }
    }

    return result;
};