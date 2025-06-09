def flatten_list(nested_list):
    flat = []
    for item in nested_list:
        if isinstance(item, list):
            flat.extend(flatten_list(item)) 
        else:
            flat.append(item) 
    return flat

nested_list = [1, [2, [3, 4], 5], 6]
flattened = flatten_list(nested_list)
print(flattened) 