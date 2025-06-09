import random

num = random.randint(1, 100)

print("Enter your guess between 1 and 100:")

guess = int(input())

if guess == num:
    print("Your guess is right")
else:
    print(f"Your guess is wrong, The correct number is {num}")
