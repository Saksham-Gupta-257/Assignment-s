def compose(*funcs):
    def composed(x):
        for f in reversed(funcs):
            x = f(x)
        return x
    return composed

add1 = lambda x: x + 1
square = lambda x: x * x
double = lambda x: x * 2

pipeline = compose(add1, square, double)
print(pipeline(2))  # double(2)=4, square(4)=16, add1(16)=17
