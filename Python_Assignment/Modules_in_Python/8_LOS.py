import os
import sys

print("Files in current directory:")
for file in os.listdir():
    print("-", file)
    
print("\nCommand-line arguments:")
for i, arg in enumerate(sys.argv):
    print(f"arg[{i}]: {arg}")
