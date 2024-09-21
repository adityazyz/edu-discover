import React, { useContext,useState} from 'react'
import noteContext from '../context/notes/noteContext';


function NoteItem(props) {

    // destructuring prop and getting note
    const{note} = props;

    // getting hold of deleteNote function from noteState using the context used in it
    const context = useContext(noteContext);
    const {fetchNotes,deleteNote,editNote} = context;
    

    const [editMode,setEditMode] = useState(false);

    
    const toggleEditMode = ()=>{
        if(editMode){
            setEditMode(false);
        }else{
            setEditMode(true);
        }
    }
    
    const [newElements,setNewElements] = useState({
        newTitle : note.title,
        newDescription : note.description,
        newTag : note.tag
    })

    const fieldChange = (e)=>{
        setNewElements({...newElements,[e.target.name]:e.target.value});
    }

  // what happens after clicking submit
    const finalSubmit = async (e)=>{
    // prevents page from reloading
    e.preventDefault();
    // edits the note in db
    await editNote(note._id,newElements.newTitle,newElements.newDescription,newElements.newTag);

    // alert
    props.displayAlert("Note updated Successfully !","Success")
    // closes the update section 
    toggleEditMode()
    // fetches the new notes from db
    await fetchNotes();

  }

  

  return (
  
    <div className=' mx-4 my-3 col-md-5  '>
    <div className=' d-flex justify-content-center  p-3 itemWidth ' >
    <div className={(!editMode)?" Wwidth":" w-50"}>

    
        <div className=' my-3'>
        <div className="card" style = {{backgroundColor:"#f7f7f7"}}>
            <div className="card-body">
                <h5 className="card-title">{note.title}</h5>
                <p className="card-text">{note.description}</p>
                <div className="d-flex justify-content-end">
                    {/* delete button  */}
                    <div onClick={async()=>{await deleteNote(note._id);await fetchNotes(); props.displayAlert("Note deleted !", "Danger")}}>
                        <i className="fa-solid fa-trash mx-3 delete" />
                    </div>

                    {/* update button  */}
                    
                    <div onClick={toggleEditMode}>
                        <i className="fa-solid fa-file-pen mx-3 edit" />
                    </div>
                    
                </div>
            </div>
        </div>
    </div>
        
</div>


{/* /////// edit note ------------------------------------------------------------ */}


        {(editMode)?(<div style = {{backgroundColor:"#f7f7f7"}}className='mx-3 border 2px m-2 p-3 rounded w-50'>
         <form>
            <div className="mb-5">
                <h5 style = {{"color":"#3b3b3b"}}>Update your note here </h5>
            </div>
            <div className="mb-3">
              <label htmlFor="newTitle" className="form-label" >Title </label>
              <input type="text" className="form-control" id="myTitle" aria-describedby="emailHelp" name = "newTitle" defaultValue={note.title} onChange={fieldChange} minLength={5} required/>
            </div>
            <div className="mb-3">
              <label htmlFor="newDescription" className="form-label" >Description</label>
              <div className="form">
                <textarea className="form-control"  id="myDescription" style={{"height": "100px"}} name="newDescription" defaultValue={note.description} onChange={fieldChange} minLength={5} required/>
              </div>
              </div>
              <div className="mb-3">
              <label htmlFor="newTag" className="form-label" >Tag </label>
              <input type="text" className="form-control" id="myTag" aria-describedby="emailHelp" name = "newTag" defaultValue={note.tag} onChange={fieldChange}/>
            </div>
            

            <div className="d-flex justify-content-between">
            <button className="btn btn-danger my-2" style = {{width : "40%",fontSize:".8em"}} onClick={toggleEditMode}>Cancel</button>
            <button className="btn btn-primary my-2" style = {{width : "40%",fontSize:".8em"}} onClick={finalSubmit}>Update Note</button>
            </div>
          
            </form>
    </div>):""}

 </div>
 </div>

  )
}

export default NoteItem