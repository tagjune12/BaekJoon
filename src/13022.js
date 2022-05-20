// 늑대와 올바른 단어
// Type Error
let input = require('fs').readFileSync('./example.txt').toString().trim();

function solution(word) {
  const chars = ['w', 'o', 'l', 'f'];
  let n;

  const ruleOne = (word) => {
    for (const char of chars) {
      const regExp = new RegExp(`${char}`, 'g');
      const count = word.match(regExp).length;
      if (count === 0) return false;
      else if (n === undefined) n = count;
      else {
        if (n !== count) return false;
      }
    }

    return true;
  }

  const ruleTwo = (word) => {
    const searchedWord = [];
    for (let i = 1; i <= n; i++) {
      const regExp = new RegExp(`w{${i}}o{${i}}l{${i}}f{${i}}`, 'g');
      const matchResult = word.match(regExp);
      if (!matchResult) continue;
      searchedWord.push(...matchResult);
      word.replace(regExp, '');
    }
    return searchedWord.length > 0 ? searchedWord.join('').length === word.length : false;
  }

  return ruleOne(word) && ruleTwo(word) ? 1 : 0;
}

console.log(solution(input));