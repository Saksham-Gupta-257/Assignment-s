def get_int(prompt):
    while True:
        val = input(prompt)
        if val.lstrip('-').isdigit():
            return int(val)
        print("Invalid input. Please enter an integer.")

a = get_int("Enter value of a: ")
b = get_int("Enter value of b: ")

a, b = b, a
print(f"After swapping: a = {a}, b = {b}")
