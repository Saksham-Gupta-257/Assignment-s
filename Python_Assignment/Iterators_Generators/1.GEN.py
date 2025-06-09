def even_numbers(n):
    for i in range(n + 1):
        if i % 2 == 0:
            yield i

for num in even_numbers(10):
    print(num, end=' ')
