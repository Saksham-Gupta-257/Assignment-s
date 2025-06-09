def multiply(num1):
    def inner_fuc(num2):
        return num1 * num2
    return inner_fuc

num2 = multiply(5)
print(num2(10)) 