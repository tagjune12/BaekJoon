// 나무 재테크

let input = require('fs').readFileSync('./example.txt').toString().trim().split('\n');
// let input = require('fs').readFileSync('/dev/stdin').toString().trim().split('\n');
// N = 땅 크기, M = 구매한 나무 수
const [N, M, K] = input.shift().split(" ").map(v => +v);
const A = input.splice(0, N).map(nutrients => nutrients.trim().split(" ").map(nutrient => +nutrient));
const treesInfo = input.map(info => info.trim().split(" ").map(v => +v));

const spring = (treesInfo, nutrients) => {
    const deadTrees = [];
    treesInfo.forEach((info, index, origin) => {
        const [row, col, old] = info;

        if (old <= nutrients[row][col]) {
            nutrients[row][col] -= old;
            origin[index][2]++;
        }
        else {
            deadTrees.push([row, col, old]);
            origin[index][2] = 0;
        };
    })
    const updatedTreesInfo = treesInfo.filter(info => info[2] !== 0);
    return [deadTrees, updatedTreesInfo];
}

const summer = (deadTrees, nutrients) => {
    deadTrees.map(deadTree => {
        const [row, col, old] = deadTree;
        nutrients[row][col] += Math.floor(old / 2);
    });
}

const fall = (treesInfo) => {
    const newTrees = [];
    treesInfo.forEach(info => {
        let [row, col, old] = info;
        if (old % 5 === 0) {
            const nextPos = [[row - 1, col - 1], [row - 1, col], [row - 1, col + 1], [row, col - 1], [row, col + 1], [row + 1, col - 1], [row + 1, col], [row + 1, col + 1]];
            for (const position of nextPos) {
                const [nextRow, nextCol] = position;
                if (nextRow >= 1 && nextCol >= 1 && nextRow <= N && nextCol <= N) {
                    newTrees.push([nextRow, nextCol, 1]);
                }
            }
        }
    })
    newTrees.push(...treesInfo);
    return newTrees;
}

const winter = (nutrients, A) => {
    for (let i = 1; i <= N; i++) {
        for (let j = 1; j <= N; j++) {
            nutrients[i][j] += A[i - 1][j - 1];
        }
    }
}

const solution = (treesInfo, A, K) => {
    const nutrients = Array.from(Array(N + 1), () => Array(N + 1).fill(5));
    let updatedTreesInfo = treesInfo;
    let deadTrees;
    for (let i = 0; i < K; i++) {
        [deadTrees, updatedTreesInfo] = spring(updatedTreesInfo, nutrients);
        if (deadTrees.length > 0) {
            summer(deadTrees, nutrients);
        }
        updatedTreesInfo = fall(updatedTreesInfo);
        winter(nutrients, A);
    }
    return updatedTreesInfo.length;
}

console.log(solution(treesInfo, A, K));