def prime_gen():
    for num in range(2, 100):
        if all(num % i != 0 for i in range(2, int(num**0.5) + 1)):
            yield num

for prime in prime_gen():
    print(prime)
