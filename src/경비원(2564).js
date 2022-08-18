let input = require('fs').readFileSync('src/example.txt').toString().trim().split('\n');
const [garo, sero] = input.shift().split(' ').map(v => +v);
const [NORTH, SOUTH, WEST, EAST] = [1, 2, 3, 4];

function cvtToPos(direction, length) {
  let x = 0;
  let y = 0;
  let opposite;

  switch (direction) {
    case NORTH:
      opposite = SOUTH;
      x = length;
      break;
    case SOUTH:
      opposite = NORTH;
      x = length;
      y = sero;
      break;
    case WEST:
      opposite = EAST;
      y = length;
      break;
    case EAST:
      opposite = WEST;
      y = length;
      x = garo;
      break;
  }

  return { x, y, opposite };
}

function solution() {
  input.shift();

  // [방향, 거리]
  const markets = [];
  input.forEach(value => {
    const [direction, length] = value.split(' ').map(v => +v);
    markets.push(cvtToPos(direction, length));
  });

  const guard = markets.pop();
  guard.direction = +input[input.length - 1][0];
  const perimeter = (garo + sero) * 2;
  let answer = 0;

  markets.forEach((market) => {
    let distance = 0;
    if (market.opposite === guard.direction) {
      distance += guard.direction <= 2 ? sero + market.x + guard.x : garo + market.y + guard.y;
    } else { // 사이드 or 같은 줄
      distance += Math.abs(market.x - guard.x) + Math.abs(market.y - guard.y);
    }
    answer += Math.min(perimeter - distance, distance);
  })
  console.log(answer);
}

solution();
