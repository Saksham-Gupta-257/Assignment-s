import re

def remove_html_tags(text):
    if not isinstance(text, str):
        raise ValueError("Input must be a string")
    return re.sub(r'<[^>]+>', '', text)

print(remove_html_tags("<p>Hello <b>World</b></p>"))
