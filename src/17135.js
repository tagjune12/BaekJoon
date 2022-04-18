// 캐슬디펜스

let input = require('fs').readFileSync('/dev/stdin').toString().trim().split('\n');
const [N, M, D] = input.shift().split(" ").map(v => +v);
let graph = input.map(arr => arr.trim().split(" ").map(x => +x));

// 궁수는 동시에 공격, 궁수의 공격이 끝내면 적은 아래로 한칸 이동, 성이 있는 칸으로 가면 게임에서 제외
// 궁수는 세명
// 공격대상은 가장 가까운놈으로, 여러명이면 가장 왼쪽, 한놈을 여러명이 공격가능, 공격받으면 게임에서 제외
// 거리 = |r1-r2| + |c1-c2|

const compare = (targetA, targetB) => {
    if (targetA[1] !== targetB[1]) {
        return targetA[1] - targetB[1];
    }
    else {
        return targetA[2] - targetB[2];
    }
}

const getCombination = (arr, selectNumber) => {
    if (selectNumber === 1) return arr.map(number => [number]);

    const result = [];
    arr.forEach((number, index, arr) => {
        const fixedNumber = number;
        const restNumbers = arr.slice(index + 1);
        const combinations = getCombination(restNumbers, selectNumber - 1);
        const combineFix = combinations.map(v => [fixedNumber, ...v]);
        result.push(...combineFix);
    });

    return result;
}

function solution(N, M, D, graph) {
    let answer = Number.MIN_SAFE_INTEGER;

    const archerColumns = Array.from(Array(M), (_, index) => index);
    const archerColCombination = getCombination(archerColumns, 3);

    const attack = (archers, enemies, D) => {
        let kill = 0;
        const archerRow = N;

        while (enemies.length) {
            const isEnemyAlive = Array(enemies.length).fill(true);
            for (const archerCol of archers) {
                const targets = [];
                for (let i = 0; i < enemies.length; i++) {
                    const [enemyRow, enemyCol] = enemies[i];
                    const distance = Math.abs(archerRow - enemyRow) + Math.abs(archerCol - enemyCol);
                    if (distance <= D) {
                        targets.push([i, distance, enemyCol]);
                    }
                }
                if (targets.length) {
                    const target = targets.sort(compare)[0][0];
                    isEnemyAlive[target] = false;
                }
            }
            kill += isEnemyAlive.filter(isAlive => !isAlive).length;
            enemies = enemies.filter((_, index) => isEnemyAlive[index]);
            // enemy move
            enemies.forEach((position, index, origin) => {
                const [row, col] = position;
                origin[index] = [row + 1, col];
            });
            enemies = enemies.filter(position => position[0] < N);
        }

        return kill;
    }

    archerColCombination.forEach(archer => {
        const enemies = [];
        for (let row = N - 1; row >= 0; row--) {
            for (let col = 0; col < M; col++) {
                if (graph[row][col] === 1) enemies.push([row, col]);
            }
        }
        const kill = attack(archer, enemies, D);
        answer = Math.max(kill, answer);
    })
    return answer;
}

console.log(solution(N, M, D, graph));