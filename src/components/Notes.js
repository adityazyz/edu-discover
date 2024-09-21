import React, { useContext,useEffect } from 'react'
import noteContext from '../context/notes/noteContext'
import AddNote from './AddNote'
import ShowNote from './ShowNote'
import { useNavigate} from 'react-router-dom'

const Notes =(props)=> {
    const context = useContext(noteContext);
    const {fetchNotes} = context;

    const navigate = useNavigate()
    useEffect(()=>{
      // fetch notes only of the authToken is there in local storage
        if(localStorage.getItem("token")){ 
          fetchNotes();
        }else{
          // redirect to welcome page
          navigate("/");
        }
        // eslint-disable-next-line
    },[])
  return (
    <div className='mt-3'>
      {/* // div below only present when there is no alert message  */}
    <div style={{height : (!props.emptyDivNeeded)?"0vh":"8vh"}}></div>
    <AddNote displayAlert = {props.displayAlert}/>
    <ShowNote displayAlert = {props.displayAlert}/>
    </div>
  )
}

export default Notes