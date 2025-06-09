print("-- Calculator --")
print("Select an operation:")
print("1. Addition(+)")
print("2. Subtraction(-)")
print("3. Multiplication(*)")  
print("4. Division(/)")
print("5. Exit")
while True:
    print("Enter choice :")
    choice = int(input())
    if choice == 5:
        break
    if choice in (1, 2, 3, 4):
        print("Enter first number:")
        num1 = float(input())
        print("Enter second number:")
        num2 = float(input())
        if choice == 1:
            result = num1 + num2
            print(f"Result: {num1} + {num2} = {result}")
        elif choice == 2:
            result = num1 - num2
            print(f"Result: {num1} - {num2} = {result}")
        elif choice == 3:
            result = num1 * num2
            print(f"Result: {num1} * {num2} = {result}")
        elif choice == 4:
            if num2 == 0:
                print("Error: Division by zero")
            else:
                result = num1 / num2
                print(f"Result: {num1} / {num2} = {result}")