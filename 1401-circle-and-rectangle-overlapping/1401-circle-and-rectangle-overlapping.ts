function checkOverlap(
    radius: number, 
    xCenter: number, 
    yCenter: number, 
    x1: number, 
    y1: number, 
    x2: number, 
    y2: number
): boolean {
    // پیدا کردن نزدیک‌ترین نقطه از مستطیل به مرکز دایره
    const nearestX = Math.max(x1, Math.min(xCenter, x2));
    const nearestY = Math.max(y1, Math.min(yCenter, y2));

    // محاسبه جابه‌جایی در راستای x و y
    const distX = xCenter - nearestX;
    const distY = yCenter - nearestY;

    // بررسی فاصله تا توان دو نسبت به شعاع به توان دو
    return (distX * distX + distY * distY) <= radius * radius;
};