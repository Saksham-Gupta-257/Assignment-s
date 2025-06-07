def sum_and_average(numbers, n):
    total = 0
    for num in numbers:
        total += num
    avg = total / n
    return total, avg

print("Enter the number of elements: ")
n = int(input())
print("Enter the elements: ")
numbers = []
for i in range(n):
    num = int(input())
    numbers.append(num)
total, avg = sum_and_average(numbers, n)
print(f"Sum: {total}, Average: {avg}")

