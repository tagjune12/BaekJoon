function solution(n) {
    let answer = 0;
    
    while(n > 0){
        if(n%2){ // 홀수인경우
            answer++;
            n = (n-1) / 2;
        } else{ // 짝수인 경우
            n = n / 2;
        }
    }
    return answer;
}