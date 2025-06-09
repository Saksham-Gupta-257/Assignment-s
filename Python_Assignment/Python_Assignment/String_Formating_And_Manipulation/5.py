def format_currency(num):
    if not isinstance(num, (int, float)):
        raise ValueError("Input must be a number")
    return "{:,}".format(num)

print(format_currency(1000000000))
