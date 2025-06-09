class NegativeNumberError(Exception): 
    pass
class TooLargeError(Exception): 
    pass

def check_number(num):
    if num < 0:
        raise NegativeNumberError("Negative not allowed")
    if num > 100:
        raise TooLargeError("Number too large")

try:
    check_number(150)
except NegativeNumberError:
    print("Negative number error")
except TooLargeError:
    print("Too large number error")
