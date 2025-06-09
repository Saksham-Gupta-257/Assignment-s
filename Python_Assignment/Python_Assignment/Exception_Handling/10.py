class FileMissingError(Exception):
    pass

class InvalidFormatError(Exception):
    pass

def process_file(filename):
    if not filename.endswith(".txt"):
        raise InvalidFormatError("Only .txt files allowed")
    try:
        with open(filename) as f:
            return f.read()
    except FileNotFoundError:
        raise FileMissingError("File does not exist")

try:
    print(process_file("data.csv"))
except (FileMissingError, InvalidFormatError) as e:
    print(e)
