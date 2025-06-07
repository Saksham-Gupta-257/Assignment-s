number = 1000000
num_str = str(number)
result = ""
count = 0

for char in reversed(num_str):
    if count and count % 3 == 0:
        result = "," + result
    result = char + result
    count += 1

print("Formatted currency:", result)
