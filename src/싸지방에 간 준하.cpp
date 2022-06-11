#include <iostream>
#include <bits/stdc++.h>

using namespace std;

int userCount[100001];

int main() {
	int n;
	cin >> n;
	// 끝나는 시간을 오름차순으로 정렬하는 우선순위 큐
	priority_queue<pair<int, int>, vector<pair<int, int>>, greater<pair<int, int>>> pq;
	// 시작시간, 끝나는 시간을 pair로 갖는 vector
	vector<pair<int, int>> schedule;
	// 공석 인덱스
	// queue<int> vacancy;
	priority_queue<int, vector<int>, greater<int>> vacancy;
	// 최대 자리수
	int X = 0;
	for (int i = 0; i < n; i++) {
		// 시작시간 끝나는 시간
		int p, q;
		cin >> p >> q;
		schedule.push_back({ p,q });
	}
	// 스케쥴을 시작시간 오름차순으로 정렬
	sort(schedule.begin(), schedule.end(), less<pair<int, int>>());
	for (int i = 0; i < n; i++) {
		int start = schedule[i].first;
		int end = schedule[i].second;

		while (!pq.empty()) {
			// 가장 빨리 끝나는 시간이 다음 첫 시작시간보다 빠른 시간인경우
			if (pq.top().first <= start) {
				// 빠지는 좌석들의 번호를 공석 큐에 넣는다
				vacancy.push(pq.top().second);
				pq.pop();
			}
			else break;
		}

		// 빈 좌석이 없는경우 
		if (vacancy.empty()) {
			// 좌석을 추가
			pq.push({ end, X + 1 });
			userCount[X + 1]++;
		}
		else { // 빈 좌석이 있는 경우
			pq.push({ end, vacancy.top() });
			userCount[vacancy.top()]++;
			vacancy.pop();
		}
		X = max(X, (int)(pq.size()));
	}

	cout << X << endl;
	for (int i = 1; i <= X; i++) {
		cout << userCount[i] << " ";
	}
	return 0;
}