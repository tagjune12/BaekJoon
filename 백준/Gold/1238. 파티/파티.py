# 17:35 
import sys
import heapq

N,M,X = list(map(int,sys.stdin.readline().rstrip().split(' ')))
INF = float('inf')
village = [[]*(N+1) for _ in range(N+1)]

for _ in range(M):
  v1, v2, cost = list(map(int,sys.stdin.readline().rstrip().split(' ')))
  village[v1].append((v2,cost))
  
# print(village)

def dijkstra(start):
  heapq_ = []
  distance = [INF]*(N+1)
  heapq.heappush(heapq_,(0,start))
  distance[start] = 0
  
  while heapq_:
    cost, cur = heapq.heappop(heapq_)
    
    if cost > distance[cur]:
      continue
    
    for node,c in village[cur]:
      # print("check",node,c)
      # print("check2",distance[cur] + c , distance[node])
      if distance[cur] + c < distance[node]:
        distance[node] = distance[cur] + c
        heapq.heappush(heapq_,(distance[node], node))
        
  return distance

answer = 0

for start in range(1,N+1):
  distance = dijkstra(start)[X] + dijkstra(X)[start]
  answer = max(answer, distance)

print(answer)
