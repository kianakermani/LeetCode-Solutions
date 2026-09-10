function averageOfSubtree(root: TreeNode | null): number {
    let count = 0;

    // تابع کمکی DFS که مجموع مقادیر و تعداد گره‌های زیردرخت را برمی‌گرداند
    function dfs(node: TreeNode | null): [number, number] {
        if (!node) {
            return [0, 0]; // [sum, nodeCount]
        }

        // محاسبه مجموع و تعداد گره‌ها برای زیردرخت چپ و راست
        const [leftSum, leftCount] = dfs(node.left);
        const [rightSum, rightCount] = dfs(node.right);

        const currentSum = node.val + leftSum + rightSum;
        const currentCount = 1 + leftCount + rightCount;

        // گرد کردن به پایین (Math.floor)
        if (Math.floor(currentSum / currentCount) === node.val) {
            count++;
        }

        return [currentSum, currentCount];
    }

    dfs(root);
    return count;
}