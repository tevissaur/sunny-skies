import csv
import json

city_dict = {}
# Read data from csv
with open('uscities.csv', newline='') as file:
    reader = csv.reader(file, delimiter=',')
    for row in reader:
        # Only get lat and lon data from cities w population of 500000 or greater
        if row[8] == 'population':
            continue
        elif int(row[8]) > 500000:
            city_dict[row[0]] = dict({'lat': row[6], 'lon': row[7]})

# Check if structure is right
print(city_dict)
with open('cities.json', 'w') as cities:
    json.dump(city_dict, cities)