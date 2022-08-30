const MIN = 0;
const MAX = 100000;
const [me, bro] = require('fs').readFileSync('dev/stdin').toString().trim().split(' ').map(v => +v);

function solution() {

    const bfs = (start, end) => {
        if (end < start) {
            return start - end;
        }

        const queue = [[start, 0]];
        const visited = Array(MAX + 1).fill(false);

        for (let j = 0; j < queue.length; j++) {
            const [cur, count] = queue[j];
            if (cur === end) return count;
            const move = [cur - 1, cur + 1, cur * 2];

            for (let i = 0; i < 3; i++) {
                const pos = move[i];
                // end보다 뒤에 있는경우 -1만 하도록
                if (end < cur && i !== 0) continue;

                // 좌표*2위치와 목적지사이의 거리랑 현재 위치랑 목적지 거리보다 멀경우 스킵
                if (i === 2 && Math.abs(end - cur) < Math.abs(end - cur * 2)) continue;
                if (pos >= MIN && pos <= MAX && !visited[pos]) {
                    queue.push([pos, count + 1]);
                    visited[pos] = true;
                }
            }
        }
    }
    console.log(bfs(me, bro));
}
solution();