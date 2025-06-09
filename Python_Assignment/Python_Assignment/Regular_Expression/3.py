def extract_hashtags(text):
    return re.findall(r'#\w+', text)

print(extract_hashtags("Loving #Python and #regex!"))
