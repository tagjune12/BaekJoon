// DFS와 BFS

let input = require('fs').readFileSync('./example.txt').toString().trim().split('\n');
const [n, m, v] = input.shift().split(" ").map(value => +value);
let nodes = input.map(node => node.split(" ").map(x => +x));

// 첫줄은 DFS 두번째 줄은 BFS

const graph = {};

for (const node of nodes) {
    const [nodeA, nodeB] = node;

    if (graph[nodeA] === undefined) graph[nodeA] = [];
    if (graph[nodeB] === undefined) graph[nodeB] = [];

    graph[nodeA].push(nodeB);
    graph[nodeB].push(nodeA);
}

const dfs = (start) => {
    const stack = [start];
    const visited = [];

    while (stack.length > 0) {
        const curNode = stack.pop();

        if (!visited.includes(curNode)) {
            visited.push(curNode);
            const children = graph[curNode];
            if (children !== undefined) {
                stack.push(...children.reverse());
            }
        }
    }

    console.log(...visited);
}
const bfs = (start) => {
    const queue = [start];
    const visited = [];

    while (queue.length > 0) {
        const curNode = queue.shift();

        if (!visited.includes(curNode)) {
            visited.push(curNode);
            const children = graph[curNode];
            if (children !== undefined) {
                queue.push(...children.reverse());
            }
        }
    }

    console.log(...visited);
}

const compare = (a, b) => {
    return a - b;
}

for (const node in graph) {
    graph[node] = graph[node].sort(compare);
}
// console.log(graph);
dfs(v);
bfs(v);