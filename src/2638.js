let fs = require('fs');
let input = fs.readFileSync('./example.txt').toString().split('\n');
let [n, k] = input.shift().split(" ");
[n, k] = [parseInt(n), parseInt(k)];
let map = input.map(arr => arr.split(" ").map(x => +x));

// ------------------------------------------------
const CHEESE = 1;
const OUT_BLANK = 2; // 외부 공기
const MELTED_CHEESE = 3;

// 북 동 남 서
const dx = [0, 1, 0, -1]; // col
const dy = [-1, 0, 1, 0]; // row

// 외부 공기를 찾는 함수
const findOutBlank = () => {
    let visited = Array.from(Array(n), () => Array(k).fill(false));
    let queue = [];

    queue.push([0, 0]);
    visited[0][0] = true;
    map[0][0] = OUT_BLANK;

    while (queue.length > 0) {
        const [curRow, curCol] = queue.shift();

        for (let i = 0; i < 4; i++) {
            const [nextRow, nextCol] = [curRow + dy[i], curCol + dx[i]];

            if (nextRow >= 0 && nextCol >= 0 && nextCol < k && nextRow < n) {
                if (map[nextRow][nextCol] !== CHEESE && visited[nextRow][nextCol] === false) {
                    queue.push([nextRow, nextCol]);
                    visited[nextRow][nextCol] = true;
                    map[nextRow][nextCol] = OUT_BLANK;
                }
            }
        }
    }
}

// 치즈가 있는지 찾는 함수
const findCheese = () => {
    let cheese = [];
    for (let row = 0; row < n; row++) {
        for (let col = 0; col < k; col++) {
            if (map[row][col] === CHEESE) cheese.push([row, col]);
        }
    }

    return cheese.length > 0 ? cheese : null;
}

// 너비우선 탐색
// 치즈가 있는곳 부터 시작해서 녹는 치즈를 CHEESE -> MELTED_CHEESE로 바꾸는 함수
const bfs = (start) => {
    let visited = Array.from(Array(n), () => Array(k).fill(false));
    let queue = [];
    let check = false;
    queue.push(...start);
    visited[start[0][0]][start[0][1]] = true;

    while (queue.length > 0) {
        const [curRow, curCol] = queue.shift();
        let count = 0;
        for (let i = 0; i < 4; i++) {
            const [nextRow, nextCol] = [curRow + dy[i], curCol + dx[i]];
            if (nextRow >= 0 && nextCol >= 0 && nextCol < k && nextRow < n) {
                if (map[nextRow][nextCol] === CHEESE && visited[nextRow][nextCol] === false) {
                    queue.push([nextRow, nextCol]);
                    visited[nextRow][nextCol] = true;
                }
                if (map[nextRow][nextCol] === OUT_BLANK) count++;
            }
        }
        if (count >= 2) {
            map[curRow][curCol] = MELTED_CHEESE;
            check = true;
        }
    }

    return check;
}

let answer = 0;

while (true) {
    findOutBlank();
    const cheese = findCheese();
    if (cheese !== null) {
        const isCheeseMelt = bfs(cheese);

        if (isCheeseMelt) {
            answer++;
        }
        else break;
    }
    else break;
}

console.log(answer);
