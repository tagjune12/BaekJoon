// 숨바꼭질
let input = require('fs').readFileSync('/dev/stdin').toString().trim().split('\n');
const [n, k] = input.shift().split(" ").map(v => +v);

const solution = (n, k) => {

    const dx = [-1, 1, 2];

    const bfs = (n, k) => {
        const queue = [[n, 0]];
        const visited = Array(100001).fill(false);

        for (let i = 0; i < queue.length; i++) {
            const [curPos, count] = queue[i];
            if (curPos === k) return count;

            for (let j = 0; j < dx.length; j++) {
                let nextPos = 0;
                if (j === 2) nextPos = 2 * curPos;
                else nextPos = curPos + dx[j];
                if (nextPos >= 0 && nextPos <= 100000 && (visited[nextPos] === false)) {
                    visited[nextPos] = true;
                    queue[queue.length] = [nextPos, count + 1];
                }
            }
        }
    }

    console.log(bfs(n, k));
}

solution(n, k);