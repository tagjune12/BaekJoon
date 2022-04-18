// 괄호 제거
const input = require('fs').readFileSync('./example.txt').toString().trim().split('\n')[0];

function getCombination(arr, selectNumber) {
    if (selectNumber === 1) return arr.map(v => [v]);

    const result = [];
    arr.forEach((number, index, origin) => {
        const fixedNumber = number;
        const restNumArr = origin.slice(index + 1);
        const restNumCombination = getCombination(restNumArr, selectNumber - 1);
        const combinations = restNumCombination.map(combination => [fixedNumber, ...combination]);
        result.push(...combinations);
    });

    return result;
}

const solution = (input) => {
    const answer = [];
    const stack = [];
    const bracket = [];

    for (let i = 0; i < input.length; i++) {
        const character = input[i];

        if (character === '(') stack.push(i)
        else if (character === ')') {
            const top = stack.pop();
            bracket.push([top, i]);
        }
        else continue;
    }

    const expression = input.split("");
    for (let i = 0; i < bracket.length; i++) {
        const targetCombination = getCombination(bracket, i + 1);
        for (const targets of targetCombination) {
            const target = targets.flat();
            const removedExp = expression.filter((_, index) => !target.includes(index));
            const joinedExp = removedExp.join("");
            if (!answer.includes(joinedExp)) {
                answer.push(joinedExp);
            }
        }
    }
    return answer.sort().reduce((acc, value) => acc + value + '\n', "").trim();
}

console.log(solution(input));

