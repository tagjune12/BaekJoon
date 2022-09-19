#include <iostream>
#include <string>
#include <vector>

#include <queue>
using namespace std;

int M, N, H;
int ***arr;
int ***visit;
int fresh = 0;
int answer = 0;

const int dir[6][3] = {
    {-1, 0, 0}, // 위
    {1, 0, 0},  // 아래
    {0, -1, 0}, // 뒤
    {0, 1, 0},  // 앞
    {0, 0, -1}, // 왼
    {0, 0, 1}   // 오
};

bool check(vector<int> pos) { return (pos[0] >= 0 && pos[0] < H && pos[1] >= 0 && pos[1] < N && pos[2] >= 0 && pos[2] < M); }

void bfs(queue<vector<int>> tomatoes) {

  while (!tomatoes.empty()) {
    vector<int> cur = tomatoes.front();
    tomatoes.pop();

    for (int i = 0; i < 6; i++) {
      if (check({cur[0] + dir[i][0], cur[1] + dir[i][1], cur[2] + dir[i][2]})          // 박스안에 있는가?
          && (visit[cur[0] + dir[i][0]][cur[1] + dir[i][1]][cur[2] + dir[i][2]] == -1) // 방문한적 있는가?
          && (arr[cur[0] + dir[i][0]][cur[1] + dir[i][1]][cur[2] + dir[i][2]] == 0)) { // 다음이 안익은 토마토인가?
        tomatoes.push({cur[0] + dir[i][0], cur[1] + dir[i][1], cur[2] + dir[i][2]});
        visit[cur[0] + dir[i][0]][cur[1] + dir[i][1]][cur[2] + dir[i][2]] = visit[cur[0]][cur[1]][cur[2]] + 1;
        answer = max(answer, visit[cur[0] + dir[i][0]][cur[1] + dir[i][1]][cur[2] + dir[i][2]]);
        fresh--;
      }
    }
  }
}

int main() {
  queue<vector<int>> tomatoes;

  cin >> M >> N >> H;
  arr = new int **[H];
  visit = new int **[H];

  for (int i = 0; i < H; i++) {
    arr[i] = new int *[N];
    visit[i] = new int *[N];

    for (int j = 0; j < N; j++) {
      arr[i][j] = new int[M];
      visit[i][j] = new int[M];

      for (int k = 0; k < M; k++) {
        int tomato;

        cin >> tomato;
        arr[i][j][k] = tomato;
        visit[i][j][k] = -1;
        if (tomato == 1) {
          tomatoes.push({i, j, k});
          visit[i][j][k] = 0;
        }
        if (tomato == 0) {
          fresh++;
        }
      }
    }
  }

  if (tomatoes.size() == 0) {
    cout << -1;
    return 0;
  }

  bfs(tomatoes);

  cout << ((fresh > 0) ? -1 : answer);
  return 0;
}