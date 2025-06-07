print("Enter Three Numbers")
print("Enter first number: ")
num1 = input()
print("Enter second number: ")
num2 = input() 
print("Enter third number: ")
num3 = input()
if num1>num2 and num1>num3:
    print("The largest number is: " + num1)
elif num2>num1 and num2>num3:
    print("The largest number is: " + num2) 
else:
    print("The largest number is: " + num3)
