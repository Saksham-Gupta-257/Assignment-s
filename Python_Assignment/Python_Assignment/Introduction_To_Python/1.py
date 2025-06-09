name = input("Enter your name: ").strip()
while True:
    age_input = input("Enter your age: ")
    if age_input.isdigit():
        age = int(age_input)
        break
    print("You Entered wrong age please enter correct age again!")
print(f"Hey, {name}! You are {age} years old.")
