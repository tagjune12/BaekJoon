// 1.단어 구분
let input = require('fs').readFileSync('src/example.txt').toString().trim();

function solution(input) {
  let stack = [];
  let isTag = false;
  let answer = '';
  for (let i = 0; i < input.length; i++) {
    const char = input[i];
    // 태그가 처음 들어오는 경우
    if (char === '<') {
      isTag = true;
      if (stack.length > 0) {
        answer += stack.reverse().join('');
      }

      stack = [];
      stack.push(char);
      continue;
    }
    // 현재 태그 안을 탐색중인 경우
    if (isTag) {
      stack.push(char);
      if (char === '>') {// 태그 끝인경우
        answer += stack.join('');
        stack = [];
        isTag = false;
      }
    } else { // 태그를 탐색하는게 아닌 경우
      if (char === ' ') { // 공백이 들어온 경우 => 단어 끝
        answer += (stack.reverse().join('') + ' '); // 단어 뒤집기
        stack = [];
      } else {
        stack.push(char);
      }
    }

    if (i === input.length - 1) {
      answer += stack.reverse().join('');
    }
  }

  console.log(answer);
}

solution(input);