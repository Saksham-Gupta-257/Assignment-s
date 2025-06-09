def add(a, b):
    if not all(isinstance(i, (int, float)) for i in (a, b)):
        raise ValueError("Inputs must be numbers")
    return a + b

def subtract(a, b):
    if not all(isinstance(i, (int, float)) for i in (a, b)):
        raise ValueError("Inputs must be numbers")
    return a - b

def multiply(a, b):
    if not all(isinstance(i, (int, float)) for i in (a, b)):
        raise ValueError("Inputs must be numbers")
    return a * b

def divide(a, b):
    if not all(isinstance(i, (int, float)) for i in (a, b)):
        raise ValueError("Inputs must be numbers")
    if b == 0:
        raise ZeroDivisionError("Cannot divide by zero")
    return a / b