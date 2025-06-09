from functools import reduce

def factorial(n):
    if n < 0:
        raise ValueError("Negative input not allowed")
    return reduce(lambda x, y: x * y, range(1, n + 1), 1)

print(factorial(5))
