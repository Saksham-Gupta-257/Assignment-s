def copy_file(src, dest):
    try:
        with open(src, 'r') as f_src, open(dest, 'w') as f_dest:
            f_dest.write(f_src.read())
    except FileNotFoundError:
        print("Source file not found")

copy_file("source.txt", "destination.txt")
