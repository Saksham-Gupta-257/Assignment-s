s = "sam"
substrings = []
for i in range(len(s)):
    for j in range(i + 1, len(s) + 1):
        substrings.append(s[i:j])
print("Substrings:", substrings)
