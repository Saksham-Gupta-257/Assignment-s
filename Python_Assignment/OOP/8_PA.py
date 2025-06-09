class Person:
    def __init__(self, name):
        self.__name = name 

    def get_name(self):
        return self.__name

    def set_name(self, name):
        self.__name = name

p = Person("Saksham")
p.set_name("Om")
print("Name:", p.get_name())
