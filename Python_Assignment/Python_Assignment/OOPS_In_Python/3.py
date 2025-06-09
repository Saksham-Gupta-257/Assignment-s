class Student:
    def __init__(self, name, grades):
        self.name = name
        self.grades = grades

    def average(self):
        return sum(self.grades) / len(self.grades) if self.grades else 0

s = Student("John", [80, 90, 70])
print(s.average())
