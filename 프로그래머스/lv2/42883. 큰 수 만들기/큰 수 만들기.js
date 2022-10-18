function solution(number, k) {
    let count = 0;
    const stack = [number[0]];

    for(let i=1; i<number.length;i++){
        // console.log(stack, number[i], stack.at(-1), number[i] > stack.at(-1))
        while(count < k && number[i] > stack.at(-1)){
            // console.log("while");
            stack.pop();
            count++;
        }
        if(stack.length < (number.length - k)){
            stack.push(number[i]);
        }
    }
    
    // console.log(stack);
    
    return stack.join('');
}