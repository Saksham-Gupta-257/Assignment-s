import random

num = random.randint(1, 100)
while True:
    guess_input = input("Guess the number (1-100): ")
    if not guess_input.isdigit():
        print("Invalid input. Please enter a number.")
        continue
    guess = int(guess_input)
    if guess < 1 or guess > 100:
        print("Please guess within the range 1-100.")
    elif guess < num:
        print("Too low!")
    elif guess > num:
        print("Too high!")
    else:
        print("Correct! You guessed it.")
        break
