class Student:
    def __init__(self, name, grades):
        self.name = name
        self.grades = grades

    def average(self):
        return sum(self.grades) / len(self.grades)

s = Student("Saksham", [90, 80, 85, 95, 100])
print("Name:", s.name)
print("Average:", s.average())
