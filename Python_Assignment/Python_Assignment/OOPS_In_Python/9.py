class Book:
    def __init__(self, title):
        self.title = title
        self.available = True

class Member:
    def __init__(self, name):
        self.name = name
        self.borrowed = []

    def borrow(self, book):
        if book.available:
            book.available = False
            self.borrowed.append(book.title)
            return True
        return False

b1 = Book("1984")
m1 = Member("Alice")
print(m1.borrow(b1))
