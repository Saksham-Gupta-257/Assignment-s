import math

print("\nSelect an operation:")
print("1. Square Root")
print("2. Factorial")
print("3. Power")
print("4. Exit")

while True:
    print("\nEnter your choice:")
    choice = int(input())
    if choice == 1:
        print("Enter a Number: ")
        num = float(input())
        if num < 0:
            print("Error: Cannot calculate square root of a negative number.")
        else:
            result = math.sqrt(num)
            print(f"The square root of {num} is {result}")
    elif choice == 2:
        print("Enter a Number: ")
        num = int(input())
        if num < 0:
            print("Error: Factorial is not defined for negative numbers.")
        else:
            result = math.factorial(num)
            print(f"The factorial of {num} is {result}")
    elif choice == 3:
        print("Enter the base number: ")
        base = float(input())
        print("Enter the exponent: ")
        exponent = float(input())
        result = math.pow(base, exponent)
        print(f"{base} raised to the power of {exponent} is {result}")
    elif choice == 4:
        break
    else:
        print("Invalid choice. Please select a valid option.")
