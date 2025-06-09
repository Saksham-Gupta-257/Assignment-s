def process(nums):
    return list(map(lambda x: x * 2, filter(lambda x: x % 2 == 0, nums)))

print(process([1, 2, 3, 4, 5, 6]))
