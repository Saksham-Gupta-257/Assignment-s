def power_func(n):
    return lambda x: x ** n

cube = power_func(3)
print(cube(2))
