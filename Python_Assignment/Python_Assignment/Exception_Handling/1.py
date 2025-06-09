try:
    a = float(input("Enter numerator: "))
    b = float(input("Enter denominator: "))
    print("Result:", a / b)
except ZeroDivisionError:
    print("Cannot divide by zero.")
except ValueError:
    print("Invalid input.")
