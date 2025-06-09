while True:
    num_input = input("Enter a number: ")
    if num_input.isdigit():
        num = int(num_input)
        break
    print("Invalid input. Please enter a positive integer.")

if num < 2:
    print("Not a prime")
else:
    for i in range(2, int(num ** 0.5) + 1):
        if num % i == 0:
            print("Not a prime")
            break
    else:
        print("Prime number")
