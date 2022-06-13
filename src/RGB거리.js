let input = require('fs').readFileSync('./example.txt').toString().trim().split('\n');
// let input = require('fs').readFileSync('/dev/stdin').toString().trim().split('\n');

const N = +input.shift();
const costs = [[0, 0, 0]];
costs.push(...input.map(cost => cost.split(' ').map(v => +v)));

solution(N, costs);

function solution(N, costs) {
  const totalCost = Array.from(Array(N + 1), () => Array(3).fill(0));

  totalCost[1][0] = costs[1][0];
  totalCost[1][1] = costs[1][1];
  totalCost[1][2] = costs[1][2];

  for (let i = 2; i < N + 1; i++) {
    totalCost[i][0] = Math.min(totalCost[i - 1][1] + costs[i][0], totalCost[i - 1][2] + costs[i][0]);
    totalCost[i][1] = Math.min(totalCost[i - 1][0] + costs[i][1], totalCost[i - 1][2] + costs[i][1]);
    totalCost[i][2] = Math.min(totalCost[i - 1][0] + costs[i][2], totalCost[i - 1][1] + costs[i][2]);
  }
  console.log(Math.min(...totalCost[N]));
}