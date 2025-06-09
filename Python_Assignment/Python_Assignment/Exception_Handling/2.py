try:
    num = int(input("Enter an integer: "))
    print("You entered:", num)
except ValueError:
    print("That's not a valid integer.")
