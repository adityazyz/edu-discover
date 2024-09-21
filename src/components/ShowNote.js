import React,{useContext} from 'react'
import noteContext from '../context/notes/noteContext'
import NoteItem from './NoteItem';

function ShowNote(props) {
    // getting hold of array of notes from noteState using the context used in it
    const context = useContext(noteContext);
    const {notes} = context;

  return (
    <div className='mt-3'>
    {/* // iterating through all notes and displaying on screen as a NoteItem component */}
    {(notes.length !== 0) ? (<div className='row '>
        <h2 className= "mt-4 my-2 " style={{color : "white"}}>Your Notes</h2>
        {notes.map((note)=>{
            // passing a single note from array of notes
            return (
              
             <NoteItem key = {note._id} note = {note} displayAlert = {props.displayAlert}/> 
             
            )
        })}
    </div>) : <h3 style={{"color" : "white"}}>No notes to display.&nbsp;&nbsp;Add some notes.</h3>}
    </div>
  )
}
export default ShowNote