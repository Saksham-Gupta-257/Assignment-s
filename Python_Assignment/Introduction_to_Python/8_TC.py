print("Choice :")
print("1. Celsius to Fahrenheit")
print("2. Fahrenheit to Celsius")

print("Enter your choice:")
choice = int(input())
if choice == 1:
    print("Enter temperature in Celsius:")
    cel = float(input())
    fah = (cel * 9/5) + 32
    print(f"{cel} *C is equal to {round(fah,1)} *F")
elif choice == 2:
    print("Enter temperature in Fahrenheit:")
    fah = float(input())
    cel = (fah - 32) * 5/9
    print(f"{fah} *F is equal to {round(cel,1)} *C")