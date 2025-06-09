with open("Python_Assignment/File_Handling/Description.txt", "r") as src, open("Python_Assignment/File_Handling/Copy.txt", "w") as dst:
    for line in src:
        dst.write(line)
print("File copied.")
