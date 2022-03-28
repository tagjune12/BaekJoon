// 마법사 상어와 비바라기

// let input = require('fs').readFileSync('/dev/stdin').toString().trim().split('\n');
let input = require('fs').readFileSync('./example.txt').toString().trim().split('\n');
const [n, m] = input.shift().split(" ").map(x => +x);

const map = [];
const d = [];
const s = [];
let clouds = [[n - 1, 0], [n - 1, 1], [n - 2, 0], [n - 2, 1]];

const directions = {
    // row, col 순서
    1: [0, -1],
    2: [-1, -1],
    3: [-1, 0],
    4: [-1, 1],
    5: [0, 1],
    6: [1, 1],
    7: [1, 0],
    8: [1, -1]
}

for (let i = 0; i < n; i++) {
    map.push(input.shift().trim().split(" ").map(v => +v));
}


for (const element of input) {
    const [a, b] = element.trim().split(" ").map(v => +v);
    d.push(a);
    s.push(b);
}



function checkCross(row, col) {
    const arr = [[row - 1, col - 1], [row + 1, col + 1], [row + 1, col - 1], [row - 1, col + 1]];

    return arr.filter(value => (value[0] >= 0 && value[1] >= 0 && value[0] < n && value[1] < n) && (map[value[0]][value[1]] > 0)).length;
}

function createCloud(clouds) {
    let result = [];
    map.forEach((arr, row) => arr.forEach((water, col) => {
        // 바로 이전에 구름이 생성되었던 곳인지 확인
        let check = true;
        for (const cloud of clouds) {
            if (cloud[0] === row && cloud[1] === col) {
                check = false;
                break;
            }
        }
        if (water >= 2 && check === true) {
            map[row][col] = water - 2;
            result.push([row, col]);
        }
    }))

    return result;
}

for (let i = 0; i < m; i++) {

    const direction = directions[d[i]];
    const newCloudsPos = [];
    for (const cloud of clouds) {
        // 구름 이동
        const [row, col] = [(cloud[0] + direction[0] * s[i] + n * 25) % n, (cloud[1] + direction[1] * s[i] + n * 25) % n];
        // 물양 증가
        map[row][col]++;
        newCloudsPos.push([row, col]);

    }

    for (const newCloud of newCloudsPos) {
        const [newRow, newCol] = newCloud;
        map[newRow][newCol] = map[newRow][newCol] + checkCross(newRow, newCol);
    }
    clouds = [...newCloudsPos];
    clouds = [...createCloud(clouds)];
}

const answer = map.reduce((acc, arr) => {
    return acc + arr.reduce((acc2, value) => {
        return acc2 + value;
    })
}, 0)

console.log(answer);

