// 효율적인 해킹
// 시간 초과
let fs = require('fs');
let input = fs.readFileSync('./example.txt').toString().split('\n')
const [n, m] = input.shift().split(" ").map(v => +v);

const graph = {};
// 그래프 만들기
for (let i = 0; i < m; i++) {
    const [to, from] = input.shift().split(" ").map(v => +v);
    if (graph[from] === undefined) {
        graph[from] = [];
    }
    graph[from].push(to);
}

const dfs = (start) => {
    const stack = [];
    const visited = [];

    // visited.push(start);
    stack.push(start);

    while (stack.length > 0) {
        const curNode = stack.pop();
        const children = graph[curNode];

        if (children === undefined) continue;
        else {
            if (!visited.includes(curNode)) {
                visited.push(curNode);
                stack.push(...children);
                // console.log(stack);
            }
        }
    }
    // console.log(visited);

    return visited.length;
}

const numOfHacked = Array(n).fill(0);
// console.log(graph);
for (const key in graph) {
    // console.log(key);
    const temp = dfs(parseInt(key));
    numOfHacked[parseInt(key)] = temp;
}

const max = Math.max(...numOfHacked);
const answer = [];
numOfHacked.forEach((value, index) => {
    if (value === max) answer.push(index);
})

console.log(...answer);
