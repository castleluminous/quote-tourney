#!/usr/bin/python3

# helper to convert from txt to json. need to remove the last comma. sorry. bad coding
with open("quotes.txt", encoding="utf8") as read:
    with open("jsonQuotes.json", "w", encoding="utf8") as f:
        f.write("[")
        for number, line in enumerate(read):
            f.write('{ "number": ' + str(number + 1) + ', "quote": "' + line.strip("\n") + '"}, \n')
        f.write("]")