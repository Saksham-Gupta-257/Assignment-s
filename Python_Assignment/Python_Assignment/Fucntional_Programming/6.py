def curry_add(x):
    def add_y(y):
        return x + y
    return add_y

add_five = curry_add(5)
print(add_five(10))
