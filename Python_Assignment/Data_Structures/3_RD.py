list = [1, 2, 2, 3, 4, 4, 5]
print("List Before Removing Duplicates:")
print("List:", list)
seen = set()
result = []
for item in list:
    if item not in seen:
        seen.add(item)
        result.append(item)
print("List After Removing Duplicates:")
print("List:", result)
