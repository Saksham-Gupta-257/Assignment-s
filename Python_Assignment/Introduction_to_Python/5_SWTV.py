print("Enter first number: ")
num1 = int(input())
print("Enter second number: ")
num2 = int(input())
print("--- Before Swapping ---")
print(f"First number is: {num1}")
print(f"Second number is: {num2}")
num1 = num1 + num2
num2 = num1 - num2
num1 = num1 - num2
print("--- After Swapping ---")
print(f"First number is: {num1}")
print(f"Second number is: {num2}")