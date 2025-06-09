def list_intersection(l1, l2):
    if not isinstance(l1, list) or not isinstance(l2, list):
        raise ValueError("Inputs must be lists")
    return list(set(l1) & set(l2))

print(list_intersection([1, 2, 3], [2, 3, 4]))
