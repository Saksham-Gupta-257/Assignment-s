filenames = ["Python_Assignment/File_Handling/Description.txt", "Python_Assignment/File_Handling/Copy.txt"]
with open("Python_Assignment/File_Handling/merge.txt", "w") as outfile:
    for name in filenames:
        with open(name, "r") as infile:
            outfile.write(infile.read() + "\n")
print("Files merged.")
