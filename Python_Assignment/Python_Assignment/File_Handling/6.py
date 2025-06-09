def merge_files(file_list, output_file):
    try:
        with open(output_file, 'w') as outfile:
            for fname in file_list:
                with open(fname, 'r') as infile:
                    outfile.write(infile.read() + "\n")
    except FileNotFoundError as e:
        print("File not found:", e.filename)

merge_files(["a.txt", "b.txt"], "merged.txt")
