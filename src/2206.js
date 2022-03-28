// // 벽 부수고 이동하기

// // 시간초과
// let input = require('fs').readFileSync('./example.txt').toString().trim().split('\n');
// // let input = require('fs').readFileSync('/dev/stdin').toString().trim().split('\n');
// const [n, m] = input.shift().split(" ").map(v => +v); // row, col

// const map = input.map(arr => arr.trim().split("").map(v => +v));

// const checkOutOfRange = (row, col) => {
//     return (row >= 0 && row < n && col >= 0 && col < m);
// }

// const solution = (n, m, map) => {
//     const dx = [1, -1, 0, 0];
//     const dy = [0, 0, 1, -1];

//     const bfs = (n, m, map) => {
//         // 방문X = 0, 벽 안부수고 방문 = 2, 벽 부수고 방문 = 1
//         const visited = Array.from(Array(n), () => Array(m).fill(0));
//         visited[0][0] = 2;
//         const queue = [[0, 0, false, 1]]; // row, col, 벽을 부쉈는지 여부, cost

//         while (queue.length > 0) {
//             const [row, col, crush, cost] = queue.shift();

//             if (row === n - 1 && col === m - 1) return cost;

//             for (let i = 0; i < 4; i++) {
//                 const [nextRow, nextCol] = [row + dy[i], col + dx[i]];

//                 if (crush) {
//                     if (checkOutOfRange(nextRow, nextCol) === true && visited[nextRow][nextCol] === 0 && map[nextRow][nextCol] === 0) {
//                         visited[nextRow][nextCol] = 1;
//                         queue[queue.length] = [nextRow, nextCol, true, cost + 1];
//                     }
//                 }
//                 else {
//                     if (checkOutOfRange(nextRow, nextCol) === true && visited[nextRow][nextCol] < 2) {
//                         // 벽을 안부수고 진행
//                         if (map[nextRow][nextCol] === 0) {
//                             visited[nextRow][nextCol] = 2;
//                             queue[queue.length] = [nextRow, nextCol, false, cost + 1];
//                         }
//                         // 벽을 부수고 진행
//                         else {
//                             visited[nextRow][nextCol] = 1;
//                             queue[queue.length] = [nextRow, nextCol, true, cost + 1];
//                         }
//                     }
//                 }
//             }
//         }
//         return -1;
//     }

//     return bfs(n, m, map);

// }

// 벽 부수고 이동하기
// 메모리 초과
// let input = require('fs').readFileSync('./example.txt').toString().trim().split('\n');
// // let input = require('fs').readFileSync('/dev/stdin').toString().trim().split('\n');
// const [n, m] = input.shift().split(" ").map(v => +v); // row, col

// const map = input.map(arr => arr.trim().split("").map(v => +v));

// const checkOutOfRange = (row, col) => {
//     return (row >= 0 && row < n && col >= 0 && col < m);
// }

// const solution = (n, m, map) => {
//     const dx = [1, -1, 0, 0];
//     const dy = [0, 0, 1, -1];

//     const bfs = (n, m, map) => {

//         const visited = Array.from(Array(n), () => Array(m).fill(0));
//         visited[0][0] = 1;
//         const queue = [[0, 0]]; // row, col, 벽을 부쉈는지 여부

//         for (const element of queue) {
//             let [row, col] = element;
//             for (let i = 0; i < 4; i++) {
//                 const [nextRow, nextCol] = [row + dy[i], col + dx[i]];
//                 if (checkOutOfRange(nextRow, nextCol) === true && visited[nextRow][nextCol] === 0) {
//                     if (map[nextRow][nextCol] === 0) {
//                         visited[nextRow][nextCol] = visited[row][col] + 1;
//                         queue[queue.length] = [nextRow, nextCol];
//                     }
//                 }
//             }
//         }
//         return visited[n - 1][m - 1] === 0 ? Number.MAX_VALUE : visited[n - 1][m - 1];
//     }

//     let answer = Number.MAX_VALUE;

//     map.map((arr, row) => arr.map((value, col) => {
//         if (value === 1) {
//             map[row][col] = 0;
//             answer = Math.min(bfs(n, m, map), answer);
//             map[row][col] = 1;
//         }
//     }))

//     return answer === Number.MAX_VALUE ? -1 : answer;
// }


// 시간초과


// let input = require('fs').readFileSync('./example.txt').toString().trim().split('\n');
// // let input = require('fs').readFileSync('/dev/stdin').toString().trim().split('\n');
// const [n, m] = input.shift().split(" ").map(v => +v); // row, col

// const map = input.map(arr => arr.trim().split("").map(v => +v));

// const checkOutOfRange = (row, col) => {
//     return (row >= 0 && row < n && col >= 0 && col < m);
// }

// const solution = (n, m, map) => {
//     const dx = [1, -1, 0, 0];
//     const dy = [0, 0, 1, -1];

//     const bfs = (n, m, map) => {
//         // 방문X = 0, 벽 안부수고 방문 = 2, 벽 부수고 방문 = 1
//         const visited = Array.from(Array(n), () => Array(m).fill(0));
//         visited[0][0] = 2;
//         const queue = [[0, 0, false, 1]]; // row, col, 벽을 부쉈는지 여부, cost

