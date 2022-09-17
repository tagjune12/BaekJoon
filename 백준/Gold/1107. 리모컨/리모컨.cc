

#include <bits/stdc++.h>
#include <iostream>

#define MAX 500000

using namespace std;
bool arr[10];

int check(int target, bool *arr) {
  int length = 0;
  if (target == 0) {
    if (arr[0])
      return 0;
    else
      return 1;
  }

  while (target) {
    if (arr[target % 10]) { // 만들 수 없는 경우
      return 0;
    } else {
      length++;
      target /= 10;
    }
  }
  return length;
}


int main() {
  int n, m;
  cin >> n;
  cin >> m;

  for (int i = 0; i < m; i++) {
    int button;
    cin >> button;
    arr[button] = true; // 고장 처리
  }

  int answer = abs(n - 100);
  // 숫자버튼으로 만드는 경우
  for (int i = 0; i <= MAX * 2; i++) {
    int length = check(i, arr);
    if (length > 0) {

      int press = abs(n - i);
      answer = (press + length) < answer ? (press + length) : answer;
    }
  }
  cout << answer;
}