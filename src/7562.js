const input = require('fs').readFileSync('./example.txt').toString().trim().split('\n');
const iterator = input[Symbol.iterator]();

// 시계방향
const dx = [1, 2, 2, 1, -1, -2, -2, -1]; // col
const dy = [-2, -1, 1, 2, 2, 1, -1, -2]; // row

const numOfTestCase = parseInt((iterator.next()).value);

for (let trying = 0; trying < numOfTestCase; trying++) {
    const size = parseInt((iterator.next()).value);
    const [startRow, startCol] = (iterator.next()).value.split(' ').map(v => +v);
    const [destRow, destCol] = (iterator.next()).value.split(' ').map(v => +v);

    const visited = Array.from(Array(size), () => Array(size).fill(null));
    // console.log(visited);
    // let answer = 0;

    const checkInner = (row, col) => {
        if (row < size && col < size && row >= 0 && col >= 0) return true;
        else return false;
    }

    const bfs = () => {
        const queue = [];

        queue.push([startRow, startCol]);
        visited[startRow][startCol] = 0;
        while (queue.length > 0) {
            const [curRow, curCol] = queue.shift();

            for (let i = 0; i < 8; i++) {
                const [nextRow, nextCol] = [curRow + dy[i], curCol + dx[i]];
                if (checkInner(nextRow, nextCol) && visited[nextRow][nextCol] === null) {
                    visited[nextRow][nextCol] = visited[curRow][curCol] + 1;
                    queue.push([nextRow, nextCol]);
                }
            }
        }
        return visited[destRow][destCol];
    }
    // console.log("***************************************************************");
    console.log(bfs());
    // console.log("---------------------------------------------------------------");
}