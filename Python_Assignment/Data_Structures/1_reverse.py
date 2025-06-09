print("Enter numbers for List:")
nums = input().split()
result = []
for num in nums:
    result = [num] + result
print("Reversed List:", result)