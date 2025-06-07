from collections import deque

class Queue:
    def __init__(self):
        self.q = deque()

    def enqueue(self, val):
        self.q.append(val)

    def dequeue(self):
        if not self.q:
            return "Empty queue"
        return self.q.popleft()

q = Queue()
q.enqueue(1)
q.enqueue(2)
print(q.dequeue())
print(q.dequeue())
