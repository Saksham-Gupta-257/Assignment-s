import random
import string

def generate_password(length):
    if not isinstance(length, int) or length <= 0:
        raise ValueError("Length must be a positive integer")
    chars = string.ascii_letters + string.digits + string.punctuation
    return ''.join(random.choices(chars, k=length))

print(generate_password(12))
