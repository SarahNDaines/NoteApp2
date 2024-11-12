import React, { useEffect, useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonList, IonItem, IonLabel, IonButton } from '@ionic/react';
import { getNotes, deleteNote, Note } from '../services/ noteService';

const NoteList: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    loadNotes();
  }, []);

  const loadNotes = async () => {
    const fetchedNotes = await getNotes();
    setNotes(fetchedNotes);
  };

  const handleDelete = async (id: number) => {
    await deleteNote(id);
    loadNotes();
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Notes</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonButton href='/create'>Add New Note</IonButton>
        <IonList>
          {notes.map((note) => (
            <IonItem key={note.id}>
              <IonLabel>
                <h2>{note.title}</h2>
                <p>{note.content}</p>
              </IonLabel>
              <IonButton onClick={() => handleDelete(note.id)}>Delete</IonButton>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default NoteList;
