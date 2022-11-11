# 15686번 치킨 배달
# 14시 5분
import sys
from itertools import combinations


N,M = list(map(int, sys.stdin.readline().rstrip().split(' ')))

city =[]

for _ in range(N):
  row = list(map(int, sys.stdin.readline().rstrip().split(' ')))
  city.append(row)
  
chicken = []
houses = []

for i in range(N):
  for j in range(N):
    if city[i][j] == 2:
      chicken.append((i,j))
    
    elif city[i][j] == 1:
      houses.append((i,j))
      
dy = [0,0,1,-1]
dx = [1,-1,0,0]

answer = 1e9

for comb in combinations(chicken,M):
  shortest_dist = 0
  for house in houses:
    temp = 1e9 # 집과 치킨집과의 최소거리
    for pos in comb:
      temp = min(abs(house[0]-pos[0]) + abs(house[1]-pos[1]), temp)
    shortest_dist += temp

  answer = min(answer, shortest_dist)
    
print(answer)