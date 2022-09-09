// #include <bits/stdc++.h>

#include <iostream>
#include <map>
#include <set>
#include <string>
#include <vector>

using namespace std;

int main() {
  int length;
  string answer = "";
  set<int> _set;
  map<int, int> _map;
  vector<int> numbers;

  cin >> length;

  for (int i = 0; i < length; i++) {
    int input;
    cin >> input;
    _set.insert(input);
    numbers.push_back(input);
  }

  int index = 0;
  for (auto it = _set.begin(); it != _set.end(); it++) {
    int number = *it;
    _map[number] = index++;
  }

  for (int i = 0; i < numbers.size(); i++) {
    int key = numbers[i];
    answer += to_string(_map[key]) + ' ';
  }

  cout << answer;
}