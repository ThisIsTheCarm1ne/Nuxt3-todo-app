import type Note from "~/shared/types/notes";

export const useNotes = () => {
    const notes = useState<Note[]>('notes', () => []);

    const addNote = (note: Note) => {
        notes.value.push(note);
    };

    const updateNote = (updatedNote: Note) => {
        const index = notes.value.findIndex((note) => note.id === updatedNote.id);
        if (index !== -1) {
            notes.value[index] = { ...updatedNote };
        }
    };


    const deleteNote = (id: string) => {
        notes.value = notes.value.filter((note) => note.id !== id);
    };

    return {
        notes,
        addNote,
        updateNote,
        deleteNote,
    };
}