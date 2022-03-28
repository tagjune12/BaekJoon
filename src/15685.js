// 드래곤 커브(2*n*g(@^g+1)+100^2)

// let input = require('fs').readFileSync('./example.txt').toString().trim().split('\n');
let input = require('fs').readFileSync('/dev/stdin').toString().trim().split('\n');
const n = input.shift();
const dragonCurves = input.map(row => row.trim().split(" ").map(value => +value));

// (2^g) +1개
function rotate(dragonCurve) {
    const result = [];

    // 회전 기준점
    const pivot = {};
    [pivot.x, pivot.y] = dragonCurve[dragonCurve.length - 1];

    for (let i = 0; i < dragonCurve.length - 1; i++) {
        const [x, y] = dragonCurve[i];
        // 90도 회전행렬에 의해 (x,y) => (-y, +x)됨
        const rotatedPos = [-1 * (y - pivot.y) + pivot.x, x - pivot.x + pivot.y];

        if (rotatedPos.every(value => value <= 100 && value >= 0)) {
            result.push(rotatedPos);
        }
    }
    return result.reverse();
}

//generation 번 연산
function drawDragonCurve(start, direction, generation) {
    const result = [start]; // (2^g) +1개
    const zeroGen = [start[0] + direction[0], start[1] + direction[1]];
    result.push(zeroGen);
    // 1세대부터 n세대 까지
    for (let i = 1; i <= generation; i++) {
        // 여태 그린 세대 드래곤 커브
        const dragonCurve = [...result];
        result.push(...rotate(dragonCurve));
    }

    return result;
}

function removeDuplication(coordinates) {
    return [...new Set(coordinates.join("|").split("|"))].map(value => value.split(',').map(v => +v));

    //참고링크 : https://intrepidgeeks.com/tutorial/deduplication-of-javascript-array-and-twodimensional-array
}


const solution = (n, dragonCurves) => {
    let answer = 0;
    const direction = [[1, 0], [0, -1], [-1, 0], [0, 1]];
    // 좌표들을 전부 담을 변수


    const coordinatePlane = [];
    // dragonCurves = n개
    for (const curve of dragonCurves) {
        const [x, y, d, g] = curve;
        coordinatePlane.push(drawDragonCurve([x, y], direction[d], g));
    }

    const coordinates = removeDuplication(coordinatePlane.flat());

    const map = Array.from(Array(101), () => Array(101).fill(false));
    for (const coordinate of coordinates) {
        const [row, col] = coordinate;
        map[row][col] = true;
    }
    // 100 * 100
    for (let row = 0; row < 100; row++) {
        for (let col = 0; col < 100; col++) {
            if (map[row][col] && map[row + 1][col] && map[row][col + 1] && map[row + 1][col + 1]) answer++;
        }
    }

    console.log(answer);
}

solution(n, dragonCurves);