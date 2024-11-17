import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { db } from "../firebase";
import { Paper, Typography, Button, TextField } from "@mui/material";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import ReactQuill from "react-quill"; // Import React Quill for text editing
import "react-quill/dist/quill.snow.css"; // Import the styles for React Quill

const Editdocument = () => {
  const { id } = useParams(); // Get document ID from the URL
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    const fetchDocument = async () => {
      const docRef = doc(db, "documents", id); // Reference to the document
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setTitle(docSnap.data().title);
        setContent(docSnap.data().content);
      } else {
        console.log("No such document!");
      }
    };
    fetchDocument();
  }, [id]);

  const handleSave = async () => {
    const docRef = doc(db, "documents", id);
    await updateDoc(docRef, { title, content }); // Update the document with new values
    navigate(`/view/${id}`); // Redirect to the ViewDocument component after saving
  };

  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h4" gutterBottom>Edit Document</Typography>
      <Paper elevation={3} style={{ padding: "20px" }}>
        <TextField
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
          style={{ marginBottom: "20px" }}
        />
        <div style={{ marginBottom: "20px" }}>
          <ReactQuill
            value={content}
            onChange={setContent} // Update content as user types in the editor
            theme="snow" // You can choose between "snow" and "bubble" themes
            modules={{
              toolbar: [
                [{ header: "1" }, { header: "2" }, { font: [] }],
                [{ list: "ordered" }, { list: "bullet" }],
                ["bold", "italic", "underline", "strike"], // Text formatting options
                ["link"], // Link insertion
                [{ align: [] }],
                ["blockquote"],
                [{ color: [] }, { background: [] }],
                ["code-block"],
                ["clean"], // Clears the editor content
              ],
            }}
            style={{ height: "300px" }} // Set the height of the editor
          />
        </div>
        <Button variant="contained" color="primary" onClick={handleSave}>
          Save Changes
        </Button>
      </Paper>
    </div>
  );
};

export default Editdocument;


