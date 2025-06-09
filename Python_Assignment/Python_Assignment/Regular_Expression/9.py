def parse_query(query):
    return dict(re.findall(r'(\w+)=([\w%]+)', query))

print(parse_query("name=John&age=30&city=New%York"))
