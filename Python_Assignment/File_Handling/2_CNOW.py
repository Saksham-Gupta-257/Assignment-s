with open("Python_Assignment/File_Handling/Description.txt", "r") as file:
    text = file.read()
    words = text.split()
    print("Word count:", len(words))
