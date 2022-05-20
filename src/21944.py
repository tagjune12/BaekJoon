import sys
import heapq

from collections import defaultdict

input = sys.stdin.readline


class Algorithm():
    def __init__(self, num):
        self.num = num
        self.min_heap = []
        self.max_heap = []

    def insert(self, pb_num, diff):
        heapq.heappush(self.min_heap, (diff, pb_num))
        heapq.heappush(self.max_heap, (-diff, -pb_num))

    def find_heap(self, flag):
        result = []
        if flag > 0:
            if self.max_heap:
                while (-self.max_heap[0][1] not in number_set) or number_algo[-self.max_heap[0][1]][0] != self.num or \
                        number_algo[-self.max_heap[0][1]][1] != -self.max_heap[0][0]:
                    heapq.heappop(self.max_heap)
                    if not self.max_heap:
                        break
            if self.max_heap:
                result = [-self.max_heap[0][0], -self.max_heap[0][1]]
        else:
            if self.min_heap:
                while (self.min_heap[0][1] not in number_set) or number_algo[self.min_heap[0][1]][0] != self.num or \
                        number_algo[self.min_heap[0][1]][1] != self.min_heap[0][0]:
                    heapq.heappop(self.min_heap)
                    if not self.min_heap:
                        break
            if self.min_heap:
                result = self.min_heap[0]
        return result


class Difficulty():
    def __init__(self, num):
        self.num = num
        self.min_heap = []
        self.max_heap = []

    def insert(self, pb_num):
        heapq.heappush(self.min_heap, pb_num)
        heapq.heappush(self.max_heap, -pb_num)

    def find_heap(self, x):
        result = []
        if x > 0:
            if self.min_heap:
                while self.min_heap[0] not in number_set or (number_algo[self.min_heap[0]][1]) != self.num:
                    heapq.heappop(self.min_heap)
                    if not self.min_heap:
                        break
            if self.min_heap:
                result = self.min_heap[0]

        else:
            if self.max_heap:
                while -self.max_heap[0] not in number_set or (number_algo[-self.max_heap[0]][1]) != self.num:
                    heapq.heappop(self.max_heap)
                    if not self.max_heap:
                        break
            if self.max_heap:
                result = -self.max_heap[0]
        return result


N = int(input())
algo_set = set()
diff_set = set()
algo_dict = {}
diff_dict = {}
number_algo = {}
number_set = set()
for _ in range(N):
    number, dif, algo = map(int, input().split())
    if algo not in algo_set:
        algo_dict[algo] = Algorithm(algo)
        algo_set.add(algo)
    if dif not in diff_set:
        diff_dict[dif] = Difficulty(dif)
        diff_set.add(dif)
    algo_dict[algo].insert(number, dif)
    diff_dict[dif].insert(number)
    number_algo[number] = [algo, dif]
    number_set.add(number)

M = int(input())

for i in range(M):
    command, *arg = input().split()
    if command == 'recommend':
        G, x = map(int, arg)
        print(algo_dict[G].find_heap(x)[1])
    elif command == 'recommend2':
        x = int(arg[0])
        diff_check = 0 if x == 1 else float('inf')
        pb_num_check = -1
        for algo_num in algo_dict:
            ch = algo_dict[algo_num].find_heap(x)
            if not ch: continue
            if x == 1:
                if ch[0] > diff_check:
                    diff_check = ch[0]
                    pb_num_check = ch[1]
                elif ch[0] == diff_check:
                    if pb_num_check < ch[1]:
                        pb_num_check = ch[1]
            else:
                if ch[0] < diff_check:
                    diff_check = ch[0]
                    pb_num_check = ch[1]
                elif ch[0] == diff_check:
                    if pb_num_check > ch[1]:
                        pb_num_check = ch[1]
        print(pb_num_check)
    elif command == 'recommend3':
        flag, L_num = map(int, arg)
        result = -1
        if flag == -1:
            L_num = L_num + flag
        while 0 <= L_num <= 100:
            if L_num in diff_set:
                ch = diff_dict[L_num].find_heap(flag)
                if not ch:
                    L_num = L_num + flag
                    continue
                result = ch
                print(ch)
                break
            L_num = L_num + flag
        if result == -1:
            print(-1)

    elif command == 'solved':
        pb_num = int(arg[0])
        number_set.remove(pb_num)
        del number_algo[pb_num]
    else:
        pb_num, diff_num, algo_num = map(int, arg)
        if algo_num not in algo_set:
            algo_dict[algo_num] = Algorithm(algo_num)
            algo_set.add(algo_num)
        if diff_num not in diff_set:
            diff_dict[diff_num] = Difficulty(diff_num)
            diff_set.add(diff_num)
        algo_dict[algo_num].insert(pb_num, diff_num)
        diff_dict[diff_num].insert(pb_num)
        number_algo[pb_num] = [algo_num, diff_num]
        number_set.add(pb_num)