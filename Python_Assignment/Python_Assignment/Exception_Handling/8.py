def divide(x, y):
    try:
        return x / y
    except ZeroDivisionError as e:
        raise ValueError("Invalid operation") from e

try:
    print(divide(10, 0))
except Exception as e:
    print("Caught:", e)
