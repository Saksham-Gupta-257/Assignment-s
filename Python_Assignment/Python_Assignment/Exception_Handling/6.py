class FileManager:
    def __init__(self, filename, mode):
        self.filename = filename
        self.mode = mode

    def __enter__(self):
        self.file = open(self.filename, self.mode)
        return self.file

    def __exit__(self, exc_type, exc_val, exc_tb):
        self.file.close()
        return False

try:
    with FileManager("example.txt", "r") as f:
        print(f.read())
except Exception as e:
    print("Error:", e)
