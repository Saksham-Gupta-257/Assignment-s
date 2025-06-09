import math

def math_operations(x, y):
    if x < 0 or y < 0:
        raise ValueError("Inputs must be non-negative")
    return {
        "sqrt_x": math.sqrt(x),
        "factorial_y": math.factorial(int(y)),
        "x_power_y": math.pow(x, y)
    }

print(math_operations(16, 5))
