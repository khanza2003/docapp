import React, { useState, useEffect } from "react";
import { db } from "../firebase"; // Import Firestore config
import { useNavigate, useParams } from "react-router-dom";
import ReactQuill from "react-quill";
import { Button, TextField, Paper, Typography } from "@mui/material";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore"; // Modern Firestore functions
import "react-quill/dist/quill.snow.css";

const DocumentEditor = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState(null);
  const { id } = useParams(); // Get document ID from URL (for editing)
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      // Fetch existing document for editing
      const fetchDocument = async () => {
        try {
          const docRef = doc(db, "documents", id); // Reference to the specific document
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            const data = docSnap.data();
            setTitle(data.title);
            setContent(data.content);
          } else {
            setError("Document not found.");
          }
        } catch (err) {
          console.error("Error fetching document: ", err);
          setError("Failed to fetch document.");
        }
      };

      fetchDocument();
    }
  }, [id]);

  const handleSave = async () => {
    const docData = { title, content };
    try {
      if (id) {
        // Update existing document
        const docRef = doc(db, "documents", id);
        await updateDoc(docRef, docData);
      } else {
        // Create new document
        const newDocRef = doc(db, "documents", new Date().getTime().toString());
        await setDoc(newDocRef, docData);
      }
      navigate("/"); // Redirect to home page after saving
    } catch (err) {
      console.error("Error saving document: ", err);
      setError("Failed to save document.");
    }
  };

  if (error) {
    return (
      <Typography variant="h6" color="error" style={{ textAlign: "center" }}>
        {error}
      </Typography>
    );
  }

  return (
    <Paper elevation={3} style={{ padding: "20px" }}>
      <Typography variant="h5">{id ? "Edit Document" : "Create Document"}</Typography>
      <TextField
        label="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        fullWidth
        style={{ marginBottom: "20px" }}
      />
      <ReactQuill value={content} onChange={setContent} />
      <div style={{ marginTop: "20px" }}>
        <Button variant="contained" color="primary" onClick={handleSave}>
          Save
        </Button>
      </div>
    </Paper>
  );
};

export default DocumentEditor;

