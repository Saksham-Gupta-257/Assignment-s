class Fibonacci:
    def __init__(self, n):
        self.n = n
        self.a, self.b = 0, 1
        self.count = 0

    def __iter__(self):
        return self

    def __next__(self):
        if self.count >= self.n:
            raise StopIteration
        self.count += 1
        self.a, self.b = self.b, self.a + self.b
        return self.a

for num in Fibonacci(7):
    print(num, end=' ')
