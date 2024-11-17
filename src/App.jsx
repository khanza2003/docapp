import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './components/Home'
import Header from './components/Header'
import DocumentEditor from './components/DocumentEditor'
import ViewDocument from './components/ViewDocument'
import Editdocument from "./components/Editdocument";

function App() {
  

  return (
    <>
     
    <Header/>
     <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/editor/:id' element={<DocumentEditor/>}/>
      <Route path='/editor/:new' element={<DocumentEditor/>}/>
      <Route path='/view/:id' element={<ViewDocument/>}/>
      <Route path="/edit/:id" element={<Editdocument />} /> 
     </Routes>
    
    </>
  )
}

export default App

