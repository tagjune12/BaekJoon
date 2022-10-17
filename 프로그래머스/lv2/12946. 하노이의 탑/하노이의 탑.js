function solution(n) {
    const answer = [];
    const hanoi = (n, start, temp, end) =>{
        if(n===1){
            answer.push([start, end]);
            return;
        }
        hanoi(n-1, start, end, temp);
        answer.push([start, end]);
        hanoi(n-1, temp, start, end);
    }
    
    hanoi(n, 1,2,3);
    
    return answer;
}