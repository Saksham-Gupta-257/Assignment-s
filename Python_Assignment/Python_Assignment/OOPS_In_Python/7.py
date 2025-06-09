class Vehicle:
    def move(self):
        return "Moving"

class Car(Vehicle):
    def move(self):
        return "Car driving"

v = Vehicle()
c = Car()
print(v.move(), c.move())
