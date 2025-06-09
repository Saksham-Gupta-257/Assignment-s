import csv
with open("Python_Assignment/File_Handling/temp.csv", "r") as file:
    reader = csv.reader(file)
    next(reader)
    sums = []
    count = 0
    for row in reader:
        nums = list(map(float, row))
        if not sums:
            sums = [0] * len(nums)
        for i in range(len(nums)):
            sums[i] += nums[i]
        count += 1
    averages = [s / count for s in sums]
    print("Column averages:", averages)
