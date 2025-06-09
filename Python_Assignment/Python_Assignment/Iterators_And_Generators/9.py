def read_lines(filename):
    with open(filename) as f:
        for line in f:
            yield line

def filter_non_empty(lines):
    return (line.strip() for line in lines if line.strip())

def upper_case(lines):
    return (line.upper() for line in lines)

