import importlib

def dynamic_call():
    mod = importlib.import_module("custom")
    return mod.multiply(4, 5)

print(dynamic_call())
