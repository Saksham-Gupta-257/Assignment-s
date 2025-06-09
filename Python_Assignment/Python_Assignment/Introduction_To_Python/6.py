def is_number(s):
    if s.isDigit() :
        return True
    else :
        return False

expression = input("Enter an expression (e.g., 3 + 4): ")

try:
    a, op, b = expression.split()
    if not (is_number(a) and is_number(b)):
        raise ValueError("Invalid numbers")
    a, b = float(a), float(b)

    if op == '+':
        result = a + b
    elif op == '-':
        result = a - b
    elif op == '*':
        result = a * b
    elif op == '/':
        result = a / b if b != 0 else "Division by zero error"
    else:
        result = "Invalid operator"
except Exception as e:
    result = f"Error: {e}"

print(f"Result: {result}")
