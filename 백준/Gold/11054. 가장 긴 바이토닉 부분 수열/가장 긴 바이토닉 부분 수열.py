import sys
from bisect import bisect_left

N = int(sys.stdin.readline().rstrip())
seq = list(map(int,sys.stdin.readline().rstrip().split(' ')))

asc_dp = [1] * N
for i in range(1,N):
  for j in range(i):
    if seq[j] < seq[i]:
      asc_dp[i] = max(asc_dp[i], asc_dp[j]+1)

reverse_seq = seq[::-1]
desc_dp = [1]*N
for i in range(1,N):
  for j in range(i):
    if reverse_seq[j] < reverse_seq[i]:
      desc_dp[i] = max(desc_dp[i], desc_dp[j]+1)

desc_dp.reverse()

answer = 0

for i in range(N):
  answer = max(answer, asc_dp[i] + desc_dp[i]-1)

print(answer)