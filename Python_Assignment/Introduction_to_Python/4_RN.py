print("Enter Number:")
num = int(input())
rev_num = 0
while num>0:
    rev_num = rev_num * 10 + num % 10
    num = num // 10
print(f"The reverse of the number is: {rev_num}")