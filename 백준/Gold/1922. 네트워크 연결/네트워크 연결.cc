#include <algorithm>
#include <iostream>
#include <string>
#include <vector>

using namespace std;

struct Edge {
  int from;
  int to;
  int cost;
};

bool compare(Edge A, Edge B) { return A.cost < B.cost; };

int find_parent(int *parent, int node) {
  if (node == parent[node])
    return node;

  parent[node] = find_parent(parent, parent[node]);

  return parent[node];
};

void merge(int *parent, int nodeA, int nodeB) {
  int parentA = find_parent(parent, nodeA);
  int parentB = find_parent(parent, nodeB);
  if (parentA < parentB) {
    parent[parentB] = parentA;
  } else
    parent[parentA] = parentB;
}

int main() {

  int N, M;
  int answer = 0;
  cin >> N;
  cin >> M;
  vector<Edge> connections(N);
  int *parent = new int[N + 1];

  for (int i = 1; i < N + 1; i++) {
    parent[i] = i;
  }

  for (int i = 0; i < M; i++) {
    int from, to, cost;
    cin >> from >> to >> cost;
    Edge edge = {from, to, cost};
    connections.push_back(edge);
  }

  sort(connections.begin(), connections.end(), compare);

  for (int i = 0; i < connections.size(); i++) {
    Edge edge = connections[i];
    if (find_parent(parent, edge.from) != find_parent(parent, edge.to)) {
      answer += edge.cost;
      merge(parent, edge.from, edge.to);
    }
  }
  cout << answer;

  return 0;
}