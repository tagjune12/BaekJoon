// 빙산

// let input = require('fs').readFileSync('/dev/stdin').toString().trim().split('\n');
let input = require('fs').readFileSync('./example.txt').toString().trim().split('\n');
const [N, M] = input.shift().trim().split(" ").map(v => +v);

const map = input.map(arr => arr.trim().split(" ").map(v => +v));

// N*M
function meltIceberg(sea) {
    const targets = [];
    let check = false;
    sea.map((arr, row, origin) => arr.map((iceberg, col) => {
        // 빙산을 찾고
        if (iceberg > 0) {
            // 빙산 상하좌우로 바다인지 확인하고 바다면 감소
            const nextPos = [[row + 1, col], [row - 1, col], [row, col + 1], [row, col - 1]];
            for (const position of nextPos) {
                const [nextRow, nextCol] = position;
                if (origin[nextRow][nextCol] === 0) {
                    origin[row][col]--;
                    check = true;
                }
            }
            // count가 빙산의 높이보다 큰거나 같은 값이면 0으로 만들고 false로 만든다
            // false로 만든 이유는 다른 빙산에서 바다를 체크할때 이번턴에 녹은 빙산을 바다로
            // 인식하지 않기 위해서임
            if (origin[row][col] <= 0) {
                // false로 만든 값들 나중에 0으로 만들기 위해 target에 저장
                targets.push([row, col]);
                origin[row][col] = false;
            }

        }
    }));

    // false로 바꿨던 값들 0으로 변경
    for (const target of targets) {
        const [row, col] = target;
        sea[row][col] = 0;
    }

    return check;
}

function checkOutofRange(row, col) {
    return (row >= 0 && row < N && col >= 0 && col < M);
}

function bfs(start, sea) {
    const queue = [start];

    sea[start[0]][start[1]] = 0;

    while (queue.length > 0) {
        const [row, col] = queue.shift();

        const nextPos = [[row + 1, col], [row - 1, col], [row, col + 1], [row, col - 1]];
        for (const pos of nextPos) {
            if (checkOutofRange(pos[0], pos[1]) && sea[pos[0]][pos[1]] !== 0) {
                queue.push(pos);
                sea[pos[0]][pos[1]] = 0;
            }
        }
    }
}

// N*M
function countIceberg(N, M, sea) {

    let count = 0;
    const copiedSea = Array.from(sea, (value) => [...value]);
    for (let i = 0; i < N; i++) {
        for (let j = 0; j < M; j++) {
            if (copiedSea[i][j] !== 0) {
                count++;
                bfs([i, j], copiedSea);
            }
        }
    }
    return count;
}

function solution(N, M, sea) {
    if (countIceberg(N, M, sea) > 1) return 0;

    let year = 0;
    while (meltIceberg(sea)) {
        year++;
        if (countIceberg(N, M, sea) > 1) return year;
    }

    return 0;
}


console.log(solution(N, M, map));