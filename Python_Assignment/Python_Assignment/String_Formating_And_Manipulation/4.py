def text_statistics(text):
    if not isinstance(text, str):
        raise ValueError("Input must be a string")
    lines = text.splitlines()
    words = text.split()
    return {
        "characters": len(text),
        "words": len(words),
        "lines": len(lines)
    }

sample = "Hello world\nThis is Python"
print(text_statistics(sample))
