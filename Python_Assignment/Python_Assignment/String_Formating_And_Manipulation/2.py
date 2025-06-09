def all_substrings(s):
    if not isinstance(s, str):
        raise ValueError("Input must be a string")
    return [s[i:j+1] for i in range(len(s)) for j in range(i, len(s))]

print(all_substrings("abc"))
