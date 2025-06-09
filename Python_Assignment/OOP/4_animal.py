class Animal:
    def message(self):
        return "Animal class"

class Dog(Animal):
    def message(self):
        return "Dog Class"

class Cat(Animal):
    def message(self):
        return "Cat Class"

print(Dog().message(),Cat().message(),Animal().message())