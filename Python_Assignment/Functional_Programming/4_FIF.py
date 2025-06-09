def apply_to_list(func, lst):
    return [func(x) for x in lst]

print(apply_to_list(lambda x: x * 2, [1, 2, 3]))
