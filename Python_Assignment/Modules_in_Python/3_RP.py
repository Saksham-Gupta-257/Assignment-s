import random
import string

def generate_password(length):
    if length <= 0:
        print("Error: Password length must be greater than 0")

    characters = string.ascii_letters + string.digits + string.punctuation
    password = random.choices(characters, k=length)

    return ''.join(password)

print("Enter password length:")
length = int(input())

password = generate_password(length)
if password:
    print("Generated Password:", password)
