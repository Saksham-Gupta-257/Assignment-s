import time
def time_count_decorator(func):
    def wrapper():
        start = time.time()
        func()
        end = time.time()
        print(f"Execution time is: {round(end - start, 4)} seconds")
    return wrapper
@time_count_decorator
def temp_func():
    print("-------------------------------")
    print("This is a temporary function")
    print("-------------------------------")

temp_func()
