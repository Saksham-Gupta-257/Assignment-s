html = "<p>Hello <b>World</b></p>"
text = ""
inside_tag = False

for char in html:
    if char == "<":
        inside_tag = True
    elif char == ">":
        inside_tag = False
    elif not inside_tag:
        text += char

print("Without HTML Tags:", text)