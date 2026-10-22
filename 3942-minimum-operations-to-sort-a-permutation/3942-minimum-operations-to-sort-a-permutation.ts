function minOperations(nums: number[]): number {
  const n = nums.length;
  if (n === 1) return 0;

  const p = nums.indexOf(0);

  // بررسی صعودی دایره‌ای
  let asc = true;
  for (let i = 0; i < n; i++) {
    if (nums[(p + i) % n] !== i) { asc = false; break; }
  }

  // بررسی نزولی دایره‌ای
  let desc = true;
  for (let i = 0; i < n; i++) {
    if (nums[((p - i) % n + n) % n] !== i) { desc = false; break; }
  }

  if (!asc && !desc) return -1;

  // BFS روی 2n وضعیت: index = flag * n + s
  const dist = new Int32Array(2 * n).fill(-1);
  const queue = new Int32Array(2 * n);
  let head = 0, tail = 0;

  dist[0] = 0;
  queue[tail++] = 0;

  const mod = (x: number) => ((x % n) + n) % n;

  while (head < tail) {
    const cur = queue[head++];
    const flag = cur >= n ? 1 : 0;
    const s = cur - flag * n;

    let next1: number, next2: number;
    if (flag === 0) {
      next1 = mod(s + 1);            // rotate -> (s+1, 0)
      next2 = n + mod(s - 1);        // reverse -> (s-1, 1)
    } else {
      next1 = n + mod(s - 1);        // rotate -> (s-1, 1)
      next2 = mod(s + 1);            // reverse -> (s+1, 0)
    }

    for (const nx of [next1, next2]) {
      if (dist[nx] === -1) {
        dist[nx] = dist[cur] + 1;
        queue[tail++] = nx;
      }
    }
  }

  let ans = Infinity;
  if (asc) {
    const d = dist[p];
    if (d !== -1) ans = Math.min(ans, d);
  }
  if (desc) {
    const d = dist[n + p];
    if (d !== -1) ans = Math.min(ans, d);
  }

  return ans === Infinity ? -1 : ans;
}