def line_reader(filepath):
    with open(filepath) as f:
        for line in f:
            yield line.strip()

