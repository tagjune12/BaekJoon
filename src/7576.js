let fs = require('fs');
let input = fs.readFileSync('dev/stdin').toString().split('\n');
let [n, m] = input.shift().split(" "); // col, row
let graph = input.map(v => v.split(" ").map(x => +x));

[m, n] = [parseInt(m), parseInt(n)];

let queue = [];
// 시작점 찾기
for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
        if (graph[i][j] === 1) {
            queue.push([i, j]);
        }
    }
}

// bfs시작

// 북, 동, 남, 서
const dx = [0, 1, 0, -1]; //col
const dy = [1, 0, -1, 0]; // row

let curIndex = 0;
while (queue.length !== curIndex) {
    const [curRow, curCol] = queue[curIndex]; // queue.shift()쓰면 시간초과남

    for (let i = 0; i < 4; i++) {
        const [nextRow, nextCol] = [curRow + dy[i], curCol + dx[i]];
        if (nextRow >= 0 && nextCol >= 0 && nextRow < m && nextCol < n) {
            if (graph[nextRow][nextCol] === 0) {
                graph[nextRow][nextCol] = graph[curRow][curCol] + 1;
                // queue = [...queue, [nextRow, nextCol]]; // 메모리 초과남
                queue.push([nextRow, nextCol]);
            }
        }
    }
    curIndex++;
}

// 다 익었는지 확인

for (let i = 0; i < m; i++) {
    if (graph[i].includes(0)) {
        console.log(-1);
        break;
    }
}

let max = 0;
graph.map(row => row.map(value => max = Math.max(value, max)));
if (max > 0) max = max - 1;
console.log(max);