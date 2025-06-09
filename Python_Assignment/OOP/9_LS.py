class Book:
    def __init__(self, title):
        self.title = title

class Member:
    def __init__(self, name):
        self.name = name
        self.books = []

    def borrow(self, book):
        self.books.append(book)

book1 = Book("Fourty Rules of Love")
book2 = Book("The Alchemist")
member = Member("Saksham")
member.borrow(book1)
print("Books borrowed by", member.name + ":", [b.title for b in member.books])