let input = require('fs').readFileSync('dev/stdin').toString().trim().split('\n');

function solution() {
  const [users, friends] = input.shift().split(' ').map(v => +v);
  const relationShip = Array.from(Array(users + 1), () => Array(users + 1).fill(0));
  input.forEach(friendShip => {
    const [from, to] = friendShip.split(' ').map(v => +v);
    if (relationShip[from][to]) return;
    relationShip[from][to] = 1;
    relationShip[to][from] = 1;
  });
  const cache = Array.from(Array(users + 1), () => Array(users + 1).fill(0));

  const bfs = (start, end) => {
    const queue = [[start, 0]];
    const visited = Array(users + 1).fill(false);
    visited[start] = true;

    while (queue.length > 0) {
      const [cur, count] = queue.shift();
      if (cur === end) return count;

      relationShip[cur].forEach((relation, index) => {
        if (relation === 1 && !visited[index]) {
          // console.log(`${cur} -> ${index}  |  ${count} -> ${count + 1}`);
          visited[index] = true;
          queue.push([index, count + 1]);
        }
      });
    }
  }

  for (let i = 1; i <= users; i++) {
    for (let j = 1; j <= users; j++) {
      // 나 자신인 경우 or 역방향으로 탐색한적 있는 경우 skip
      if (i === j || cache[j][i]) continue;

      const count = bfs(i, j);
      cache[i][j] = count;
      cache[j][i] = count;
      // console.log('End')
    }
  }



  let answer = [0, Number.MAX_SAFE_INTEGER];
  // console.log(cache);
  const totalCount = cache.map(from => from.reduce((acc, count) => count === 0 ? acc : acc + count, 0));

  for (let i = 1; i <= users; i++) {
    if (answer[1] > totalCount[i]) {
      answer = [i, totalCount[i]];
    }
  }
  // console.log(totalCount);
  console.log(answer[0]);
}

solution();