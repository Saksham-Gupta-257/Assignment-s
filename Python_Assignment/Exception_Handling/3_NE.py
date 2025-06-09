try:
    arr = [1, 2, 3]
    try:
        print("Array :", arr)
        print("Enter Index: ")
        idx = int(input())
        print("Element: ", arr[idx])
    except IndexError:
        print("Index out of range")
    
    print("Input: " )
    num = int (input())
except ValueError:
    print("Invalid input")
