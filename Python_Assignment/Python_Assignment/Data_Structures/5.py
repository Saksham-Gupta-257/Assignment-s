def sort_by_second(tuples):
    if not all(isinstance(t, tuple) and len(t) == 2 for t in tuples):
        raise ValueError("Input must be a list of 2-element tuples")
    return sorted(tuples, key=lambda x: x[1])

print(sort_by_second([(1, 3), (2, 2), (3, 1)]))
