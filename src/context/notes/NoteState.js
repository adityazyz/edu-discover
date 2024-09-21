// -----------------------------------------
    // 1) NoteContext is made by using createContext()
    // 2) and NoteState creates and stores all state variables 
    // 3) later the values from NoteState can be accessed and changed using useContext()
    //    and passing noteContext as it parameter
// -----------------------------------------

import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props)=>{

    const host = "http://localhost:3700"

    // array of fetched notes of a user        [sample]
    const initNotes = [];
    // creating state variable to use and update array of notes
    const [notes,setNotes] = useState(initNotes);


    // fetching all notes from database
      const fetchNotes = async()=>{
        const url = `${host}/api/notes/fetchallnotes`
        const response = await fetch(url, {
            method: 'GET', // *GET, POST, PUT, DELETE, etc.
            headers: {
              'Content-Type': 'application/json',
              'auth-token' : localStorage.getItem("token")
              // 'Content-Type': 'application/x-www-form-urlencoded',
            },
          });
          // parsing data into json format
          const fetchedNotes = await response.json();
        //   setting notes = newly fetched notes data array 
          setNotes(fetchedNotes);
      }


      // adding a note to database
      // [ TODO : API call ] 
      const addNote = async(title,description,tag = "default tag")=>{
      
          // api call to add note to db
            await fetch(`${host}/api/notes/addnote`, {
                method: 'POST', // *GET, POST, PUT, DELETE, etc.
                headers: {
                'Content-Type': 'application/json',
                'auth-token' : localStorage.getItem("token")
                // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: JSON.stringify({title, description,tag}) // body data type must match "Content-Type" header
            });

            // const respData = await response.json();
            // console.log(respData);
          
        }


      // deleting a note from the database
      // [ TODO : API call ] 
      const deleteNote = async (id)=>{
        const url = `${host}/api/notes/deletenote/${id}`
        // making req to delete note with provided id
        await fetch(url, {
            method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
            headers: {
              'Content-Type': 'application/json',
              'auth-token' : localStorage.getItem("token")
            //   'Access-Control-Allow-Origin': 'http://localhost:3700'
              // 'Content-Type': 'application/x-www-form-urlencoded',
            },
          });
        
      }



      // editing note in the database
      const editNote = async(id,title,description,tag)=>{
        // make apiCall
        const url = `${host}/api/notes/updatenote/${id}`
        await fetch(url, {
          method: 'PUT', // *GET, POST, PUT, DELETE, etc.
          headers: {
          'Content-Type': 'application/json',
          'auth-token' : localStorage.getItem("token")
          // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: JSON.stringify({title,description,tag}) // body data type must match "Content-Type" header
      });
      }

    // our NoteContext providing values to use and update throughout the app
    return(
        <NoteContext.Provider value={{notes,fetchNotes,addNote,deleteNote,editNote}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;