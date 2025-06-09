import glob
import os

directory = "."

pattern = os.path.join(directory, "*.txt")

txt_files = glob.glob(pattern)

print("Found .txt files:")
for file in txt_files:
    print("-", file)
