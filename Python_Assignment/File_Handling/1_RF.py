with open("Python_Assignment/File_Handling/Description.txt", "r") as file:
    for i, line in enumerate(file, 1):
        print(f"{i}: {line.strip()}")
