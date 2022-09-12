#include <iostream>
#include <string>
#include <vector>

#include <queue>

using namespace std;

int main() {
  int N, M;
  int count = 0;

  cin >> N;
  cin >> M;
  vector<vector<int>> connections(N + 1);

  for (int i = 0; i < M; i++) {
    int from, to;
    cin >> from >> to;
    connections[from].push_back(to);
    connections[to].push_back(from);
  }

  queue<int> q;
  int *visited = new int[N + 1];

  q.push(1);
  visited[1] = 1;

  while (!q.empty()) {
    int next_node = q.front();
    q.pop();

    for (int i = 0; i < connections[next_node].size(); i++) {
      if (!visited[connections[next_node][i]]) {
        q.push(connections[next_node][i]);
        visited[connections[next_node][i]] = 1;
        count++;
      }
    }
  }

  cout << count;
  return 0;
}