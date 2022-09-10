#include <iostream>
#include <queue>
#include <string>
#include <vector>

using namespace std;

int row, col;
int **arr;
int **visited;

bool is_valid(int next_row, int next_col) { return (next_row >= 0 && next_col >= 0 && next_row < row && next_col < col); }

pair<int, int> move(pair<int, int> cur, int dir) {
  // {row, col}
  // 북 동 남 서
  int pos[4][2] = {{-1, 0}, {0, 1}, {1, 0}, {0, -1}};
    
  return {cur.first + pos[dir][0], cur.second + pos[dir][1]};
}

void dfs(pair<int, int> cur, int dir, int &answer) {
  pair<int, int> next_pos = cur;
    
  for (int i = 0; i < 4; i++) {
    // 회전
    dir = (--dir + 4) % 4;
    // 청소하지 않았고 벽이 아닌 경우 방문
    next_pos = move(cur, dir);
    if (is_valid(next_pos.first, next_pos.second) && arr[next_pos.first][next_pos.second] == 0 && !visited[next_pos.first][next_pos.second]) {
      visited[next_pos.first][next_pos.second] = true;
      answer++;
      dfs(next_pos, dir, answer);

      return;
    }
  }

  // 뒤로 이동
  next_pos = move(cur, (dir + 2) % 4);
  // 벽이 아닌경우 방문
  if (is_valid(next_pos.first, next_pos.second) && arr[next_pos.first][next_pos.second] == 0) {
    dfs(next_pos, dir, answer);

    return;
  }

  return;
}

int main() {
  cin >> row >> col;
  arr = new int *[row];
  visited = new int *[row];
  for (int i = 0; i < row; i++) {
    arr[i] = new int[col];
  }

  for (int i = 0; i < row; i++) {
    visited[i] = new int[col];
  }
  int start_row, start_col, dir;
  cin >> start_row >> start_col >> dir;

  for (int i = 0; i < row; i++) {
    for (int j = 0; j < col; j++) {
      int input;
      cin >> input;
      arr[i][j] = input;
    }
  }

  visited[start_row][start_col] = true;
  int answer = 1;
  dfs({start_row, start_col}, dir, answer);
  cout << answer;
  return 0;
}