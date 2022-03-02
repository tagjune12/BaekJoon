let fs = require('fs');
let input = fs.readFileSync('/dev/stdin').toString().split('\n');
const [n] = [input.shift()].map(n => +n);
let graph = input.map(arr => arr.split(" ").map(x => +x));



// 북 동 남 서
const dx = [0, 1, 0, -1]; // col
const dy = [-1, 0, 1, 0]; // row

const checkInGraph = (position) => {
    const [row, col] = position;

    if (row >= 0 && col >= 0 && row < n && col < n) return true;
    else return false;
}

let answer = [];

for (let height = 0; height <= 100; height++) {
    const visited = Array.from(Array(n), () => Array(n).fill(false));

    const dfs = (position) => {
        const [row, col] = position;
        visited[row][col] = true;

        for (let i = 0; i < 4; i++) {
            const [nextRow, nextCol] = [row + dy[i], col + dx[i]];
            if (checkInGraph([nextRow, nextCol]) && visited[nextRow][nextCol] === false && graph[nextRow][nextCol] > height) {
                visited[nextRow][nextCol] = true;
                dfs([nextRow, nextCol]);
            }
        }

        return;
    }

    let count = 0;
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            if (graph[i][j] > height && visited[i][j] === false) {
                dfs([i, j]);
                count++;
            }
        }
    }
    answer.push(count);
}

console.log(Math.max(...answer));
