function minMoves(classroom: string[], energy: number): number {
    const height = classroom.length;
    const width = classroom[0].length;
    const cells = height * width;

    const room: string[][] = new Array(height);
    const litterBit: number[] = new Array(cells).fill(0);

    let start = -1;
    let litterCount = 0;

    for (let r = 0; r < height; r++) {
        room[r] = classroom[r].split('');

        for (let c = 0; c < width; c++) {
            const id = r * width + c;
            const ch = room[r][c];

            if (ch === 'S') {
                start = id;
            } else if (ch === 'L') {
                litterBit[id] = 1 << litterCount++;
            }
        }
    }

    const allClean = (1 << litterCount) - 1;

    // آرایه دو بعدی برای ذخیره بیشترین انرژی باقی‌مانده در هر (mask, cell)
    const strongest: Int32Array[] = Array.from(
        { length: 1 << litterCount },
        () => new Int32Array(cells).fill(-1)
    );

    // صف BFS به صورت ساده شامل آرایه‌های [cell, cleaned, power]
    const frontier: Array<[number, number, number]> = [];

    frontier.push([start, 0, energy]);
    strongest[0][start] = energy;

    const STEP = [
        [1, 0], [-1, 0], [0, 1], [0, -1]
    ];

    let moves = 0;
    let head = 0; // پوینتر برای شبیه‌سازی Deque صف بدون هزینه shift()

    while (head < frontier.length) {
        let levelSize = frontier.length - head;

        while (levelSize-- > 0) {
            const [cell, cleaned, power] = frontier[head++];

            if (cleaned === allClean) {
                return moves;
            }

            if (power < strongest[cleaned][cell] || power === 0) {
                continue;
            }

            const r = Math.floor(cell / width);
            const c = cell % width;

            for (const [dr, dc] of STEP) {
                const nr = r + dr;
                const nc = c + dc;

                if (nr < 0 || nr >= height || nc < 0 || nc >= width || room[nr][nc] === 'X') {
                    continue;
                }

                const nextCell = nr * width + nc;
                const nextMask = cleaned | litterBit[nextCell];
                const nextPower = room[nr][nc] === 'R' ? energy : power - 1;

                if (nextPower <= strongest[nextMask][nextCell]) {
                    continue;
                }

                strongest[nextMask][nextCell] = nextPower;
                frontier.push([nextCell, nextMask, nextPower]);
            }
        }

        moves++;
    }

    return -1;
}