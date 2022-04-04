// 거스름돈
// let input = require('fs').readFileSync('/dev/stdin').toString().trim().split('\n');
let input = require('fs').readFileSync('./example.txt').toString().trim().split('\n');

const N = parseInt(input.shift());

function solution(N) {
    // const coins = [2, 5];
    let answer = 100_000;
    let change = N;
    const range = parseInt(change / 5);


    for (let i = 0; i <= range; i++) {
        const remainChange = change - 5 * i;

        if (remainChange % 2 !== 0) continue;
        answer = Math.min(answer, parseInt(i + remainChange / 2));
    }

    return answer === 100_000 ? -1 : answer;
}

console.log(solution(N));