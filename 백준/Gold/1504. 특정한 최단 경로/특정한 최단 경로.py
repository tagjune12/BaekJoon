import sys
import math
import heapq

N,E = list(map(int, sys.stdin.readline().rstrip().split(' ')))
INF = math.inf

graph = [[0]*(N+1) for _ in range(N+1)]

for _ in range(E):
  i, j, cost = list(map(int, sys.stdin.readline().rstrip().split(' ')))
  graph[i][j] = cost
  graph[j][i] = cost
  
def dijkstra(start):
  heap_ = []
  distance = [INF]*(N+1)
  distance[start] = 0
  heapq.heappush(heap_, (0,start))
  
  while heap_:
    dist, node = heapq.heappop(heap_)
    if distance[node] < dist:
      continue
    
    for i in range(1,N+1):
      if graph[node][i] == 0:
        continue
      next_cost = distance[node] + graph[node][i]
      if next_cost < distance[i]:
        distance[i] = next_cost
        heapq.heappush(heap_,(next_cost, i))
  
  return distance

stop1, stop2 = list(map(int, sys.stdin.readline().rstrip().split(' ')))

from_one = dijkstra(1)
from_stop1 = dijkstra(stop1)
from_stop2 = dijkstra(stop2)

answer = min(from_one[stop1] + from_stop1[stop2] + from_stop2[N], from_one[stop2] + from_stop2[stop1] + from_stop1[N])

print(answer if answer < INF else -1)