//         while (queue.length > 0) {
//             const [row, col, crush, cost] = queue.shift();

//             if (row === n - 1 && col === m - 1) return cost;

//             for (let i = 0; i < 4; i++) {
//                 const [nextRow, nextCol] = [row + dy[i], col + dx[i]];

//                 if (crush) { //현재 지점이 벽을 부수고 경로일 경우
//                     if (checkOutOfRange(nextRow, nextCol) === true && visited[nextRow][nextCol] === 0 && map[nextRow][nextCol] === 0) {
//                         visited[nextRow][nextCol] = 1;
//                         queue[queue.length] = [nextRow, nextCol, true, cost + 1];
//                     }
//                 }
//                 else { // 현재 지점이 벽을 부수지않고 온 경로인 경우
//                     if (checkOutOfRange(nextRow, nextCol) === true && visited[nextRow][nextCol] < 2) {
//                         // 벽을 안부수고 진행
//                         if (map[nextRow][nextCol] === 0) {
//                             visited[nextRow][nextCol] = 2;
//                             queue[queue.length] = [nextRow, nextCol, false, cost + 1];
//                         }
//                         // 벽을 부수고 진행
//                         else {
//                             visited[nextRow][nextCol] = 1;
//                             queue[queue.length] = [nextRow, nextCol, true, cost + 1];
//                         }
//                     }
//                 }
//             }
//         }
//         return -1;
//     }

//     return bfs(n, m, map);

// }


// console.time("stamp");
// console.log(solution(n, m, map));
// console.timeEnd("stamp");
// // https://lhoiktiv.tistory.com/234

class Node {
    constructor(item) {
        this.item = item;
        this.next = null;
    }
}

class Queue {
    constructor() {
        this.head = null;
        this.tail = null;
        this.length = 0;
    }

    push(item) {
        const node = new Node(item)
        if (this.head == null) {
            this.head = node;
            this.head.next = null;
        } else {
            this.tail.next = node;
        }

        this.tail = node;
        this.length += 1;
    }

    pop() {
        const popItem = this.head;
        this.head = this.head.next;
        this.length -= 1;
        return popItem.item;
    }

    size() {
        return this.length;
    }

    empty() {
        if (this.length == 0) {
            return 1;
        } else {
            return 0;
        }
    }

    front() {
        if (this.empty() == 1) return -1;
        return this.head.item;
    }

    back() {
        if (this.empty() == 1) return -1;
        return this.tail.item;
    }
}

const fs = require('fs');
const [n, ...arr] = fs.readFileSync("./example.txt").toString().trim().split("\n");
const [R, C] = n.split(' ').map(v => +v)
const miro = arr.map(v => v.split('').map(w => +w));
let answer = -1
let isVisited = Array.from(Array(R), () => Array(C).fill(0));
isVisited[0][0] = true;
let q = new Queue();
q.push([0, 0, 1, false]);


console.time("stamp");
while (!q.empty()) {


    let [r, c, n, p] = q.pop(); //세로 가로 횟수 펀치했는지
    if (r == R - 1 && c == C - 1) {
        answer = n;
        break;
    } else {
        if (p) { // 이미 벽한번 부셨을 떄. 못부신다.
            const route = [[r + 1, c], [r - 1, c], [r, c + 1], [r, c - 1]]
            route.forEach(v => {
                let y = v[0]
                let x = v[1]
                if (y > -1 && y < R && x > -1 && x < C && miro[y][x] == 0) {//일단 미로 안의 영역이고 길(0)이라면?
                    if (isVisited[y][x] < 1) { //안깨고 갔던 길은 못가게 해야됨.. 
                        //안깨고 갈 수 있는 길을 뭐하러 부시냥께?? 근데 부셔서 더 빨리 갈수 있으면 어떡하노? 
                        isVisited[y][x] = 1;   // 부시고 간 길은 1로 칠해줌. 
                        q.push([y, x, n + 1, p]);
                    }
                }
            })
        } else { // 벽을 아직 안부셨을 때,==> 부시고 갈 수 있따! 부시고 간 길도 다시 갈 수 있다!
            const route = [[r + 1, c], [r - 1, c], [r, c + 1], [r, c - 1]]
            route.forEach(v => {
                let y = v[0]
                let x = v[1]
                if (y > -1 && y < R && x > -1 && x < C) {//일단 미로 안의 영역이고 길이라면?
                    if (miro[y][x] == 0) {// 길도 갈 수 있고
                        if (isVisited[y][x] < 2) { //안 갔던 길도 갈 수 있고(0). 깨부시고 같던 길(1)도 갈 수 있음
                            isVisited[y][x] = 2; // 평범하게 간 길은 2로 칠해줌. 
                            q.push([y, x, n + 1, p])
                        }
                    } else { // 벽도 부실 수 있음.
                        if (isVisited[y][x] < 2) {
                            isVisited[y][x] = 1;   //이건 뭘로 칠해줘야할까?? 일단 벽을 부시고 간거니까 1로 칠해주자. 
                            q.push([y, x, n + 1, !p]) // 이제 앞으로 벽은 못부수게 p값을 바꿔줌. 
                        }
                    }
                }
            })

        }
    }
}


console.log(answer);
console.timeEnd("stamp");