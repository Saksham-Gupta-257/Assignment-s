tuples = [("a", 3), ("b", 1), ("c", 2)]
sorted_tuples = sorted(tuples, key=lambda x: x[1])
print("Sorted tuples:", sorted_tuples)