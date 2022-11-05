function solution(m, arr) {
  if (arr.length === 1) {
    console.log(arr[0] * m);
    return;
  }
  let start = 0;
  let end = m * Math.max(...arr)
  while (start <= end) {
    let mid = Math.floor((start + end) / 2);
    let total = arr.reduce((acc, cur) => acc + Math.floor(mid / cur), 0);
    if (total >= m) end = mid - 1;
    else start = mid + 1;
  }
  console.log(end + 1);
}


const readline = require("readline");
const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
let input = [];
rl.on("line", function (line) {
  input.push(line);
}).on("close", function () {
  const [N, M] = input[0].split(" ").map(Number);
  const arr = input.slice(1).map(Number);
  solution(M, arr);
});