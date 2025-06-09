def cartesian_product(a, b):
    for i in a:
        for j in b:
            yield (i, j)

for pair in cartesian_product([1, 2], ['a', 'b']):
    print(pair)
