const input = require('fs').readFileSync('./example.txt').toString().trim().split("\n");
const testCase = parseInt(input.shift());

function solution(testCase) {

  for (let i = 0; i < testCase; i++) {
    const numOfNodes = parseInt(input.shift());
    const myParent = Array.from(Array(numOfNodes + 1), (_, index) => index);
    myParent[0] = null;

    for (let j = 0; j < numOfNodes - 1; j++) {
      const [parent, child] = input.shift().split(" ").map(v => +v);
      myParent[child] = parent;
    }
    const target = input.shift().split(" ").map(v => +v);

    const findAncestors = (start) => {
      const ancestors = [start];

      while (start !== myParent[start]) {
        ancestors.push(myParent[start]);
        start = myParent[start];
      }

      return ancestors;
    }

    const parents = target.map(value => findAncestors(value));
    for (const parent of parents[0]) {
      if (parents[1].includes(parent)) {
        console.log(parent);
        break;
      }
    }

  }
}

solution(testCase);
