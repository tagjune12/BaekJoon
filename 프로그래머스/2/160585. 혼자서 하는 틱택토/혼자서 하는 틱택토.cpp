#include <string>
#include <vector>
#include <iostream>

using namespace std;

// O:선공 X: 후공

bool checkWin(vector<string> board, char target){
    bool result = false;
    // 가로 진행
    for(int i=0; i<3; i++){
        if(board[i][0] != target) continue;
        
        for(int j=0; j<3;j++){
            if(board[i][j] != target) {
                result = false;
                break;   
            }
            else result = true;
        }
         if(result) return true;
    }
    
   
    
    // 세로 
    for(int i=0; i<3; i++){
        if(board[0][i] != target) continue;
        
        for(int j=0; j<3;j++){
            if(board[j][i] != target) {
                result = false;
                break;   
            }
            else result = true;
        }
        if(result) return true;
    }
    

    
    // 대각
    if((board[0][0] == target && board[0][0] == board[1][1] && board[1][1] == board[2][2])
        || (board[0][2] == target && board[0][2] == board[1][1] && board[1][1] == board[2][0])
      ) return true;
    
    
    return false;
}

int solution(vector<string> board) {
    // int answer = -1;
    int countO = 0;
    int countX = 0;
    
    for(int i=0; i<3;i++){
        for(int j=0; j<3; j++){
            if(board[i][j] == 'O') countO++;
            else if(board[i][j] == 'X') countX++;
        }
    }
    cout << checkWin(board,'O') << ' ' << checkWin(board,'X') <<endl;
    // if(countO == 0 && countX == 0) return 0;
    // 개수가 안맞는 경우(O를 두번연속으로 놓거나 X를 더 많이 놓은 경우)
    if((countO < countX) || (countO > countX + 1)) return 0;
    
    bool winO = checkWin(board,'O');
    bool winX = checkWin(board,'X');
    // O가 이겻는데 O와 X개수가 같은경우(X를 두번 둔경우)
    if(winO && countO == countX) return 0;
    // X가 이겻는데 O와 X개수가 다른경우(X가 이기려면 O,X개수가 같아야함)
    if(winX && countO != countX) return 0;

    
    
    return 1;
}