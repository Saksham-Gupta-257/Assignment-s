class Counter:
    count = 0

    def __init__(self):
        Counter.count += 1

print(Counter.count)
a = Counter()
b = Counter()
print(Counter.count)
