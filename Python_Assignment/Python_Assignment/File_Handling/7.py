import csv

def column_averages(filename):
    try:
        with open(filename, newline='') as csvfile:
            reader = list(csv.reader(csvfile))
            if not reader:
                return []
            cols = list(zip(*reader[1:]))
            return [sum(map(float, col)) / len(col) for col in cols]
    except Exception as e:
        print("Error:", e)
        return []

print(column_averages("data.csv"))
