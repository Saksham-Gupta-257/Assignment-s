import traceback

try:
    1 / 0
except Exception as e:
    with open("Python_Assignment/Exception_Handling/error.log", "a") as f:
        f.write(traceback.format_exc())
    print("Error logged")
