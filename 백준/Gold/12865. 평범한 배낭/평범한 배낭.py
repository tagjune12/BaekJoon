import sys

N,K = list(map(int,sys.stdin.readline().rstrip().split(" ")))

items = []

for _ in range(N):
    W,V = list(map(int, sys.stdin.readline().rstrip().split(" ")))
    items.append((W,V))

items.sort(key= lambda x: x[0])

dp = [[0]*(K+1) for _ in range(N+1)]

for i in range(1,N+1): # i = 아이템 개수
    for w in range(1,K+1): # 가방 무게
        if items[i-1][0] <= w:
            dp[i][w] = max(dp[i-1][w - items[i-1][0]] + items[i-1][1], dp[i-1][w])
        else:
            dp[i][w] = dp[i-1][w]
print(dp[N][K])