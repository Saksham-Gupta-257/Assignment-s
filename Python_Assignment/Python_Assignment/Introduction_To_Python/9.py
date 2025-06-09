while True:
    n_input = input("Enter number of terms: ")
    if n_input.isdigit():
        n = int(n_input)
        break
    print("Invalid input. Please enter a positive integer.")

a, b = 0, 1
for _ in range(n):
    print(a, end=' ')
    a, b = b, a + b
print()
