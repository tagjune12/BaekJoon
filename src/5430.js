// AC
let input = require('fs').readFileSync('./example.txt').toString().trim().split("\n");
// let input = require('fs').readFileSync('/dev/stdin').toString().trim().split("\n");

// 함수 R은 배열에 있는 수를 뒤집는 함수
// 함수 D는 배열의 첫번째 수를 버리는 함수, 비어있는 배열에 D를 사용하면 Error 발생
// 함수는 조합해서 사용 가능 예를들어 RDD는 배열을 뒤집은 다음 처음 두 수를 버리는 함수

const T = parseInt(input.shift());

function solution(T) {

    for (let i = 0; i < T; i++) {
        const commandList = input.shift().trim();
        const n = parseInt(input.shift().trim());
        if (n === 0 && commandList.includes('D')) {
            console.log('error');
            input.shift();
            continue;
        }
        // n이 0보다 크거나 n==0이고 D가 없는경우
        // 숫자 배열
        let numberArr;
        if (n !== 0) {
            numberArr = input.shift().trim().split("");
            numberArr.pop();
            numberArr.shift();
            numberArr = numberArr.join("").split(",").map(v => +v);
        } else {
            input.shift();
            numberArr = [];
        }

        let checkReverse = 0;
        let checkError = false;
        for (const command of commandList) {
            if (command === 'R') {
                checkReverse++;
                continue;
            } else { // D인경우
                if (numberArr.length === 0) { // arr가 비어있는경우
                    console.log('error'); // 에러 출력하고 끝
                    checkError = true;
                    break;
                } else { // 비어있지 않은 경우
                    if (checkReverse % 2 == 0) {//짝수번 뒤집는 경우
                        numberArr.shift();
                    } else { // 홀수번 뒤집는경우
                        numberArr.pop();
                    }
                }
            }
        }
        if (checkError === false) {
            if (checkReverse % 2) numberArr = numberArr.reverse();
            console.log(`[${numberArr.toString().trim()}]`);
        }
    }
}
solution(T);