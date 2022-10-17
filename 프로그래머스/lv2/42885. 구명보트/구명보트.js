function solution(people, limit) {
    let answer = 0;
    people.sort((a,b)=>{
        return b - a;
    });
    let i=0, j = people.length-1;
    while(i<=j){
        if((people[i] + people[j]) <= limit){
            i++;
            j--;
        } else{
            i++;
        }
        answer++;
    }
    
    return answer;
}