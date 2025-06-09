while True:
    year_input = input("Enter a year: ")
    if year_input.isdigit():
        year = int(year_input)
        break
    print("Invalid year. Please enter a positive integer.")

if (year % 4 == 0 and year % 100 != 0) or (year % 400 == 0):
    print("Leap year")
else:
    print("Not a leap year")
