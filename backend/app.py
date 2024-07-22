from flask import Flask, jsonify, request
import db
from flask_cors import CORS
import re

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# In-memory store for captured Pokémon
captured_pokemon = {}

def getPokemonIconURL(name: str):
    return f"https://img.pokemondb.net/sprites/silver/normal/{name.lower()}.png"

@app.route('/pokemon/list')
def getPokemonList():
    # Fetch data from the database
    data = db.get()

    # Get query parameters
    page = int(request.args.get('page', 1))
    sort = request.args.get('sort', 'asc')
    page_size = int(request.args.get('pageSize', 50))
    filters = request.args.get('filters', None)

    if filters:
        # Split the filters string into individual conditions
        filter_conditions = filters.split("&")

        for condition in filter_conditions:
            # Split the condition into key and values
            key, values = condition.split("=")
            values = values.split(",")  # Assuming values can be comma-separated

            if key == "search":
                # Perform fuzzy search on all attributes of the items
                search_value = values[0].lower()
                pattern = re.compile(re.escape(search_value), re.IGNORECASE)
                data = [
                    item for item in data
                    if any(pattern.search(str(value)) for value in item.values())
                ]
            else:
                # Apply the filter to the data
                data = [item for item in data if item.get(key) in values]

    # Group items by "number" to aggregate duplicates and attach icon URLs and capture status
    grouped_data = {}
    for item in data:
        number = item.get('number')
        if number not in grouped_data:
            item['icon_url'] = getPokemonIconURL(item['name'])
            item['captured'] = captured_pokemon.get(item['name'], False)
            grouped_data[number] = item

    # Convert grouped data back to a list
    unique_data = list(grouped_data.values())

    # Apply sorting
    reverse = sort == 'desc'
    unique_data.sort(key=lambda x: x.get('number', ''), reverse=reverse)

    # Get total items count after filtering, sorting, and deduplication
    total_items = len(unique_data)

    # Apply pagination
    start = (page - 1) * page_size
    end = start + page_size
    paginated_data = unique_data[start:end]

    # Return paginated data along with total items count
    return jsonify({
        'total_items': total_items,
        'data': paginated_data
    })

@app.route('/pokemon/capture', methods=['POST'])
def capturePokemon():
    # Get the Pokémon name or number from the request
    pokemon_name = request.json.get('pokemon_name')

    if not pokemon_name:
        return jsonify({'error': 'Missing pokemon_id'}), 400

    # Toggle the Pokémon capture status
    captured_pokemon[pokemon_name] = not captured_pokemon.get(pokemon_name, False)

    return jsonify({'message': f'Pokemon {pokemon_name} capture status updated!', 'captured': captured_pokemon[pokemon_name]})

if __name__ == '__main__':
    app.run(port=8080)
