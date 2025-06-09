def sum_using_varaible_length_args(*args):
    total = 0
    for num in args:
        total += num
    return total
print("Enter the number of elements: ")
n = int(input())
print("Enter the elements: ")
numbers = []
for i in range(n):
    num = int(input())
    numbers.append(num)
total = sum_using_varaible_length_args(*numbers)
print(f"Sum: {total}")
