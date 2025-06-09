def power(n):
    return lambda x: x ** n

cube = power(3)
print(cube(2))  # 8
