import logging

logging.basicConfig(filename='decorator_errors.log', level=logging.ERROR)

def log_exceptions(func):
    def wrapper(*args, **kwargs):
        try:
            return func(*args, **kwargs)
        except Exception as e:
            logging.error("Error in function %s", func.__name__, exc_info=True)
            return "Error occurred"
    return wrapper

@log_exceptions
def risky_division(a, b):
    return a / b

print(risky_division(10, 0))
