def factorial(num):
    for i in range(1, num + 1):
        if i == 1:
            res = 1
        else:
            res = res * i
    return res

print("Enter Number:")
num = int(input())
res = factorial(num)
print(f"Factorial of {num} is {res}")
