#include <iostream>
#include <bits/stdc++.h>

using namespace std;

int main() {
  string input = " ";
  cin >> input;
  int start = 0;

  vector<string> chunks;
  for (int i = 0; i < input.length(); i++) {
    if (input[i] == '-') {
      chunks.push_back(input.substr(start, (i - start)));
      i++;
      start = i;
    }
  }
  chunks.push_back(input.substr(start, (input.length() - start)));

  vector<int> numbers;

  for (string chunk : chunks) {
    int sum = 0;
    int start_idx = 0;
    for (int i = 0; i < chunk.length(); i++) {
      if (chunk[i] == '+') {
        sum += stoi(chunk.substr(start_idx, i - start_idx));
        start_idx = i + 1;
      }
    }
    sum += stoi(chunk.substr(start_idx, chunk.length() - start_idx));
    numbers.push_back(sum);
  }

  int answer = numbers[0];
  for (int i = 1; i < numbers.size(); i++) {
    answer -= numbers[i];
  }

  cout << answer << endl;
  return 0;
}