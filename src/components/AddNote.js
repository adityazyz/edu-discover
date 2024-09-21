import React,{useContext,useState} from 'react'
import noteContext from '../context/notes/noteContext'

function AddNote(props) {
  // getting hold of addNote function from noteState using the context used in it
  const context = useContext(noteContext);
  const {addNote,fetchNotes} = context;

  // creating a note state variable
  const [note,setNote] = useState({title : "", description : "", tag : ""});

  // updating value of title and description as they change in input field
  const handleChange = (e)=>{
    setNote({...note,[e.target.name] : e.target.value})
  }

  // clear input fields to add new note again
  const clearFields = ()=>{
    setNote({
      title : "",
      description : "",
      tag : ""
    })
  }
  // what happens after clicking submit
  const handleClick = async (e)=>{
    // prevents page from reloading
    e.preventDefault();

    // destructuring titile and desc from our new note 
    const {title,description,tag} = note;
    
    // adds the note to db
    await addNote(title,description,tag);

    props.displayAlert("Note added successfully !","Success")

    // fetches the new notes from db
    await fetchNotes();

    //clear input tag
    clearFields();

  } 
  return (
    <div >
        <h1 style={{color : "white"}}>Add a note.</h1>
        <div>
          <form>
            <div className="mb-3">
              <label htmlFor="title" className="form-label" style={{color : "white"}}>Title </label>
              <input type="text" className="form-control" id="myTitle" aria-describedby="emailHelp" name = "title"  onChange={handleChange} placeholder="Minimum 5 characters" value={note.title}/>
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="form-label" style={{color : "white"}} >Description</label>
              <div className="form">
                <textarea className="form-control"  id="myDescription" style={{"height": "100px"}} name="description"  onChange={handleChange} placeholder="Minimum 5 characters" value={note.description}/>
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="tag" className="form-label" style={{color : "white"}}>Tag </label>
              <input type="text" className="form-control" id="myTag" aria-describedby="emailHelp" name = "tag"  onChange={handleChange} placeholder="Optional" value={note.tag}/>
            </div>
        
            <button disabled={(note.title.length < 5 || note.description.length < 5 ) ? true : false} type="submit" className="btn btn-primary my-2" onClick={handleClick}>Add Note</button>
          </form>
        </div>
    </div>
  )
}

export default AddNote