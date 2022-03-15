// 유기농 배추

let input = require('fs').readFileSync('./example.txt').toString().trim().split('\n');
const t = Number(input.shift()); // 테스트케이스 개수

const dx = [0, 0, 1, -1]; // col
const dy = [1, -1, 0, 0]; // row

// 입력 받기
for (let i = 0; i < t; i++) {
    const [m, n, k] = input.shift().split(" ").map(value => +value);// 가로 세로 배추개수
    const matrix = Array.from(Array(n), () => Array(m).fill(0));

    const start = [];
    for (let j = 0; j < k; j++) {
        const [col, row] = input.shift().split(" ").map(value => +value);
        start[start.length] = [row, col];

        matrix[row][col] = 1;
    }

    const checkOutOfMatrix = (row, col) => {
        return (row >= 0 && col >= 0 && row < n && col < m);
    }

    const bfs = (matrix, start) => {
        const queue = [start];

        matrix[start[0]][start[1]] = 0;

        while (queue.length > 0) {
            const [curRow, curCol] = queue.shift();

            for (let i = 0; i < 4; i++) {
                const [nextRow, nextCol] = [curRow + dy[i], curCol + dx[i]];
                if (checkOutOfMatrix(nextRow, nextCol) === true && matrix[nextRow][nextCol] === 1) {
                    queue[queue.length] = [nextRow, nextCol];
                    matrix[nextRow][nextCol] = 0;
                }
            }
        }
    }

    let answer = 0;
    for (const element of start) {
        const [row, col] = element;
        if (matrix[row][col] === 1) {
            bfs(matrix, element);
            answer++;
        }
    }
    console.log(answer);
}