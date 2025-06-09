fib_cache = {}

def memoized_fibonacci(n):
    if n in fib_cache:
        return fib_cache[n]
    if n <= 1:
        fib_cache[n] = n
    else:
        fib_cache[n] = memoized_fibonacci(n - 1) + memoized_fibonacci(n - 2)
    return fib_cache[n]

print("Enter which Fibonacci number you want:")
n = int(input())
result = memoized_fibonacci(n)
print(f"The {n}th Fibonacci number is {result}")
