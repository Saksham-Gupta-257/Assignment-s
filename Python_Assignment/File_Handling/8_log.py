from datetime import datetime
log_entry = "Saksham was here and completed the assignment on File Handling in Python."
timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
with open("Python_Assignment/File_Handling/log.txt", "a") as log:
    log.write(f"[{timestamp}] {log_entry}\n")
print("Log updated.")
