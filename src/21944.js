let input = require('fs').readFileSync('/dev/stdin').toString().split('\n');

const N = +input.shift();
// 문제번호 난이도 알고리즘
let problems = input.splice(0, N).map(value => value.trim().split(' ').map(v => +v));
const M = +input.shift();
// const commands = input.splice(0).map(value => value.trim().split(' '));

console.log(solution(problems, input));

function solution(problems, input) {
  let answer = '';
  const commandList = {
    recommend: function (args) {
      // 알고리즘이 G인 애들중 가장 어려운 문제 출력
      // 난이도가 똑같으면 문제번호가 가장 큰걸로 출력
      // 단, x가 -1인경우 가장 쉬운걸로
      // 이것도 여러개면 번호가 가장 작은걸로
      const [category, order] = args;
      const problemsG = problems.filter(problem => problem[2] === category)
        .sort(sortEasySmall);

      return order < 0 ? problemsG[0] : problemsG[problemsG.length - 1];
    },
    recommend2: function (args) {
      // 1 이면 가장 어려운거
      // 단, 여러개일경우 문제 번호가 가장 큰거
      // -1 이면 가장 쉬운거
      // 단, 여러개일 경우 문제 번호가 가장 작은거
      const order = args;

      problems.sort(sortEasySmall);

      return order < 0 ? problems[0] : problems[problems.length - 1];
    },
    recommend3: function (args) {
      // x가 1이면 난이도 L이상, 가장 쉬운것 출력
      // 단, 여러개일 경우 문제번호가 작은것을 출력, 없으면 -1
      // x가 -1이면 난이도 L미만, 가장 어려운것 출력
      // 단, 여러개일 경우 문제번호가 큰것 출력, 없으면 -1
      const [order, level] = args;
      const problemsG = problems.filter(problem => order < 0 ? problem[1] < level : problem[1] >= level);

      if (problemsG.length === 0) return [-1];
      problemsG.sort(sortHardestLarge);

      return order < 0 ? problemsG[0] : problemsG[problemsG.length - 1];
      // sortEasiestSmall
    },
    add: function (args) {
      problems.push(args.map(v => +v));
    },
    solved: function (args) {
      const [target] = args;
      problems = problems.filter(problem => problem[0] !== target);
    }
  }

  while (input.length > 0) {
    const temp = input.shift().trim().split(' ');
    const command = temp[0];
    const args = temp.slice(1).map(v => +v);
    const result = commandList[command](args);
    // if (result) console.log(result[0]);
    if (result) answer = answer + result[0] + '\n';
  }

  // commands.forEach(command => {
  //   const commandName = command[0];
  //   const args = command.slice(1).map(v => +v);

  //   const result = commandList[commandName](args);
  //   if (result) console.log(result[0]);
  // });

  return answer;
}

function sortEasySmall(problemA, problemB) {
  if (problemA[1] === problemB[1]) { // 난이도가 같은경우
    return problemA[0] < problemB[0] ? -1 : 1; // 문제 번호가 작은 순
  } else { // 난이도가 다른 경우
    return problemA[1] < problemB[1] ? -1 : 1; // 난이도가 낮은 순
  }
}


function sortHardestLarge(problemA, problemB) {
  if (problemA[1] === problemB[1]) { // 난이도가 같은경우
    return problemA[0] > problemB[0] ? -1 : 1; // 문제 번호가 큰 순
  } else { // 난이도가 다른 경우
    return problemA[1] > problemB[1] ? -1 : 1; // 난이도가 높은순
  }
}
