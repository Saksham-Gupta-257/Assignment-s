try:
    f = open("example.txt", "r")
    print(f.read())
except FileNotFoundError:
    print("File not found.")
finally:
    try:
        f.close()
    except:
        pass
