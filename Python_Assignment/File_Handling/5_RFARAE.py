with open("Python_Assignment/File_Handling/Description.txt", "r") as file:
    lines = file.readlines()
with open("Python_Assignment/File_Handling/clean.txt", "w") as out:
    for line in lines:
        if line.strip():
            out.write(line)
print("Empty lines removed.")
