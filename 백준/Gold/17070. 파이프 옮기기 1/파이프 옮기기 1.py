# 파이프 옮기기 1
import sys

N = int(sys.stdin.readline().rstrip())

arr = []
for i in range(N):
    row = list(map(int,sys.stdin.readline().rstrip().split(' ')))
    arr.append(row)

# print("arr",arr)

def check_range(pos):
    # print(pos)
    return 0 <= pos[0] < N and 0 <= pos[1] < N

def garo(start, end, stack):
    # 가로 이동
    next_start = end
    next_end = (end[0], end[1]+1)

    if check_range(next_end) and arr[next_end[0]][next_end[1]] == 0:
        stack.append([next_start, next_end,0])

    # 대각 이동
    next_start = end
    next_end = (end[0]+1, end[1]+1)

    if (check_range(next_end) and arr[next_end[0]][next_end[1]] == 0
            and arr[next_end[0]][next_end[1]-1] == 0 and arr[next_end[0]-1][next_end[1]] == 0):
        stack.append([next_start, next_end, 2])

    return

def sero(start, end, stack):
    # 세로 이동
    next_start = end
    next_end = (end[0] + 1, end[1])

    if check_range(next_end) and arr[next_end[0]][next_end[1]] == 0:
        stack.append([next_start, next_end, 1])

    # 대각 이동
    next_start = end
    next_end = (end[0] + 1, end[1] + 1)

    if (check_range(next_end) and arr[next_end[0]][next_end[1]] == 0
            and arr[next_end[0]][next_end[1] - 1] == 0 and arr[next_end[0] - 1][next_end[1]] == 0):
        stack.append([next_start, next_end, 2])

    return

def cross(start, end, stack):
    # 가로 이동
    next_start = end
    next_end = (end[0], end[1]+1)

    if check_range(next_end) and arr[next_end[0]][next_end[1]] == 0:
        stack.append([next_start, next_end,0])

    # 세로 이동
    next_start = end
    next_end = (end[0] + 1, end[1])

    if check_range(next_end) and arr[next_end[0]][next_end[1]] == 0:
        stack.append([next_start, next_end, 1])

    # 대각 이동
    next_start = end
    next_end = (end[0] + 1, end[1] + 1)

    if (check_range(next_end) and arr[next_end[0]][next_end[1]] == 0
            and arr[next_end[0]][next_end[1] - 1] == 0 and arr[next_end[0] - 1][next_end[1]] == 0):
        stack.append([next_start, next_end, 2])

    return

move = {
    0: garo,
    1: sero,
    2: cross
}


answer = 0

def dfs():
    # row, col, dir(0,1,2 => 가로 세로 대각)
    stack = [[(0,0),(0,1),0]]

    while stack:
        start, end, direction = stack.pop()

        if end[0] == N - 1 and end[1] == N - 1:
            global answer
            answer += 1

        move[direction](start, end, stack)


dfs()
print(answer)