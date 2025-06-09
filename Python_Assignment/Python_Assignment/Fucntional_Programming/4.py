def apply_to_all(func, data):
    return [func(item) for item in data]

result = apply_to_all(lambda x: x + 1, [1, 2, 3])
print(result)
