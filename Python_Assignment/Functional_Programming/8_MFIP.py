numbers = range(10)
square_of_even_numbers = list(map(lambda x: x**2, filter(lambda x: x % 2 == 0, numbers)))
print(square_of_even_numbers)
