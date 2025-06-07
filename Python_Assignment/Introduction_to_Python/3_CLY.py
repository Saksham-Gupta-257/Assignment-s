print("Enter Year:")
year = int(input()) #Need to be typecasted to int for calculation
if year%4 == 0:
    if year%100 == 0:
        if year%400 == 0:
            print(f"{year} is a leap year")
        else:
            print(f"{year} is not a leap year")
    else:
        print(f"{year} is a leap year")