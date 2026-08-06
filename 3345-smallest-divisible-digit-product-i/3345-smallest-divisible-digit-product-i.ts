function smallestNumber(n: number, t: number): number {
    const getDigitProduct = (num: number): number => {
        let product = 1;
        while (num > 0) {
            product *= num % 10;
            num = Math.floor(num / 10);
        }
        return product;
    };

    let current = n;
    while (true) {
        if (getDigitProduct(current) % t === 0) {
            return current;
        }
        current++;
    }
}