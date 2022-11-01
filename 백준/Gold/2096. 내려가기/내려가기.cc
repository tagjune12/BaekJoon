#include <iostream>
// #include <string>
// #include <vector>
#include <bits/stdc++.h>

using namespace std;

int main() {
  int n;

  cin >> n;
  int arr[100000][3];

  for (int i = 0; i < n; i++) {
    int tempA, tempB, tempC;
    cin >> tempA >> tempB >> tempC;
    arr[i][0] = tempA;
    arr[i][1] = tempB;
    arr[i][2] = tempC;
  }

  int maxDp[3];
  int minDp[3];

  maxDp[0] = arr[0][0];
  maxDp[1] = arr[0][1];
  maxDp[2] = arr[0][2];

  minDp[0] = arr[0][0];
  minDp[1] = arr[0][1];
  minDp[2] = arr[0][2];

  for (int i = 1; i < n; i++) {
    int tmpMax[3];
    tmpMax[0] = maxDp[0];
    tmpMax[1] = maxDp[1];
    tmpMax[2] = maxDp[2];
    //최대 점수
    maxDp[0] = max(tmpMax[0], tmpMax[1]) + arr[i][0];
    maxDp[1] = max(max(tmpMax[0], tmpMax[1]), maxDp[2]) + arr[i][1];
    maxDp[2] = max(tmpMax[1], tmpMax[2]) + arr[i][2];

    //최소 점수
    int tmpMin[3];
    tmpMin[0] = minDp[0];
    tmpMin[1] = minDp[1];
    tmpMin[2] = minDp[2];
    //최대 점수
    minDp[0] = min(tmpMin[0], tmpMin[1]) + arr[i][0];
    minDp[1] = min(min(tmpMin[0], tmpMin[1]), tmpMin[2]) + arr[i][1];
    minDp[2] = min(tmpMin[1], tmpMin[2]) + arr[i][2];
  }

  int maxScore = max(max(maxDp[0], maxDp[1]), maxDp[2]);
  int minScore = min(min(minDp[0], minDp[1]), minDp[2]);

  cout << maxScore << ' ' << minScore;
  return 0;
}
