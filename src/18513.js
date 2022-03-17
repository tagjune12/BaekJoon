// 샘터
// console.time("s");
let fs = require('fs');
let input = fs.readFileSync('./example.txt').toString().split('\n');
let [n, k] = input.shift().split(" ").map(v => +v);
let ponds = input.map(arr => arr.split(" ").map(x => +x))[0];


// 맞는 풀이

const dx = [-1, 1];
const maxLength = 100000000;
let misfortune = 0;

let leftHouse = k;

const bfs = (start) => {
    let queue = [...start]; // [[0,0],[3,3]]
    const visited = new Set([...start.map(value => value[0])]);

    let idx = 0;
    while (queue.length > 0) {
        const [curPosition, pond] = queue[idx];
        for (let i = 0; i < 2; i++) {
            const nextPosition = dx[i] + curPosition;
            // if (visited.has(nextPosition) === false && (-maxLength <= nextPosition && nextPosition <= maxLength)) {
            if (visited.has(nextPosition) === false) {

                queue[queue.length] = [nextPosition, pond];
                // visited[visited.length] = nextPosition;
                visited.add(nextPosition);
                misfortune += Math.abs(pond - nextPosition)
                leftHouse--;
                if (leftHouse === 0) {
                    // console.log(visited);
                    return;
                }
            }
        }
        idx++;
    }

}
const start = ponds.map(value => [value, value]);
bfs(start)
console.log(misfortune);