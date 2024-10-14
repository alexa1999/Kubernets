from flask import Flask, jsonify, request, render_template

app = Flask(__name__)

# Almacenar notas en memoria (se pierde al reiniciar el servidor)
notes = []

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/notes', methods=['GET', 'POST', 'DELETE'])
def manage_notes():
    if request.method == 'POST':
        note = request.json.get('note')
        notes.append(note)
        return jsonify({'message': 'Nota añadida', 'notes': notes}), 201

    elif request.method == 'DELETE':
        note_id = request.json.get('id')
        if 0 <= note_id < len(notes):
            deleted_note = notes.pop(note_id)
            return jsonify({'message': 'Nota eliminada', 'note': deleted_note, 'notes': notes}), 200
        return jsonify({'message': 'Nota no encontrada'}), 404

    return jsonify(notes)

if __name__ == '__main__':
    app.run(debug=True)
