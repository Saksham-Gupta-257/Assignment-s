class StringIterator:
    def __init__(self, s):
        self.s = s
        self.index = 0

    def __iter__(self):
        return self

    def __next__(self):
        if self.index >= len(self.s):
            raise StopIteration
        char = self.s[self.index]
        self.index += 1
        return char

for c in StringIterator("hello"):
    print(c)
