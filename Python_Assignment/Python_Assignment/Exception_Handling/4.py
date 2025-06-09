class InvalidAgeError(Exception):
    pass

def check_age(age):
    if age < 0 or age > 120:
        raise InvalidAgeError("Age must be between 0 and 120.")
    return "Valid age"

try:
    age = int(input("Enter your age: "))
    print(check_age(age))
except (ValueError, InvalidAgeError) as e:
    print(e)
