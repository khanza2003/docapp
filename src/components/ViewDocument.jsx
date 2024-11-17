import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { db } from "../firebase";
import { Paper, Typography, Button } from "@mui/material";
import { doc, getDoc, deleteDoc } from "firebase/firestore"; // Import deleteDoc from firestore

const ViewDocument = () => {
  const { id } = useParams(); // Get document ID from URL
  const [document, setDocument] = useState(null); // State to store the document data
  const navigate = useNavigate(); // To navigate back to the home page after deletion

  useEffect(() => {
    // Fetch the document from Firestore based on the ID
    const fetchDocument = async () => {
      const docRef = doc(db, "documents", id); // Reference to the specific document
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setDocument(docSnap.data()); // Set the document data in state
      } else {
        console.log("No such document!");
      }
    };

    fetchDocument();
  }, [id]);

  const handleDelete = async () => {
    const docRef = doc(db, "documents", id);
    try {
      await deleteDoc(docRef); // Delete the document from Firestore
      navigate("/"); // Redirect to home page after deletion
    } catch (error) {
      console.error("Error deleting document: ", error);
    }
  };

  if (!document) {
    return <Typography variant="h6">Loading...</Typography>; // Show loading if document is not yet fetched
  }

  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h4" gutterBottom>{document.title}</Typography>
      <Paper elevation={3} style={{ padding: "20px" }}>
        <Typography variant="body1" dangerouslySetInnerHTML={{ __html: document.content }} />
        {/* Use 'dangerouslySetInnerHTML' to render the HTML content from React Quill */}
      </Paper>
      <div style={{ marginTop: "20px" }}>
        <Link to={`/edit/${id}`}>
          <Button variant="contained" color="secondary" style={{ marginRight: "10px" }}>
            Edit
          </Button>
        </Link>
        <Button
          variant="contained"
          color="error"
          style={{ marginRight: "10px" }}
          onClick={handleDelete} // On delete, trigger handleDelete function
        >
          Delete
        </Button>
      </div>
    </div>
  );
};

export default ViewDocument;

