function maximumLengthSubstring(s: string): number {
    let maxLength = 0;
    let left = 0;
    const charCount = new Map<string, number>();

    for (let right = 0; right < s.length; right++) {
        const char = s[right];
        charCount.set(char, (charCount.get(char) || 0) + 1);

        while (charCount.get(char)! > 2) {
            const leftChar = s[left];
            charCount.set(leftChar, charCount.get(leftChar)! - 1);
            left++;
        }

        maxLength = Math.max(maxLength, right - left + 1);
    }

    return maxLength;
}