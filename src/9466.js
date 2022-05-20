// 텀 프로젝트

let input = require('fs').readFileSync('./example.txt').toString().trim().split("\n");

const T = parseInt(input.shift());

const solution = (T) => {
  // 사실 잘 이해가 안됨
  for (let i = 0; i < T; i++) {
    const length = parseInt(input.shift());
    const students = [0, ...input.shift().trim().split(" ").map(v => +v)];
    let visited = Array(length + 1).fill(false); // 방문 체크
    let finished = Array(length + 1).fill(false); // 방문한 노드에서 사이클을 뽑아냈는지 확인
    let answer = 0; // 사이클 수
    // dfs
    const dfs = (current) => {
      if (visited[current]) return;
      visited[current] = true;
      const next = students[current];

      // 1 4 7 6

      if (!visited[next]) dfs(next);
      else { // 다음 노드를 방문한적 있는 경우
        if (!finished[next]) { // 다음 노드로부터 사이클을 뽑아낸적 없는 경우
          answer++;
          for (let i = next; i !== current; i = students[i]) {
            answer++;
          }
        }
      }
      finished[current] = true;
    }
    // main
    for (let i = 1; i <= length; i++) {
      dfs(i);
    }
    console.log(length - answer);
  }
}

solution(T);

// https://bcp0109.tistory.com/32