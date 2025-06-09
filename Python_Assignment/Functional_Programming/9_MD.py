def memoize(func):
    cache = {}
    def wrapper(x):
        if x not in cache:
            cache[x] = func(x)
        return cache[x]
    return wrapper

@memoize
def fib(n):
    if n <= 1:
        return n
    return fib(n-1) + fib(n-2)

print(fib(10))
