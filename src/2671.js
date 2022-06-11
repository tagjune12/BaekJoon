// 잠수함 식별

let input = require("fs").readFileSync("./example.txt").toString().trim();
// let input = require("fs").readFileSync("/dev/stdin").toString().trim();

console.log(solution(input));

function solution(signal) {
    const pattern = new RegExp(/^((100+1+)|01)+$/, 'g');
    console.log(signal.match(pattern));
    return signal.replace(pattern, "") ? "NOISE" : "SUBMARINE";
}