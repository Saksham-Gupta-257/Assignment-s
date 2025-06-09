def reverse_list(lst):
    if not isinstance(lst, list):
        raise ValueError("Input must be a list")
    return [lst[i] for i in range(len(lst) - 1, -1, -1)]

print(reverse_list([1, 2, 3, 4]))
