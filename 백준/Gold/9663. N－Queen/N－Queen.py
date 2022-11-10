N = int(input())
answer = 0
# visit[i] = K => (i,k)에 퀸이 있다는 뜻
visit = [0]*N

def checkIsValid(cur):
  for i in range(cur):   
    if visit[i]==visit[cur] or (cur - i) == abs(visit[cur]-visit[i]):
      return False
  
  return True

def dfs(cur):  
  if cur == N:
    global answer
    answer+=1
    return

  for col in range(N):
      visit[cur] = col
      if checkIsValid(cur):
        dfs(cur+1)


dfs(0)
print(answer)