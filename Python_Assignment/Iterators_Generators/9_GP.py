def read_data(filename):
    with open(filename, 'r') as file:
        for line in file:
            yield line.strip()

def filter_data(data):
    for item in data:
        if len(item) > 10:
            yield item

def transform_data(data):
    for item in data:
        yield item.upper()

pipeline = transform_data(filter_data(read_data('Python_Assignment/File_Handling/Description.txt')))

for processed_item in pipeline:
    print(processed_item)