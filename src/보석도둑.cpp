#include <iostream>
#include <bits/stdc++.h>

using namespace std;

vector<pair<int, int>> jewels;
vector<int> bags;
// MAX HEAP
priority_queue<int> pq;

int main()
{
  int N, K;
  long long answer = 0;
  cin >> N >> K;

  for (int i = 0; i < N; i++)
  {

    int weight, value;
    cin >> weight >> value;
    jewels.push_back({weight, value});
  }

  for (int i = 0; i < K; i++)
  {
    int weight;
    cin >> weight;
    bags.push_back(weight);
  }

  // 가장 가벼운 보석을 맨 처음으로
  sort(jewels.begin(), jewels.end());
  // 무게가 가장 적은 가방을 맨 처음으로
  sort(bags.begin(), bags.end());

  int index = 0;
  for (int i = 0, size = bags.size(); i < size; i++)
  {
    while (index < N && bags[i] >= jewels[index].first)
    {
      pq.push(jewels[index++].second);
    }
    if (!pq.empty())
    {
      answer += pq.top();
      pq.pop();
    }
  }

  cout << answer;
  return 0;
}