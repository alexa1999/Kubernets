document.getElementById('addNoteBtn').addEventListener('click', addNote);

function addNote() {
    const noteInput = document.getElementById('noteInput');
    const note = noteInput.value;

    if (note) {
        fetch('/notes', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ note })
        })
        .then(response => response.json())
        .then(data => {
            noteInput.value = ''; // Limpiar el campo
            displayNotes(data.notes); // Mostrar las notas
        });
    }
}

function deleteNote(noteId) {
    fetch('/notes', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: noteId })
    })
    .then(response => response.json())
    .then(data => displayNotes(data.notes)); // Mostrar las notas restantes
}

function displayNotes(notes) {
    const notesList = document.getElementById('notesList');
    notesList.innerHTML = ''; // Limpiar la lista actual

    notes.forEach((note, index) => {
        const noteDiv = document.createElement('div');
        noteDiv.className = 'note';
        noteDiv.innerHTML = `<span>${note}</span>
                             <button onclick="deleteNote(${index})"><i class="fas fa-trash"></i></button>`;
        notesList.appendChild(noteDiv);
    });
}

// Cargar notas al iniciar
fetch('/notes')
    .then(response => response.json())
    .then(data => displayNotes(data));
