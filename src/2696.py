# https://ahntoday.tistory.com/176
from sys import stdin
import heapq # 기본 최소힙

def solution (data):
    small_heap = [] # 중앙값보다 작은애들(최대 힙)
    big_heap = [] # 중앙값보다 큰 애들(최소 힙)
    median = data[0]
    answer = [data[0]]

    for idx,number in enumerate(data[1:],1):
        if number > median:
            heapq.heappush(big_heap, number)
        else:
            heapq.heappush(small_heap, (-number, number))

        if idx%2 == 0:
            # 중앙 값을 넣어 양쪽 길이 맞춰주기
            if len(small_heap) > len(big_heap):
                heapq.heappush(big_heap, median)
                median = heapq.heappop(small_heap)[1]

            elif len(small_heap) < len(big_heap):
                heapq.heappush(small_heap, (-median, median))
                median = heapq.heappop(big_heap)

            answer.append(median)

    print(len(answer))
    for i in range(len(answer)):
        if i!=0 and (i+1)%10==1 :
            print()
        print(answer[i], end=' ')
    print()

t = int(stdin.readline().rstrip())
for i in range(t):
    m = int(stdin.readline().rstrip())
    data = []
    if m % 10 == 0:
        for _ in range(m//10):
            data.extend(list(map(int, stdin.readlin().rstrip().split(' '))))
    else:
        for _ in range(m//10+1):
            data.extend(list(map(int,stdin.readline().rstrip().split(' '))))

    solution(data)