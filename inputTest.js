// let fs = require('fs');
// let input = fs.readFileSync('/dev/stdin').toString().split('\n');
// const [n, m] = input.shift().split(" ");
// let graph = input.map(arr => arr.split("").map(x => +x));

let fs = require('fs');
let input = fs.readFileSync('./example.txt').toString().split('\n');
const [n, m] = input.shift().split(" ");
console.log(input);
let graph = input.map(arr => arr.split("").map(x => +x));

console.log(n, m);
console.log(graph);