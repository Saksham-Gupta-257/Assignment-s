import glob

def find_txt_files():
    return glob.glob("*.txt")

print(find_txt_files())
