import os
import sys

def list_files_and_args():
    return {
        "files": os.listdir('.'),
        "args": sys.argv[1:]
    }

print(list_files_and_args())
