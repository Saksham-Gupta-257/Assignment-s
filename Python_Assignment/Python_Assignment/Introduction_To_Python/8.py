choice = input("Convert from (C)elsius or (F)ahrenheit? ").strip().lower()
while choice not in ('c', 'f'):
    choice = input("Invalid input. Enter 'C' or 'F': ").strip().lower()

while True:
    temp_input = input("Enter the temperature: ")
    try:
        temp = float(temp_input)
        break
    except ValueError:
        print("Invalid input. Please enter a numeric temperature.")

if choice == 'c':
    print(f"{temp}°C = {(temp * 9/5) + 32}°F")
else:
    print(f"{temp}°F = {(temp - 32) * 5/9}°C")
