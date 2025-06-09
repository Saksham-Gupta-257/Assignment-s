from datetime import datetime

def write_log(entry, logfile="log.txt"):
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    with open(logfile, 'a') as f:
        f.write(f"[{timestamp}] {entry}\n")

write_log("This is a log entry.")
