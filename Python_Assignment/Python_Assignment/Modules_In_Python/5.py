import custom as cm

def use_custom():
    return {
        "add": cm.add(4, 5),
        "sub": cm.subtract(10, 3),
        "mul": cm.multiply(6, 7),
        "div": cm.divide(8, 2)
    }

print(use_custom())
