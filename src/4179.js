// 불!
// let input = require('fs').readFileSync('/dev/stdin').toString().trim().split('\n');
let input = require('fs').readFileSync('./example.txt').toString().trim().split('\n');
const [R, C] = input.shift().split(" ").map(v => +v);
let maze = input.map(arr => arr.trim().split(""));

const solution = (maze) => {

    const FIRE = 'F';
    const WALL = '#';
    const SPACE = '.';
    const JIHOON = 'J';

    const checkOutOfRange = (row, col) => {
        return (row < R && row >= 0 && col < C && col >= 0);
    }

    const bfs = (maze, start) => {
        const dx = [-1, 1, 0, 0];
        const dy = [0, 0, -1, 1];

        const queue = [...start];
        const visited = Array.from(Array(R), () => Array(C).fill(false));

        let numOfJihoon = 1;

        while (queue.length) {
            const [row, col] = queue.shift();
            if (maze[row][col] === JIHOON && (row + 1 === R || col + 1 === C || row === 0 || col === 0)) return visited[row][col] + 1;

            for (let i = 0; i < 4; i++) {
                const [nextRow, nextCol] = [row + dy[i], col + dx[i]];
                if (checkOutOfRange(nextRow, nextCol)) {
                    if (maze[row][col] === JIHOON && visited[nextRow][nextCol] === false && maze[nextRow][nextCol] === SPACE) {
                        queue.push([nextRow, nextCol]);
                        visited[nextRow][nextCol] = visited[row][col] + 1;
                        maze[nextRow][nextCol] = JIHOON;
                        numOfJihoon++;
                    }
                    if (maze[row][col] === FIRE && maze[nextRow][nextCol] !== WALL && maze[nextRow][nextCol] !== FIRE) {
                        queue.push([nextRow, nextCol]);
                        if (maze[nextRow][nextCol] === JIHOON) numOfJihoon--;
                        maze[nextRow][nextCol] = FIRE;
                    }
                }
            }
            if (numOfJihoon === 0) break;
        }

        return 'IMPOSSIBLE';
    }

    const start = [];
    for (let i = 0; i < R; i++) {
        for (let j = 0; j < C; j++) {
            if (maze[i][j] === JIHOON) start.push([i, j]);
            if (maze[i][j] === FIRE) start.push([i, j]);
        }
    }

    return bfs(maze, start);

}

console.log(solution(maze))