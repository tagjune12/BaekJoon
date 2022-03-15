// 치즈
let fs = require('fs');
let input = fs.readFileSync('./example.txt').toString().split('\n');
const [row, col] = input.shift().split(" ").map(v => +v);
// console.log(input);
let matrix = input.map(arr => arr.split(" ").map(x => +x));


// 북 동 남 서
const dx = [0, 1, 0, -1];
const dy = [-1, 0, 1, 0];

const checkOutOfMatrix = (curRow, curCol) => {
    // if (curRow < 0 || curCol < 0 || curRow >= row || curCol >= col) return false;
    // else return true;

    if (curRow >= 0 && curCol >= 0 && curRow < row && curCol < col) return true;
    else return false;
}

const countLeftCheese = () => {
    let count = 0;

    for (let i = 0; i < row; i++) {
        count += matrix[i].filter(value => value === 1).length;
    }

    return count;
}

const bfs = () => {
    const queue = [[0, 0]];
    const visited = Array.from(Array(row), () => Array(col).fill(false));
    let check = false;
    visited[0][0] = true;

    while (queue.length) {
        const [curRow, curCol] = queue.shift();

        for (let i = 0; i < 4; i++) {
            const [nextRow, nextCol] = [curRow + dx[i], curCol + dy[i]];

            if (checkOutOfMatrix(nextRow, nextCol) && visited[nextRow][nextCol] === false) {
                if (matrix[nextRow][nextCol] === 0) {
                    visited[nextRow][nextCol] = true;
                    queue.push([nextRow, nextCol]);
                }
                if (matrix[nextRow][nextCol] === 1) {
                    check = true;
                    visited[nextRow][nextCol] = true;
                    matrix[nextRow][nextCol] = 0;
                }
            }
        }
    }

    return check;
}

let hours = 0;
let lastCheese = 0;

while (true) {
    const temp = countLeftCheese();
    if (temp !== 0) {
        lastCheese = temp;
    }
    if (bfs()) {
        hours++;
    }
    else break;
}

console.log(hours);
console.log(lastCheese);
