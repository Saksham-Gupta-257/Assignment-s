def read_lines(filename):
    with open(filename, 'r') as f:
        for line in f:
            yield line.strip()

for line in read_lines('Python_Assignment/File_Handling/Description.txt'):
   print(line)
