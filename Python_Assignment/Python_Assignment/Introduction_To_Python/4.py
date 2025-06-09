def reverse_integer(n):
    sign = -1 if n < 0 else 1
    n = abs(n)
    reversed_num = 0
    
    while n > 0:
        reversed_num = reversed_num * 10 + n % 10
        n = n // 10
    
    return sign * reversed_num

print(reverse_integer(123))  