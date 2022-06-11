#include <iostream>
#include <bits/stdc++.h>

using namespace std;

int main()
{
    const int MAX = INT_MAX;
    const int SIZE = 100000;
    int v, e;
    int answer = 0;
    // destination과 cost를 pair로 갖는 vector
    vector<vector<pair<int, int>>> graph;
    // cost, destination 순으로 pair를 만들어 넣을거임, 오름차순 정렬
    priority_queue<pair<int, int>, vector<pair<int, int>>, greater<pair<int, int>>> pq;

    cin >> v >> e;
    bool visited[SIZE + 1];
    //int* route = new int[v + 1];
    for (int i = 0; i < v + 1; i++) {
        visited[i] = false;
    }

    graph.resize(v + 1);

    // 그래프 형성
    for (int i = 0; i < e; i++) {
        int start, destination, cost;
        cin >> start >> destination >> cost;
        graph[start].push_back({ destination, cost });
        graph[destination].push_back({ start, cost });
    }

    // 첫번째 정점에 있는 인접노드를 모두 우선순위 큐에 넣는다
    for (int i = 0; i <graph[1].size(); i++) {
        pq.push({ graph[1][i].second, graph[1][i].first });
    }
    visited[1] = true;

    while (!pq.empty()) {
        int nextNode = pq.top().second;
        int cost = pq.top().first;
        pq.pop();
        // 다음 노드를 방문한적 없는 경우
        if (!visited[nextNode]) {
            // 가중치를 더한다
            answer += cost;
            // 다음 노드와 인접한 모든 노드를 우선순위 큐에 넣는다
            for (int i = 0; i < graph[nextNode].size(); i++) {
                pq.push({ graph[nextNode][i].second,  graph[nextNode][i].first });
            }
            // 다음 노드를 방문처리한다
            visited[nextNode] = true;
        }
    }

    cout << answer;

    return 0;
}