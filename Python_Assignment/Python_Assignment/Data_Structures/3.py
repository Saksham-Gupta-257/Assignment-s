def remove_duplicates(lst):
    if not isinstance(lst, list):
        raise ValueError("Input must be a list")
    return list(dict.fromkeys(lst))

print(remove_duplicates([1, 2, 2, 3, 1]))
