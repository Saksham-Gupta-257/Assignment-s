def extract_dates(text):
    return re.findall(r'\b\d{2}-\d{2}-\d{4}\b', text)

print(extract_dates("Dates: 01-01-2023, 12-12-2024."))
