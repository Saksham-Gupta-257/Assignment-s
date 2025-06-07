import importlib

module_name = "operations"
function_name = "greet"

mod = importlib.import_module(module_name)
func = getattr(mod, function_name)

result = func("Saksham")
print(result)
