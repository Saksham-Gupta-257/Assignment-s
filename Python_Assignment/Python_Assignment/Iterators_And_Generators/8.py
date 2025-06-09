def infinite_fib():
    a, b = 0, 1
    while True:
        yield a
        a, b = b, a + b

gen = infinite_fib()
for _ in range(10):
    print(next(gen))
    