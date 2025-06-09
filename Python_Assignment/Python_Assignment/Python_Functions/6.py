import time

def measure_execution_time(func):
    def wrapper(*args, **kwargs):
        start_time = time.time()
        result = func(*args, **kwargs)
        end_time = time.time()
        execution_time = end_time - start_time
        print(f"Function {func.__name__} took {execution_time:.4f} seconds to execute")
        return result
    return wrapper

@measure_execution_time
def calculate_multiply(numbers):
    tot = 1
    for x in range(1,numbers):
        tot *= x
    return tot

result = calculate_multiply(60000)
