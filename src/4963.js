const input = require('fs').readFileSync('./example.txt').toString().trim().split('\n');
const iterator = input[Symbol.iterator]();

// 북 북동 동 남동 남 남서 서 북서
const dx = [0, 1, 1, 1, 0, -1, -1, -1]; // col
const dy = [-1, -1, 0, 1, 1, 1, 0, -1]; // row

// main
while (true) {
    const iterResult = iterator.next();
    if (iterResult.value === '0 0') break;
    const [w, h] = iterResult.value.split(' ').map(v => +v);
    const arr = [];
    const visited = Array.from(Array(h), () => Array(w).fill(false));
    let count = 0;

    const bfs = (matrix, start) => {
        const queue = [];
        // visited는 global로 있는거 가져오기
        queue.push(start); // [x,y]값으로 들어감
        visited[start[1]][start[0]] = true;

        while (queue.length > 0) {
            const [curX, curY] = queue.pop();

            for (let i = 0; i < 8; i++) {
                const [nextX, nextY] = [curX + dx[i], curY + dy[i]];

                if (nextX >= 0 && nextY >= 0 && nextX < w && nextY < h) {

                    if (visited[nextY][nextX] === false && matrix[nextY][nextX] === 1) {
                        visited[nextY][nextX] = true;
                        queue.push([nextX, nextY]);

                    }
                }
            }

        }
        count++;
    }

    const findIsland = (visited, arr) => {
        for (let i = 0; i < h; i++) { // row, Y값
            for (let j = 0; j < w; j++) { // col, X값
                if (visited[i][j] === false && arr[i][j] === 1) {
                    return [j, i];// x,y
                }
            }
        }

        return null;
    }

    for (let i = 0; i < h; i++) {
        arr.push(iterator.next().value.split(' ').map(v => +v));
    }

    while (true) {

        const start = findIsland(visited, arr); // x,y값을 받음

        if (start === null) break;
        bfs(arr, start);
    }
    console.log(count);
}