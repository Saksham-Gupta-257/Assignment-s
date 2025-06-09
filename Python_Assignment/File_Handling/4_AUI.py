user_input = "This is a new line from 4_AUI.py"
with open("Python_Assignment/File_Handling/Description.txt", "a") as file:
    file.write(user_input + "\n")
print("Line appended.")
