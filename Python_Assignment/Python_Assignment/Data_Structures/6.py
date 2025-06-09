class Stack:
    def __init__(self):
        self.items = []

    def push(self, val):
        self.items.append(val)

    def pop(self):
        if not self.items:
            return "Empty stack"
        return self.items.pop()

    def peek(self):
        if not self.items:
            return "Empty stack"
        return self.items[-1]

s = Stack()
s.push(10)
s.push(20)
print(s.peek())
print(s.pop())
print(s.pop())
