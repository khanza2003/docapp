import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { db } from "../firebase";
import { Paper, Typography, Button } from "@mui/material";
import { collection, getDocs } from "firebase/firestore";
import DocumentEditor from "./DocumentEditor";

const Home = () => {
  const [documents, setDocuments] = useState([]);
  const [showEditor, setShowEditor] = useState(false); // To toggle the editor view
  const navigate = useNavigate();

  // Fetch all documents
  useEffect(() => {
    const fetchDocuments = async () => {
      const querySnapshot = await getDocs(collection(db, "documents"));
      setDocuments(querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    };
    fetchDocuments();
  }, []); // Fetch documents only when the component mounts

  const handleCreateDocument = () => {
    setShowEditor(true); // Show the editor to create a new document
  };

  const handleDocumentAdded = () => {
    // Refresh the document list after adding a new one or editing an existing one
    setShowEditor(false); // Hide the editor
    const fetchDocuments = async () => {
      const querySnapshot = await getDocs(collection(db, "documents"));
      setDocuments(querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    };
    fetchDocuments(); // Fetch updated documents
    navigate("/"); // Navigate back to home page
  };

  return (
    <div style={{ padding: "20px" }}>
      <Typography style={{ textAlign: 'center', fontSize: '50px', fontWeight: 'bolder' }} variant="h4" gutterBottom>
        Your Documents
      </Typography>

      {!showEditor ? (
        <>
          <Button
            variant="contained"
            color="primary"
            onClick={handleCreateDocument}
            style={{ marginBottom: "20px", marginLeft: '650px' }}
          >
            Create Document
          </Button>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(5, 1fr)", // Create 5 columns
              gap: "20px", // Space between items
              justifyContent: "center", // Center the grid
            }}
          >
            {documents.map((doc) => (
              <Paper
                key={doc.id}
                elevation={3}
                style={{
                  padding: "20px",
                  display: "flex",
                  flexDirection: "column", // Stack content vertically
                  justifyContent: "space-between", // Ensure buttons are spaced out
                  textAlign: "center", // Center text inside each paper
                }}
              >
                <Typography variant="h4">{doc.title}</Typography>
                <Link to={`/view/${doc.id}`}>
                  <Button variant="contained" color="primary" style={{ marginTop: "10px" }}>
                    View
                  </Button>
                </Link>
              </Paper>
            ))}
          </div>
        </>
      ) : (
        <DocumentEditor onDocumentAdded={handleDocumentAdded} />
      )}
    </div>
  );
};

export default Home;

