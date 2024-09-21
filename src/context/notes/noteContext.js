import { createContext } from "react";

const noteContext = createContext();

export default noteContext;


// -----------------------------------------
    // 1) NoteContext is made by using createContext()
    // 2) and NoteState creates and stores all state variables 
    // 3) later the values from NoteState can be accessed and changed using useContext()
    //    and passing noteContext as it parameter
// -----------------------------------------