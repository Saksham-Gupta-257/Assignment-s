def merge_dicts(d1, d2):
    if not isinstance(d1, dict) or not isinstance(d2, dict):
        raise ValueError("Both inputs must be dictionaries")
    return {**d1, **d2}

print(merge_dicts({'a': 1}, {'b': 2}))
