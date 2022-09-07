#include <bits/stdc++.h>
#include <iostream>

using namespace std;

struct compare {
  bool operator()(int a, int b) {
    if (abs(a) == abs(b)) {
      return a > b;
    } else {
      return abs(a) > abs(b);
    }
  }
};

int main() {
  priority_queue<int, vector<int>, compare> pq;
  int count;

  cin >> count;
  string answer = "";
  for (int i = 0; i < count; i++) {
    int input;
    cin >> input;
    if (input == 0) {
      if (pq.size() == 0) {
        answer = answer + to_string(0) + '\n';
      } else {
        answer = answer + to_string(pq.top()) + '\n';
        pq.pop();
      }
    } else {
      pq.push(input);
    }
  }
    
  cout << answer;
  return 0;
}