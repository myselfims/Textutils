import Navbar from './Components/Navbar';
import './App.css';
import Form from './Components/Form';
import { useState } from 'react';
import Alert from './Components/Alert';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";


function App() {
  const [mode,setMode] = useState('light')
  

  const toggleMode = () => {
    console.log('working')
    if (mode === 'dark'){
      setMode('light')
      document.body.style.backgroundColor = 'white';
      document.body.style.color = 'black';
    }else{
      document.body.style.backgroundColor = 'black';
      document.body.style.color = 'white';
      setMode('dark')
    }
  }
  const [alertobj,setAlert] = useState(null)

  return (
    <>
    {/* <Router> */}
   <Navbar toggler={toggleMode} mode={mode} />
   <Alert alert={alertobj}/>
   <div  className="container">
    <Form />
    {/* <Routes> */}
      {/* <Route exact path="/form" Component={Form}/>      */}
    {/* </Routes> */}

   </div>
   {/* </Router> */}
    </>
  );
}

export default App;


