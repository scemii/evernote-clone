import "./App.css";
import { useEffect, useState } from "react";
import SelectedListItem from "./components/List";
import { TextEditor } from "./components/TextEditor";
import firebase from "./firebase";

function App() {
  const [notes, setNotes] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [addingNote, setAddingNote] = useState(false);
  const [title, setTitle] = useState(null);
  const [keyVariation, setkeyVariation] = useState(null);

  const updateNote = async (id, value) => {
    await firebase.firestore().collection("notes").doc(id).update({
      title: value.title,
      body: value.body,
    });
    console.log("note updated", id);
  };

  const updateTitle = (txt) => {
    setTitle(txt);
  };

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  const deleteNote = async (id) => {
    await firebase.firestore().collection("notes").doc(id).delete();
    setSelectedIndex(0);
    setkeyVariation(Math.random());
  };

  const addNewNote = () => {
    setAddingNote(!addingNote);
    setTitle(null);
  };

  const newNote = async (e) => {
    e.preventDefault();
    await firebase.firestore().collection("notes").add({
      title,
      body: "",
    });
    setAddingNote(!addingNote);
  };

  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection("notes")
      .onSnapshot((snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setNotes(data);
        console.log(data);
      });
    return () => unsubscribe();
  }, [addingNote]);

  return (
    <div className="App">
      <div className="wrapper">
        <SelectedListItem
          notes={notes}
          selectedIndex={selectedIndex}
          setSelectedIndex={setSelectedIndex}
          handleListItemClick={handleListItemClick}
          deleteNote={deleteNote}
          addNewNote={addNewNote}
          newNote={newNote}
          addingNote={addingNote}
          setAddingNote={setAddingNote}
          updateTitle={updateTitle}
        />
        {!addingNote && notes && notes.length > 0 ? (
          <TextEditor
            key={keyVariation}
            note={notes[selectedIndex]}
            updateNote={updateNote}
            selectedIndex={selectedIndex}
          />
        ) : null}
      </div>
    </div>
  );
}

export default App;
