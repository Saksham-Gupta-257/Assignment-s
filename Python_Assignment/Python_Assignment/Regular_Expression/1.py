import re

def extract_emails(text):
    return re.findall(r'[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}', text)

print(extract_emails("Contact us at test@example.com and support@domain.org"))
    