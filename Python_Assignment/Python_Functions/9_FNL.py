def flatten_list(nested_list):
    flat = []
    for item in nested_list:
        if isinstance(item, list):
            flat.extend(flatten_list(item))
        else:
            flat.append(item)
    return flat

nested = [1, [2, [3, 4], 5], [6, 7], 8]
print("List Before Flattening:")
print("List:", nested)
flattened = flatten_list(nested)
print("List After Flattening:")
print("List:", flattened)
