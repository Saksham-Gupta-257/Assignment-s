def append_input_to_file(filename):
    try:
        user_input = input("Enter text to append: ")
        with open(filename, 'a') as f:
            f.write(user_input + "\n")
    except Exception as e:
        print("Error:", e)

append_input_to_file("notes.txt")
