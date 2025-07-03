import React from "react";
import { useState, useEffect } from "react";
import styles from "./Modal.module.css";

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [newNoteModal, setNewNoteModal] = useState(false);
  const [editNote, setEditNote] = useState(null);
  const [noteDetails, setNoteDetails] = useState({
    title: "",
    desc: "",
  });

  const getNotes = async () => {
    try {
      let response = await fetch("https://blog-app-lokh.onrender.com/note", {
        method: "GET",
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await response.json();
      console.log(data);
      setNotes(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNoteDetails({ ...noteDetails, [name]: value });
  };

  const createNewNote = async () => {
    if (noteDetails) {
      const data = JSON.stringify(noteDetails);
      try {
        const response = await fetch("https://blog-app-lokh.onrender.com/note/create", {
          method: "POST",
          body: data,
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const result = await response.json();
        console.log(result);

        if (result.msg) {
          setNewNoteModal(false);
          alert(result.msg);
          setNoteDetails({ title: "", desc: "" });
          getNotes();
        }
      } catch (error) {
        alert(error.msg);
      }
    }
  };

  const updateNotes = async (note, id) => {
    if (note) {
      const data = JSON.stringify(note);
      try {
        const response = await fetch(
          `https://blog-app-lokh.onrender.com/note/update/${id}`,
          {
            method: "PATCH",
            body: data,
            headers: {
              "Content-Type": "application/json",
              authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const result = await response.json();
        console.log(result);
        if (result.msg) {
          setEditNote(null);
          alert(result.msg);
          getNotes();
        }
      } catch (error) {
        alert(error.msg);
        console.log(error.msg);
      }
    } else {
      alert("empty note cant be saved");
    }
  };

  const deleteNotes = async (id) => {
    try {
      const response = await fetch(`https://blog-app-lokh.onrender.com/note/delete/${id}`, {
        method: "DELETE",
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const result = await response.json();
      console.log(result);
      if (result.msg) {
        alert(result.msg);
        getNotes();
      }
    } catch (error) {
      alert(error.msg);
      console.log(error.msg);
    }
  };

  useEffect(() => {
    getNotes();
  }, []);

  return (
    <div>
      <h1>Notes Page</h1>
      <button
        onClick={() => {
          setNewNoteModal(true);
          setNoteDetails({ title: "", desc: "" });
        }}
      >
        +NEW NOTE
      </button>

      {/*notes list*/}
      {notes?.map((note) => {
        return (
          <div
            key={note._id}
            style={{
              border: "1px solid gray",
              margin: "10px",
              padding: "10px",
            }}
          >
            <h3>{note.title}</h3>
            <p>{note.desc}</p>
            <button onClick={() => deleteNotes(note._id)}>Delete</button>

            <button onClick={() => setEditNote(note)}>Edit</button>
          </div>
        );
      })}

      {/*new note modal*/}
      {newNoteModal && (
        <Modal onClose={() => setNewNoteModal(false)} title="Create New Note">
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={noteDetails.title}
            onChange={handleChange}
          />
          <br />
          <input
            type="text"
            name="desc"
            placeholder="Description"
            value={noteDetails.desc}
            onChange={handleChange}
          />
          <br />
          <button onClick={createNewNote}>Create</button>
        </Modal>
      )}
      {/*edit note modal*/}
      {editNote && (
        <Modal onClose={() => setEditNote(null)} title="Edit Note">
          <EditBlock
            note={editNote}
            updateNotes={updateNotes}
            closeModal={() => setEditNote(null)}
          />
        </Modal>
      )}
    </div>
  );
};

export default Notes;

// Modal Component
const Modal = ({ children, onClose, title }) => {
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2>{title}</h2>
        {children}
        <br />
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

// EditBlock Component
const EditBlock = ({ note, updateNotes, closeModal }) => {
  const [noteDetails, setNoteDetails] = useState({
    title: note.title,
    desc: note.desc,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNoteDetails({ ...noteDetails, [name]: value });
  };

  return (
    <div>
      <input
        type="text"
        value={noteDetails.title}
        name="title"
        placeholder="Title"
        onChange={handleChange}
      />
      <br />
      <input
        type="text"
        value={noteDetails.desc}
        name="desc"
        placeholder="Description"
        onChange={handleChange}
      />
      <br />
      <button onClick={() => updateNotes(noteDetails, note._id)}>Save</button>
      <button onClick={closeModal}>Cancel</button>
    </div>
  );
};
