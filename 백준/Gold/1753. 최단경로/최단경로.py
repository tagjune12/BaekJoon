import sys
import heapq

V,E = list(map(int,sys.stdin.readline().rstrip().split(" ")))
K = int(sys.stdin.readline().rstrip())

graph = [{} for _ in range(V+1)]

for _ in range(E):
    u,v,w = list(map(int, sys.stdin.readline().rstrip().split(" ")))
    if v in graph[u]:
        graph[u][v] = min(graph[u][v],w)
    else:
        graph[u][v] = w


INF = float('inf')
distance = [INF]*(V+1)

def dijkstra():
    pq = [(0,K)]
    distance[K] = 0

    while pq:
        cost, stop_by = heapq.heappop(pq)
        if distance[stop_by] < cost:
            continue

        for node, weight in graph[stop_by].items():
            next_cost = cost + weight
            if next_cost < distance[node]:
                distance[node] = next_cost
                heapq.heappush(pq,(next_cost,node))

dijkstra()
for i in range(1, V+1):
    cost = distance[i]
    if cost == INF:
        print("INF")
    else:
        print(cost)