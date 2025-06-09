def flexible_sum(*args):
    if not all(isinstance(x, (int, float)) for x in args):
        return "All arguments must be numbers."
    return sum(args)

print(flexible_sum(3,4,6,9.5))
