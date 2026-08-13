class Node {
    prefChar: string;
    suffChar: string;
    prefLen: number;
    suffLen: number;
    maxLen: number;
    size: number;

    constructor(c: string) {
        this.prefChar = c;
        this.suffChar = c;
        this.prefLen = 1;
        this.suffLen = 1;
        this.maxLen = 1;
        this.size = 1;
    }

    static merge(left: Node, right: Node): Node {
        const res = new Node('');
        res.size = left.size + right.size;
        res.prefChar = left.prefChar;
        res.suffChar = right.suffChar;

        // ترکیب حداکثر طول در دو طرف
        res.maxLen = Math.max(left.maxLen, right.maxLen);

        // بررسی اتصال مرز وسط
        if (left.suffChar === right.prefChar) {
            res.maxLen = Math.max(res.maxLen, left.suffLen + right.prefLen);
        }

        // محاسبه پیشوند
        if (left.prefLen === left.size && left.prefChar === right.prefChar) {
            res.prefLen = left.size + right.prefLen;
        } else {
            res.prefLen = left.prefLen;
        }

        // محاسبه پسوند
        if (right.suffLen === right.size && right.suffChar === left.suffChar) {
            res.suffLen = right.size + left.suffLen;
        } else {
            res.suffLen = right.suffLen;
        }

        return res;
    }
}

class SegmentTree {
    n: number;
    tree: Node[];

    constructor(s: string) {
        this.n = s.length;
        this.tree = new Array(4 * this.n);
        this.build(s, 0, 0, this.n - 1);
    }

    private build(s: string, nodeIdx: number, l: number, r: number): void {
        if (l === r) {
            this.tree[nodeIdx] = new Node(s[l]);
            return;
        }
        const mid = Math.floor((l + r) / 2);
        this.build(s, 2 * nodeIdx + 1, l, mid);
        this.build(s, 2 * nodeIdx + 2, mid + 1, r);
        this.tree[nodeIdx] = Node.merge(this.tree[2 * nodeIdx + 1], this.tree[2 * nodeIdx + 2]);
    }

    public update(nodeIdx: number, l: number, r: number, targetIdx: number, ch: string): void {
        if (l === r) {
            this.tree[nodeIdx] = new Node(ch);
            return;
        }
        const mid = Math.floor((l + r) / 2);
        if (targetIdx <= mid) {
            this.update(2 * nodeIdx + 1, l, mid, targetIdx, ch);
        } else {
            this.update(2 * nodeIdx + 2, mid + 1, r, targetIdx, ch);
        }
        this.tree[nodeIdx] = Node.merge(this.tree[2 * nodeIdx + 1], this.tree[2 * nodeIdx + 2]);
    }

    public getMax(): number {
        return this.tree[0].maxLen;
    }
}

function longestRepeating(s: string, queryCharacters: string, queryIndices: number[]): number[] {
    const st = new SegmentTree(s);
    const k = queryIndices.length;
    const ans: number[] = new Array(k);

    for (let i = 0; i < k; i++) {
        const idx = queryIndices[i];
        const ch = queryCharacters[i];
        st.update(0, 0, st.n - 1, idx, ch);
        ans[i] = st.getMax();
    }

    return ans;
}