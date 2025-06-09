def take_input(args):
    print(f"Enter {args} number : ")
    while True:
        num = input()
        if num.isdigit():
            return int(num)
        print(f"Invalid {args} input. Please enter an integer.")

a = take_input("first")
b = take_input("second")
c = take_input("third")

largest = max(a, b, c)
print(f"The largest number is {largest}")