// 연구소
let fs = require('fs');
let input = fs.readFileSync('./example.txt').toString().trim().split('\n');
const [n, m] = input[0].split(' ').map((v) => Number(v));
let matrix = input.slice(1).map((v) => v.split(' ').map((v) => Number(v)));

const emptySpace = [];
matrix.forEach((arr, row) => arr.map((value, col) => {
    if (value === 0) emptySpace.push([row, col]);
}))


const getCombinations = function (arr, selectNumber) {
    const results = [];
    if (selectNumber === 1) return arr.map((el) => [el]);
    // n개중에서 1개 선택할 때(nC1), 바로 모든 배열의 원소 return

    arr.forEach((fixed, index, origin) => {
        const rest = origin.slice(index + 1);
        // 해당하는 fixed를 제외한 나머지 뒤
        const combinations = getCombinations(rest, selectNumber - 1);
        // 나머지에 대해서 조합을 구한다.
        const attached = combinations.map((el) => [fixed, ...el]);
        //  돌아온 조합에 떼 놓은(fixed) 값 붙이기
        results.push(...attached);
        // 배열 spread syntax 로 모두다 push
    });

    return results; // 결과 담긴 results return
}


const dx = [1, -1, 0, 0]; // col
const dy = [0, 0, -1, 1]; // row

const checkOutofRange = (row, col) => {
    return (row >= 0 && row < n && col >= 0 && col < m);
}

const bfs = (lab) => {
    const queue = [];
    lab.map((arr, row) => arr.map((value, col) => {
        if (value === 2) {
            queue.push([row, col]);
        }
    }))

    while (queue.length > 0) {
        const [row, col] = queue.shift();

        for (let i = 0; i < 4; i++) {
            const [nextRow, nextCol] = [row + dy[i], col + dx[i]];
            if (checkOutofRange(nextRow, nextCol) === true && lab[nextRow][nextCol] === 0) {
                queue.push([nextRow, nextCol]);
                lab[nextRow][nextCol] = 2;
            }
        }
    }

    let saftyZone = 0;
    lab.map((arr) => arr.map((value) => {
        if (value === 0) saftyZone++;
    }))
    return saftyZone;
}

const combinations = getCombinations(emptySpace, 3);

let answer = 0;

for (const combination of combinations) {


    // 연구실 복사
    const lab = Array.from(Array(n), () => Array(m).fill(0));

    for (let i = 0; i < n; i++) {
        for (let j = 0; j < m; j++) {
            lab[i][j] = matrix[i][j];
        }
    }

    const [[row1, col1], [row2, col2], [row3, col3]] = combination;

    lab[row1][col1] = 1;
    lab[row2][col2] = 1;
    lab[row3][col3] = 1;

    answer = Math.max(answer, bfs(lab));


    // 원상복구
    lab[row1][col1] = 0;
    lab[row2][col2] = 0;
    lab[row3][col3] = 0;
}
answer = answer.toString();
console.log(answer);
