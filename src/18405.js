// 경쟁적 전염

let input = require('fs').readFileSync('./example.txt').toString().trim().split('\n');
const [n, k] = input.shift().split(" ").map(v => +v); // n = 시험관 크기, k = 바이러스 종류의 개수
const chamber = [];
// 성공
const solution = (chamber, s) => {

    const checkOutOfRange = (row, col) => {
        return (row >= 0 && row < n && col >= 0 && col < n);
    }

    const compare = (posA, posB) => {
        return chamber[posA[0]][posA[1]] - chamber[posB[0]][posB[1]];
    }

    // bfs
    const infection = (chamber, start, s) => {
        const dx = [0, 0, 1, -1];
        const dy = [1, -1, 0, 0];

        const queue = [...start];

        for (const pos of queue) {
            const [row, col, count] = pos;
            if (count === s) return;
            for (let i = 0; i < 4; i++) {
                const [nextRow, nextCol] = [row + dx[i], col + dy[i]];
                if (checkOutOfRange(nextRow, nextCol) && chamber[nextRow][nextCol] === 0) {
                    chamber[nextRow][nextCol] = chamber[row][col];
                    queue[queue.length] = [nextRow, nextCol, count + 1];
                }
            }
        }
    }

    // 바이러스가 있는 곳 담음
    const start = [];
    chamber.map((arr, row) => arr.map((element, col) => {
        if (element !== 0) {
            start[start.length] = [row, col, 0];
        }
    }));

    start.sort(compare);
    infection(chamber, start, s);
}

// 입력받기
for (let i = 0; i < n; i++) {
    // x = 행, y = 열
    chamber[i] = input.shift().split(" ").map(v => +v);
}
const [s, X, Y] = input.shift().split(" ").map(v => +v);

solution(chamber, s);
console.log(chamber[X - 1][Y - 1]);



// // 메모리초과
// const solution = (chamber, s) => {

//     const checkOutOfRange = (row, col) => {
//         return (row >= 0 && row < n && col >= 0 && col < n);
//     }

//     const compare = (posA, posB) => {
//         return chamber[posA[0]][posA[1]] - chamber[posB[0]][posB[1]];
//     }

//     const infection = (chamber, start) => {
//         const dx = [0, 0, 1, -1];
//         const dy = [1, -1, 0, 0];

//         for (const pos of start) {
//             const [row, col] = pos;

//             for (let i = 0; i < 4; i++) {
//                 const [nextRow, nextCol] = [row + dx[i], col + dy[i]];
//                 if (checkOutOfRange(nextRow, nextCol) && chamber[nextRow][nextCol] === 0) {
//                     chamber[nextRow][nextCol] = chamber[row][col];
//                 }
//             }
//         }
//     }

//     for (let i = 0; i < s; i++) {
//         // 바이러스가 있는 곳 담음
//         const start = [];
//         chamber.map((arr, row) => arr.map((element, col) => {
//             if (element !== 0) {
//                 start[start.length] = [row, col];
//             }
//         }));

//         start.sort(compare);
//         infection(chamber, start);
//     }
// }

// // 입력받기
// for (let i = 0; i < n; i++) {
//     // x = 행, y = 열
//     chamber[i] = input.shift().split(" ").map(v => +v);
// }
// const [s, X, Y] = input.shift().split(" ").map(v => +v);

// solution(chamber, s);
// console.log(chamber[X - 1][Y - 1]);