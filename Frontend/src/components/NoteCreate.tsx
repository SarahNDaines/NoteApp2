import React, { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonItem, IonLabel, IonInput, IonTextarea, IonButton } from '@ionic/react';
import { createNote, Note } from '../services/ noteService';
import { useIonRouter } from '@ionic/react';

const NoteCreate: React.FC = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const router = useIonRouter(); // Initialize useIonRouter

  const handleCreate = async () => {
    const newNote: Note = { id: 0, title, content };
    await createNote(newNote);
    setTitle('');
    setContent('');
    router.push('/notes'); // Navigate back to '/notes'
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Create Note</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonButton href='/notes'>Back</IonButton>
        <IonItem>
          <IonLabel position="stacked">Title</IonLabel>
          <IonInput value={title} onIonChange={e => setTitle(e.detail.value!)}></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel position="stacked">Content</IonLabel>
          <IonTextarea value={content} onIonChange={e => setContent(e.detail.value!)}></IonTextarea>
        </IonItem>
        <IonButton expand="block" onClick={handleCreate}>Create Note</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default NoteCreate;
