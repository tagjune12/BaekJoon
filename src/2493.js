// 탑
function solution() {
    let input = require("fs").readFileSync("./example.txt").toString().trim().split('\n');
    const stack = [];
    const answer = [];
    const N = parseInt(input.shift());
    input[0].split(" ").map((v, index) => {
        const tower = {
            height: parseInt(v),
            index
        };
        if (!stack.length) {
            stack.push(tower);
            answer.push(0);
            return;
        };

        if (stack[stack.length - 1].height > tower.height) {
            answer.push(stack.length ? stack[stack.length - 1].index + 1 : 0);
            stack.push(tower);
        } else {
            while (stack.length) {
                const top = stack[stack.length - 1].height;
                if (top < tower.height) {
                    stack.pop();
                } else {
                    break;
                }
            }
            answer.push(stack.length ? stack[stack.length - 1].index + 1 : 0);
            stack.push(tower);
        }



    });
    return answer.join(" ");
}

console.log(solution());