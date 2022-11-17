import sys

n = int(sys.stdin.readline().rstrip())
m = int(sys.stdin.readline().rstrip())

INF = float('inf')
distance = [[INF]*(n+1) for _ in range(n+1)]

for _ in range(m):
    i,j,cost = list(map(int,sys.stdin.readline().rstrip().split(" ")))
    distance[i][j] = min(cost, distance[i][j])

# 플로이드 와샬
for stop in range(1,n+1):
    for start in range(1, n + 1):
        for end in range(1, n + 1):
            if start == end:
                distance[start][end] = 0
                continue

            distance[start][end] = min(distance[start][stop] + distance[stop][end], distance[start][end])

answer = ""
for i in range(1,n+1):
    for j in range(1, n + 1):
        answer += (str(distance[i][j] if distance[i][j]!= INF else 0)+" ")
    answer.rstrip()
    answer += '\n'

print(answer.rstrip())