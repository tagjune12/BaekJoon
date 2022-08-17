#include <bits/stdc++.h>

using namespace std;

int arr[500][500];
int visited[500][500];
int M, N;
const int dx[4] = {1, 0, -1, 0};
const int dy[4] = {0, 1, 0, -1};

bool rangeCheck(int row, int col)
{
  return (row >= 0 && col >= 0 && row < M && col < N);
};

int dfs(int row, int col)
{
  if (row == M - 1 && col == N - 1)
    return 1;

  if (visited[row][col] == -1)
  {
    visited[row][col] = 0;
    for (int i = 0; i < 4; i++)
    {
      int nextRow = row + dy[i];
      int nextCol = col + dx[i];

      if (rangeCheck(nextRow, nextCol) && (arr[nextRow][nextCol] < arr[row][col]))
      {
        visited[row][col] += dfs(nextRow, nextCol);
      }
    }
  }
  return visited[row][col];
}

int main()
{
  cin >> M >> N;
  for (int i = 0; i < M; i++)
  {
    for (int j = 0; j < N; j++)
    {
      cin >> arr[i][j];
      visited[i][j] = -1;
    }
  }

  dfs(0, 0);
  cout << visited[0][0];

  return 0;
}