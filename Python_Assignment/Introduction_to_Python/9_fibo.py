print("Enter the number of terms for Fibonacci sequence:")
n = int(input())

if n <= 0:
    print("Enter a positive integer")
else:
    print("Fibonacci sequence:")
    a = 0
    b = 1
    for i in range(n):
        print(a, end=" ")
        temp = a + b
        a = b
        b = temp
        
