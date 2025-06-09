def sum_and_average(numbers):
    if not all(isinstance(x, (int, float)) for x in numbers):
        raise ValueError("List must contain only numbers.")
    total = sum(numbers)
    avg = total / len(numbers) if numbers else 0
    return total, avg
