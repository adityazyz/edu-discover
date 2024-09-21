import './App.css';
import { useState , useEffect} from 'react';
import { BrowserRouter,Routes, Route} from 'react-router-dom'
import Navbar from './components/Navbar';
import Welcome from './components/Welcome';
import About from './components/About';
import NoteState from "./context/notes/NoteState";
import Alert from './components/Alert';
import Login from './components/Login';
import Signup from './components/Signup';
import Notes from './components/Notes'


const App = ()=>{

  const [alert, setalert] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  // if auth  token present set login === true else ===false
  useEffect(() => {
    (localStorage.getItem("token"))?setIsLoggedIn(true):setIsLoggedIn(false);
  
  }, [])
  

  const [emptyDivNeeded, setEmptyDivNeeded] = useState(true);

  const displayAlert = (message,type)=>{
    setEmptyDivNeeded(false);  // removing empty div at place of alert in Notes.js
    setalert({
      message : message,
      type : type,
      });
      
      setTimeout(()=>{
        setalert(null);
        setEmptyDivNeeded(true); // bringing back empty div at place of alert in Notes.js
      },1500);
  };

  const toggleIsLoggedIn = ()=>{
    if(isLoggedIn === false){
      setIsLoggedIn(true);
    }else{
      setIsLoggedIn(false);
    }
  }


  return (
  <div style={{minHeight : "100vh", backgroundColor:"#0a243d"}}>
    <NoteState>
    <BrowserRouter>
      <Navbar isLoggedIn = {isLoggedIn} toggleIsLoggedIn = {toggleIsLoggedIn}/>
      <Alert alert ={alert}/>
      <div >
      <Routes>
        <Route exact path='/' element={<Welcome/>}/>
        <Route exact path='/notes'  element={<div className='container mx-5'><Notes displayAlert = {displayAlert} emptyDivNeeded = {emptyDivNeeded}/></div>} />
        <Route exact path='/about' element={<About/>} />
        <Route exact path='/login' element={<Login displayAlert = {displayAlert} toggleIsLoggedIn = {toggleIsLoggedIn} />}  />
        <Route exact path='/signup' element={<Signup displayAlert = {displayAlert} toggleIsLoggedIn = {toggleIsLoggedIn}/> } />
      </Routes>
      </div>
    </BrowserRouter> 
    </NoteState>
  </div>
  );
}


export default App;
