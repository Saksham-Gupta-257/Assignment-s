def fibonacci(n, memo={}):
    if n in memo:
        return memo[n]
    if n <= 1:
        return n
    memo[n] = fibonacci(n - 1, memo) + fibonacci(n - 2, memo)
    return memo[n]

n = -1
while True:
    num = input("Enter a positive integer: ") 
    if num.isdigit() and int(num) >= 0: 
        n = int(num)
        break
    print("Please enter a valid positive integer.")

print(f"F({n}) = {fibonacci(n)}")