try:
    a = input("Enter numerator: ")
    b = input("Enter denominator: ")
    try:
        a, b = int(a), int(b)
        print(a / b)
    except ZeroDivisionError:
        print("Cannot divide by zero.")
except ValueError:
    print("Invalid number input.")
