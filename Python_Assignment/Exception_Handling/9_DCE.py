def log_errors(func):
    def wrapper(*args, **kwargs):
        try:
            return func(*args, **kwargs)
        except Exception as e:
            print(f"Error in {func.__name__}: {e}")
    return wrapper

@log_errors
def divide(num1, num2):
    return num1 / num2

divide(10, 0)
