import heapq
import sys

n = int(sys.stdin.readline().rstrip())
m = int(sys.stdin.readline().rstrip())
arr = [[] for _ in range(n+1)]

for _ in range(m):
    [start, end, cost] = map(int,sys.stdin.readline().rstrip().split(' '))
    arr[start].append((end,cost))

start, destination = map(int,sys.stdin.readline().rstrip().split(' '))

INF = float("inf")
distance = [INF] * (n+1)
route = [0]*(n+1)

def dijkstra(start):
    pq = []
    heapq.heappush(pq,(0,start))
    distance[start] = 0

    while pq:
        dist, cur = heapq.heappop(pq)

        if distance[cur] < dist:
            continue
        else:
            for next, c in arr[cur]:
                cost = dist + c
                if cost < distance[next]:
                    distance[next] = cost
                    heapq.heappush(pq,(cost,next))
                    route[next] = cur


dijkstra(start)
temp = str(destination)
curNode = destination
count = 1

while route[curNode] != 0:
    temp = str(route[curNode]) + " " +temp
    curNode = route[curNode]
    count = count + 1

print(distance[destination])
print(count)
print(temp)

# print(temp)
