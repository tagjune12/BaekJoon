import sys
from bisect import bisect_left

N = int(sys.stdin.readline().rstrip())
seq = list(map(int,sys.stdin.readline().rstrip().split(' ')))

desc_seq = [-1*num for num in seq]
desc_dp2 = [desc_seq[0]]

for num in desc_seq:
  if num > desc_dp2[-1]:
    desc_dp2.append(num)
  else:
    target = bisect_left(desc_dp2,num)
    desc_dp2[target] = num
    
print(len(desc_dp2))