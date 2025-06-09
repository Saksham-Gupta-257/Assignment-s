class Counter:
    count = 0

    def __init__(self):
        Counter.count += 1

a = Counter()
b = Counter()
print("Instances created:", Counter.count)
